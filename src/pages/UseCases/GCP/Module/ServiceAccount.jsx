import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';

export default function ServiceAccount() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

    const schema = useMemo(() => ({
        fields: [
            {
                name: 'layout',
                component: 'two-column',
                label: 'Service Account Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'service_account_id',
                        label: 'Service Account ID',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                Unique ID within project, must be 6-30 characters long, and match the regular expression ([ a-z ])([-a-z0-9]*[a-z0-9]).
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },
                    {
                        name: 'description',
                        label: 'Description',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                A text description of the service account.

                            </span>
                        ),
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


        ],
        footer: {
            submit: { label: 'Review' }
        }
    }), []);


    const onSubmit = (form) => {
        const { fields } = schema;
        if (gcpCred) {
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'ServiceAccount',
                gcpCred: gcpCred,
                parameter: { ...form }
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
            configList.parameter = configList.parameter || {};
            configList.parameter.project = input ? JSON.parse(input)['project_id'] : '';
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
                            <h4>Service Account</h4>
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
                        <p>
                            A service account is a special kind of account used by an application or a virtual machine (VM) instance.
                            Applications use service accounts to make authorized API calls, authorized as either the service account itself, or as Google Workspace or Cloud Identity users through domain-wide delegation.
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