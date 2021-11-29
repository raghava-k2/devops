import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { ToasterContext } from "../../../../components/common/Context";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from "../../../../images/CAC-Full-Logo-V1.0.jpg";
import settings from "../../../../settings.json";
import lodash from "lodash";

const { ip } = settings;

export default function ApplicationLoadBalancer() {
    const [form, setForm] = useState({
        configList1: {},
        configList: {
            originalForm: {}
        },
        output: "",
    });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [aws_access_key, setaws_access_key] = useState(null);

    const [aws_secret_key, setaws_secret_key] = useState(null);

    const [aws_accountid, setaws_accountid] = useState(null);

    const [dropDownOptions, setDropDownOptions] = useState({});

    const { addMessage } = useContext(ToasterContext);

    const getDropDownValues = (categoryName) => {
        return axios.get(`${ip}standardControl/${categoryName}`);
    };

    const getDropDownValueContainParent = (categoryName, parentCategoryName) => {
        return axios.get(`${ip}standardControl/${categoryName}/${parentCategoryName}`);
    };

    const getAllCategoryDropDownList = async (categories) => {
        const requestMap = categories.map((category) =>
            getDropDownValues(category)
        );
        try {
            const values = await Promise.allSettled(requestMap);
            const valueObject = values.reduce((acc, { value: { data } }, index) => {
                acc[categories[index]] = data.map((i) => ({
                    ...i, ...{
                        originalName: i.name,
                        name: `${i.name} || ${i.value}`
                    }
                }));
                return acc;
            }, {});
            setDropDownOptions((p) => ({ ...p, ...valueObject }));
        } catch (e) {
            addMessage({
                severity: "error",
                summary: "Cloud Standards",
                detail: `Error fetching the Cloud Standards`,
            });
        }
    };

    const onVpcSelected = ({ options }, { target: { value } }) => {
        const { originalName } = options.find(option => option.value === value);
        getDropDownValueContainParent(STANDARD_CONTROL_CATEGORIES.SUBNET_NAME, originalName)
            .then(({ data }) => {
                const values = data.map(i => ({ ...i, ...{ name: `${i.name} || ${i.value}` } }));
                const dropDown = { [STANDARD_CONTROL_CATEGORIES.SUBNET_NAME]: values };
                setDropDownOptions((p) => ({ ...p, ...dropDown }));
            }).catch(() => {
                addMessage({
                    severity: "error",
                    summary: "Cloud Standards",
                    detail: `Error fetching the Cloud Standards with parent : ${originalName}`,
                });
            });
    }

    useEffect(() => {
        const categories = [
            STANDARD_CONTROL_CATEGORIES.VPC,
            STANDARD_CONTROL_CATEGORIES.REGION,
            STANDARD_CONTROL_CATEGORIES.EC2_INSTANCE,
            STANDARD_CONTROL_CATEGORIES.SECURITY_GROUP
        ];
        getAllCategoryDropDownList(categories);
    }, []);

    const schema = useMemo(() => {
        return {
            fields: [
                {
                    name: "layout",
                    component: "two-column",
                    label: "AWS Details",
                    uniqueKey: uuidv4(),
                    fields: [
                        {
                            name: "aws_region",
                            label: "AWS Region",
                            component: "Dropdown",
                            options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || [],
                            optionLabel: "name",
                            optionValue: "value",
                            filter: true,
                            showClear: true,
                            filterBy: "name",
                            placeholder: "Select AWS Region",
                            uniqueKey: uuidv4(),
                            validators: [
                                {
                                    type: "size",
                                    min: 1,
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "layout",
                    component: "two-column",
                    label: "VPC and Security Group",
                    uniqueKey: uuidv4(),
                    fields: [
                        {
                            name: "vpc_id",
                            label: "VPC",
                            component: "Dropdown",
                            options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.VPC] || [],
                            optionLabel: "name",
                            optionValue: "value",
                            filter: false,
                            showClear: true,
                            filterBy: "name",
                            placeholder: "Select VPC",
                            onChange: onVpcSelected,
                            uniqueKey: uuidv4(),
                            validators: [
                                {
                                    type: "size",
                                    min: 1,
                                },
                            ],
                        },
                        {
                            name: "subnet_id",
                            label: "Subnet",
                            component: "MultiSelect",
                            options:
                                dropDownOptions[STANDARD_CONTROL_CATEGORIES.SUBNET_NAME] || [],
                            optionLabel: "name",
                            optionValue: "value",
                            filter: false,
                            showClear: true,
                            filterBy: "name",
                            placeholder: "Select Subnet Id",
                            uniqueKey: uuidv4(),
                            validators: [
                                {
                                    type: "size",
                                    min: 1,
                                },
                            ],
                        },
                        {
                            name: "ec2_instances",
                            label: "Ec2 Instances",
                            component: "MultiSelect",
                            options:
                                dropDownOptions[STANDARD_CONTROL_CATEGORIES.EC2_INSTANCE] || [],
                            optionLabel: "name",
                            optionValue: "value",
                            filter: true,
                            showClear: true,
                            filterBy: "name",
                            placeholder: "Select EC2 Instances",
                            uniqueKey: uuidv4(),
                            validators: [
                                {
                                    type: "size",
                                    min: 1,
                                },
                            ],
                        },
                        {
                            name: "security_groups",
                            label: "Security Group",
                            component: "MultiSelect",
                            options:
                                dropDownOptions[STANDARD_CONTROL_CATEGORIES.SECURITY_GROUP] || [],
                            optionLabel: "name",
                            optionValue: "value",
                            filter: true,
                            showClear: true,
                            filterBy: "name",
                            placeholder: "Select Security Group",
                            uniqueKey: uuidv4(),
                            validators: [
                                {
                                    type: "size",
                                    min: 1,
                                },
                            ],
                        }
                    ],
                }
            ],
            footer: {
                submit: { label: "Review" },
            },
        }
    }, [dropDownOptions]);

    const onSubmit = (form) => {
        const { fields } = schema;
        if (aws_access_key) {
            const configList1 = preparePreviewObject(form, fields);
            const originalForm = lodash.cloneDeep(form);
            const configList = {
                providerName: "AWS",
                usecaseType: "Module",
                usecaseName: "alb",
                parameter: {
                    ...form,
                    ...{ aws_access_key, aws_secret_key, aws_accountid },
                },
                originalForm: originalForm
            };
            setForm({ configList1, configList, output: "" });
            setFormIndex(1);
        } else {
            setShowCloudConnectionPopup(true);
        }
    };

    const preparePreviewObject = (form, fields) => {
        return fields.reduce((acc, item) => {
            if (item.fields) {
                acc = { ...acc, ...preparePreviewObject(form, item.fields) };
            } else {
                acc = { ...acc, ...{ [item.label]: form[item.name] } };
            }
            return acc;
        }, {});
    };

    const setCredentials = (input) => {
        setaws_access_key(input.accessKey);
        setaws_secret_key(input.secretKey);
        setaws_accountid(input.accountCode);
    };

    return (
        <div
            className={`p-grid p-nogutter ${formIndex === 0 ? "cac-container" : ""}`}
        >
            {formIndex === 0 && (
                <>
                    {" "}
                    <div className="p-col-12">
                        <div className="p-grid p-nogutter p-align-center cac-header-container">
                            <div className="p-col-10 cac-header-title">
                                <h4>Application Load Balancer</h4>
                            </div>
                            <div className="p-col-2 p-text-right">
                                <img src={cac} alt="no image" className="cac-title-image" />
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="p-col-12 cac-form-container">
                {formIndex === 0 && (
                    <>
                        <div className="p-card cac-card">
                            <DataDrivenForm
                                schema={schema}
                                onSubmit={onSubmit}
                                data={form.configList.originalForm}
                            ></DataDrivenForm>
                        </div>
                        <div className="description col-10 mt-8">
                            <p>
                            </p>
                        </div>
                    </>
                )}
                {formIndex === 1 && (
                    <Review
                        configList1={form.configList1}
                        configList={form.configList}
                        setformIndex={setFormIndex}
                    />
                )}
                {formIndex === 2 && <Output output={form.output} />}
            </div>

            <ConnectionInfo
                setCredentials={setCredentials}
                setConnectionPopup={setShowCloudConnectionPopup}
                showCloudConnectionPopup={showCloudConnectionPopup}
            ></ConnectionInfo>
        </div>
    );
}
