import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';

export default function LogExport() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

    const schema = useMemo(() => ({
        fields: [
            {
                name: 'layout',
                component: 'two-column',
                label: 'Router Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'log_sink_name',
                        label: 'Log Sink Name ',
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
                        name: 'destination_uri',
                        label: 'Destination URI',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                The destination of the sink (where logs are written to). Can be a Cloud Storage bucket, a PubSub topic, a BigQuery dataset or a Cloud Logging bucket.
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
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'Parent Resource Details',
                uniqueKey: uuidv4(),
                fields: [
                    
                    {
                        name: 'parent_resource_id',
                        label: 'Parent Resource ID',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                The ID of the GCP resource in which you create the log sink.
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
                        name: 'parent_resource_type',
                        label: 'Parent Resource Type',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                The GCP resource in which you create the log sink. The value must be one of the following: 'project', 'folder', 'billing_account', or 'organization'.
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
            }, {
                name: 'exclusions',
                component: 'FORM_ARRAY',
                className: "heading1",
                min: 1,
                max: 1,
                label: 'Exclusion Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: "layout",
                        component: "two-column",
                        label: "",
                        uniqueKey: uuidv4(),
                        fields: [
                            {
                                name: 'name',
                                label: 'Name',
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
                                name: 'description',
                                label: 'Description',
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
                                name: 'filter',
                                label: 'Filter',
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
                                name: '',
                                label: '',
                                component: '',

                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                       // value: true
                                    }
                                ]
                            },
                            {
                                name: 'disabled',
                                label: 'Disable',
                                component: 'InputSwitch',
                                helpMessage: (
                                    <span className="span_hint_details">
                                        	If this sink is disabled then it does not export any log entries.
                                    </span>
                                ),
                                uniqueKey: uuidv4(),
                                validators: [
                                    {
                                        type: 'required',
                                       // value: true
                                    }
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
            form.disabled = form.disabled ? 'true' : 'false';

            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'LogExport',
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
            configList.parameter.project_id = input ? JSON.parse(input)['project_id'] : '';
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
                            <h4>Log Export - Logging Sinks</h4>
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
                        This module describes a sink used to export log entries to one of the following destinations in any project: a Cloud Storage bucket, a BigQuery dataset, a Cloud Pub/Sub topic or a Cloud Logging Bucket. A logs filter controls which log entries are exported. The sink must be created within a project, organization, billing account, or folder.
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