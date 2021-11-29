import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';
import { createUseStyles } from "react-jss";

export default function CloudArmorSecurityPolicy() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

    const useStyles = createUseStyles({
        'label-header': {
            fontSize: '0.85rem'
        }
    });

    const classes = useStyles();

    const schema = useMemo(() => ({
        fields: [
 {
                name: 'layout',
                component: 'two-column',
                label: 'Policy Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'policy_name',
                        label: 'Policy Name',
                        component: 'InputText',
                        type: 'text',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }
                ]
            }, {
                name: 'default_rule',
                component: 'FORM_ARRAY',
                className: 'heading1',
                label: 'Rules',
                min: 1,
                max: 1,
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: '',
                        component: 'two-column',
                        label: '',
                        uniqueKey: uuidv4(),
                        fields: [
                            {
                                name: 'action',
                                label: 'Action Name',
                                component: 'InputText',
                                type: 'text',
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                        value: true
                                    }
                                ]
                            }, {
                                name: 'priority',
                                label: 'Priority Name',
                                component: 'InputText',
                                type: 'text',
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                        value: true
                                    }
                                ]
                            }, {
                                name: 'versioned_expr',
                                label: 'Versioned Expr Name',
                                component: 'InputText',
                                type: 'text',
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                        value: true
                                    }
                                ]
                            }, {
                                name: 'source_ip_ranges',
                                label: 'Source IP Ranges',
                                component: 'Chips',
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'size',
                                        min: 1
                                    }
                                ]
                            }, {
                                name: 'description',
                                label: 'Description Name',
                                component: 'InputText',
                                type: 'text',
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                        value: true
                                    }
                                ]
                            }, {
                                name: 'preview',
                                label: 'Preview',
                                labelClassName: `${classes["label-header"]}`,
                                component: 'InputSwitch',
                                uniqueKey: uuidv4(),
                                validators: [
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        footer: {
            submit: { label: 'Review' }
        }
    }), []);


    const onSubmit = (form) => {
        const { fields } = schema;
        if (gcpCred) {
            const configList1 = preparePreviewObject(form, fields);
            const originalForm = lodash.cloneDeep(form);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'SecurityPolicy',
                gcpCred: gcpCred,
                parameter: { ...form },
                originalForm
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
        setForm(p => {
            const configList = lodash.cloneDeep(form.configList);
            configList.originalForm = configList.originalForm || {};
            configList.originalForm.project_id = input ? JSON.parse(input)['project_id'] : '';
            return { ...p, ...{ configList } };
        });
        setgcpCred(input)
    }

    return (
        <div className={`p-grid p-nogutter ${formIndex === 0 ? 'cac-container' : ''}`}>
            {formIndex === 0 &&
                <> <div className="p-col-12">
                    <div className="p-grid p-nogutter p-align-center cac-header-container">
                        <div className="p-col-10 cac-header-title">
                            <h4>Cloud Armor - Security Policy</h4>
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
                        data={form.configList.originalForm}>
                    </DataDrivenForm>
                </div>
                    <div className="description col-10 mt-8">
                        <p>
                        Google Cloud Armor security policies protect your application by regulating which requests are allowed and denied access to your load balancer.
Each security policy is made up of a set of rules that filter traffic based on conditions like an incoming request's IP address, IP range, region code, or request headers.
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