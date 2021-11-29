import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';

export default function SnapshotPolicy() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

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
                name: 'layout',
                component: 'two-column',
                label: 'Region Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'region_name',
                        label: 'Region Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                Region where resource policy resides.
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }, {
                        name: 'storage_locations',
                        label: 'Storage Locations',
                        placeholder: 'Storage Locations',
                        component: 'Chips',
                        helpMessage: (
                            <span className="span_hint_details">
                                Cloud Storage bucket location to store the auto snapshot (regional or multi-regional).
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'size',
                                min: 1
                            }
                        ]
                    }
                ]
            }, {
                name: 'layout',
                component: 'two-column',
                label: 'Cycle Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'hours_in_cycle',
                        label: 'Hours In Cycle',
                        component: 'InputText',
                        type: 'number',
                        helpMessage: (
                            <span className="span_hint_details">
                                	The policy will execute every nth hour at the specified time.
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    }, {
                        name: 'start_time',
                        label: 'Start Time',
                        placeholder: 'Start Time',
                        component: 'Calendar',
                        timeOnly: true,
                        hourFormat: '24',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
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
            form.start_time = `${form.start_time.getHours()}:00`;
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'SnapshotPolicy',
                gcpCred: gcpCred,
                parameter: { ...form },
                originalForm: originalForm
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
                            <h4>Snapshot Policy</h4>
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
                            GCP compute resource policy, a policy that can be attached to a resource to specify or schedule actions on that resource. The policy for scheduling snapshots can be added.modified and removed from a persistent disk.GCP compute resource policy, a policy that can be attached to a resource to specify or schedule actions on that resource. The policy for scheduling snapshots can be added.modified and removed from a persistent disk.
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