import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';

export default function Storagebucket() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [gcpCred, setgcpCred] = useState(null);

    const schema = useMemo(() => ({
        fields: [
            {
                name: 'layout',
                component: 'two-column',
                label: 'Bucket Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'bucket_name',
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
                        name: 'bucket_location',
                        label: 'Bucket Location',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                Location of the bucket
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

                ],

            },


        ],
        footer: {
            submit: { label: 'Review' }
        }
    }), []);

    //     <div className="description col-10 mt-8">
    //     <p>This template will create one Transit Gateway(TGW) with two Transit Gateway Attachments,
    //     Next, it will create default Transit Gateway route table and updates VPC CIDR for transferring traffic from TGW to VPC,
    //     It will also add transit gateway entry in VPC route table for both VPC for return traffic (from VPC TO TGW).</p>
    //   </div>

    const onSubmit = (form) => {
        const { fields } = schema;
        if (gcpCred) {
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'Storagebucket',
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
        })
        setgcpCred(input)
    }


    return (
        <div className={`p-grid p-nogutter ${formIndex === 0 ? 'cac-container' : ''}`}>
            {formIndex === 0 &&
                <> <div className="p-col-12">
                    <div className="p-grid p-nogutter p-align-center cac-header-container">
                        <div className="p-col-10 cac-header-title">
                            <h4>Storage Bucket</h4>
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

                            The Buckets resource represents a bucket in Cloud Storage. There is a single global namespace shared by all buckets.Buckets contain objects which can be accessed by their own methods.

                            In addition to the acl property, buckets contain bucketAccessControls, for use in fine-grained manipulation of an existing bucket's access controls.

                            A bucket is always owned by the project team owners group.</p>
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