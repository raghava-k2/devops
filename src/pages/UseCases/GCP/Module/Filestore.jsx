import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import lodash from 'lodash';
import { createUseStyles } from "react-jss";

export default function Filestore() {

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
                label: 'File Store Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'filestore_name',
                        label: 'File Store Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                	The resource name of the filestore instance.
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },{
                        name: 'zone_name',
                        label: 'Zone Name',
                        component: 'InputText',
                        type: 'text',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },{
                        name: 'tier',
                        label: 'Tier Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                The service tier of the instance. Eg: BASIC_SSD, BASIC_HDD, PREMIUM..	
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },{
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
                    }
                ]
            }, {
                name: 'layout',
                component: 'two-column',
                label: 'Network Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'network_name',
                        label: 'Network Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                	The name of the GCE VPC network to which the instance is connected.
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
                        name: 'network_mode',
                        label: 'Network Mode',
                        component: 'Chips',
                        helpMessage: (
                            <span className="span_hint_details">
                                	IP versions for which the instance has IP addresses assigned. Eg: MODE_IPV4
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
            },{
                name: 'layout',
                component: 'two-column',
                label: 'File Share Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'file_share_name',
                        label: 'File Share Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                	The name of the fileshare.
                            </span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'required',
                                value: true
                            }
                        ]
                    },{
                        name: 'capacity_gb',
                        label: 'Capacity GB',
                        component: 'InputText',
                        type: 'number',
                        helpMessage: (
                            <span className="span_hint_details">
                                	File share capacity in GiB. Must be at least 1024 GiB for the standard tier, or 2560 GiB for the premium tier.
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
            const originalForm = lodash.cloneDeep(form);
            const configList = {
                providerName: 'GCP',
                usecaseType: 'Module',
                usecaseName: 'Filestore',
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
            configList.originalForm.network_project_id = input ? JSON.parse(input)['project_id'] : '';
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
                            <h4>Filestore</h4>
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
                            A Filestore instance is a fully managed network-attached storage system you can use with your Google Compute Engine and Kubernetes Engine instances.
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