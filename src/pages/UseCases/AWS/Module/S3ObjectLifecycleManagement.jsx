import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import settings from "../../../../settings.json";
const { ip } = settings;

export default function S3ObjectLifecycleManagement() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [aws_access_key, setaws_access_key] = useState(null);

    const [aws_secret_key, setaws_secret_key] = useState(null);
    const [dropDownOptions, setDropDownOptions] = useState({});
    const { addMessage } = useContext(ToasterContext);


    const getDropDownValues = (categoryName) => {
        return axios.get(`${ip}standardControl/${categoryName}`);
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
                summary: "Enterprise Standards & Controls",
                detail: `Error fetching the Enterprise Standards & Controls`,
            });
        }
    };

    useEffect(() => {
        const categories = [
            STANDARD_CONTROL_CATEGORIES.REGION,
        ];
        getAllCategoryDropDownList(categories);
    }, []);


    const schema = useMemo(() => ({
        fields: [
            {
                name: 'layout',
                component: 'two-column',
                label: 'AWS Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'aws_region',
                        label: 'AWS Region',
                        component: "Dropdown",
                        options:
                            dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || [],
                        optionLabel: "name",
                        optionValue: "value",
                        filter: false,
                        showClear: true,
                        filterBy: "name",
                        placeholder: "AWS Region",
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'Bucket Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'bucket',
                        label: 'Bucket Name',
                        component: 'InputText',
                        type: 'text',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },
                    {
                        name: 'days1',
                        label: 'Days1',
                        component: 'InputText',
                        type: 'number',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'StorageClass Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'storage_class1',
                        label: 'StorageClass1',
                        component: 'InputText',
                        type: 'text',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },
                    {
                        name: 'days2',
                        label: 'Days2',
                        component: 'InputText',
                        type: 'number',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }, {
                        name: 'storage_class2',
                        label: 'StorageClass2',
                        component: 'InputText',
                        type: 'text',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },
                    {
                        name: 'days3',
                        label: 'Days3',
                        component: 'InputText',
                        type: 'number',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }
                ]
            },
            {
                name: 'layout',
                component: 'three-column',
                label: 'Marker Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'expired_object_delete_marker',
                        label: 'Expired Object Delete Marker',
                        component: 'InputSwitch',
                        uniqueKey: uuidv4()
                    }
                ]
            },
            {
                component: 'FORM_ARRAY',
                label: 'Marker Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'layout',
                        component: 'three-column',
                        label: 's',
                        uniqueKey: uuidv4(),
                        fields: [
                            {
                                name: 'expired_object_delete_marker',
                                label: 'Expired Object Delete Marker',
                                component: 'InputSwitch',
                                uniqueKey: uuidv4()
                            }
                        ]
                    }
                ]
            }
        ],
        footer: {
            submit: { label: 'Review' }
        }
    }), [dropDownOptions]);

    const onSubmit = (form) => {
        const { fields } = schema;
        if (aws_access_key) {
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'AWS',
                usecaseType: 'Module',
                usecaseName: 'S3ObjectLifecycleManagement',
                parameter: { ...form, ...{ aws_access_key, aws_secret_key, } }
            }
            setForm({ configList1, configList, output: '' });
            setFormIndex(1);
        } else {
            setShowCloudConnectionPopup(true);
        }
    }

    const preparePreviewObject = (form, fields) => {
        return fields.reduce((acc, item) => {
            if (item.fields) {
                acc = { ...acc, ...preparePreviewObject(form, item.fields) };
            } else {
                acc = { ...acc, ...{ [item.label]: form[item.name] } };
            };
            return acc;
        }, {});
    }

    const setCredentials = (input) => {
        setaws_access_key(input.accessKey)
        setaws_secret_key(input.secretKey)
    }

    return (
        <div className={`p-grid p-nogutter ${formIndex === 0 ? 'cac-container' : ''}`}>
            {formIndex === 0 &&
                <> <div className="p-col-12">
                    <div className="p-grid p-nogutter p-align-center cac-header-container">
                        <div className="p-col-10 cac-header-title">
                            <h4>S3 Object Lifecycle Management</h4>
                        </div>
                        <div className="p-col-2 p-text-right">
                            <img src={cac} alt="no image" className="cac-title-image" />
                        </div>
                    </div>
                </div>

                </>
            }
            <div className="p-col-12 cac-form-container">
                {formIndex === 0 && <><div className="p-card cac-card">
                    <DataDrivenForm schema={schema} onSubmit={onSubmit}
                        data={form.configList.parameter}>
                    </DataDrivenForm>
                </div>
                    <div className="description col-10 mt-8">
                        <p>This template will use Hardened AMI ID and launch one EC2 instance in provided subnet, It will also attach existing security group and IAM Role provided by user to EC2.
                        </p>
                    </div>
                </>
                }
                {formIndex === 1 &&
                    <Review configList1={form.configList1} configList={form.configList}
                        setformIndex={setFormIndex} />
                }
                {formIndex === 2 && <Output output={form.output} />}
            </div>

            <ConnectionInfo setCredentials={setCredentials}
                setConnectionPopup={setShowCloudConnectionPopup}
                showCloudConnectionPopup={showCloudConnectionPopup}>
            </ConnectionInfo>
        </div>


    );
}