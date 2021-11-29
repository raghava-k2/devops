import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';

export default function Computedisk() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

    const schema = useMemo(() => ({
        fields: [
            // {
            //     name: 'layout',
            //     component: 'two-column',
            //     label: 'Project Details',
            //     uniqueKey: uuidv4(),
            //     fields: [
            //         {
            //             name: 'project_id',
            //             label: 'Project Id',
            //             component: 'InputText',
            //             type: 'text',
            //             helpMessage: (
            //                 <span className="span_hint_details">
            //                     The project to which the resource belongs.
            //                 </span>
            //             ),
            //             uniqueKey: uuidv4(),
            //             validators: [
            //                 {
            //                     type: 'required',
            //                     value: true
            //                 }
            //             ]
            //         }
            //     ]
            // },
            {
                name: 'layout',
                component: 'two-column',
                label: 'Disk Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'disk_name',
                        label: 'Disk Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                Name of the disk.
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
                        name: 'size',
                        label: 'Size',
                        component: 'InputText',
                        type: 'number',
                        helpMessage: (
                            <span className="span_hint_details">
                                Size of the persistent disk, specified in GB.                            </span>
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
            },  {
                name: 'layout',
                component: 'two-column',
                label: 'Zone Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'zone_name',
                        label: 'Zone Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                A reference to the zone where the disk resides.
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
            form.size = parseInt(form.size);
            form.physical_block_size_bytes = parseInt(form.physical_block_size_bytes);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'Computedisk',
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
                            <h4>Compute Disk</h4>
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
                            GCP Persistent Disk Here comes the role of a persistent disk where a hard disk is created and attached to a virtual machine or cloud instance to store data on and compute. The hard disk can then be disconnected and reconnected to another virtual machine to complete any other computing operation using the data stored on the hard disk.
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