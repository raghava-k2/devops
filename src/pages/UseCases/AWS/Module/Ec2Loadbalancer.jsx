import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';

export default function Ec2Loadbalancer() {

    const [form, setForm] = useState({ configList1: {}, configList: {}, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [aws_access_key, setaws_access_key] = useState(null);

    const [aws_secret_key, setaws_secret_key] = useState(null);

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
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'VPC Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'vpc_id',
                        label: 'VPC ID',
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
                        name: 'subnet1_id',
                        label: 'Subnet-1 ID',
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
                        name: 'availability_zone1',
                        label: 'Availability Zone - 1',
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
                        name: 'subnet2_id',
                        label: 'Subnet-2 ID',
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
                        name: 'availability_zone2',
                        label: 'Availability Zone - 2',
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


                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'EC2 Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'ec2_ami',
                        label: 'EC2 AMI ID',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                An AMI contains the software configuration (operating system,
                                application server, and applications) required to launch your
                                instance
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
                        name: 'instance_type',
                        label: 'Instance Type',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                <a href="https://aws.amazon.com/ec2/instance-types/">learn</a>
                                more about instance types and how they can meet your computing
                                needs.
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
                        name: 'ingress',
                        label: 'Ingress Port Number',
                        component: 'Chips',
                        helpMessage: (
                            <span className="span_hint_details">A security group is a set of firewall rules that control the traffic for your instance. Add port number to ingress rule that allows unrestricted access to the ports.
                                <br />*Multiple port numbers can be added in field seprated by enter</span>
                        ),
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'size',
                                min: 1
                            }
                        ]
                    },
                    {
                        name: 'key_name',
                        label: 'Key Name',
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

                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'EBS Volume Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'ebs_volume_name',
                        label: 'EBS Volume Name',
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
                        name: 'ebs_volume_type',
                        label: 'EBS Volume Type',
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
                        name: 'ebs_volume_size ',
                        label: 'EBS Volume Size',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                                An Amazon EBS volume is a durable, block-level storage device that you can attach to your instances.
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
        if (aws_access_key) {
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'AWS',
                usecaseType: 'Module',
                usecaseName: 'Ec2Loadbalancer',
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
            {formIndex === 0 && <div className="p-col-12">
                <div className="p-grid p-nogutter p-align-center cac-header-container">
                    <div className="p-col-10 cac-header-title">
                        <h4>EC2 With Load Balancer</h4>
                    </div>
                    <div className="p-col-2 p-text-right">
                        <img src={cac} alt="no image" className="cac-title-image" />
                    </div>
                </div>
            </div>
            }


            <div className="p-col-12 cac-form-container">
                {formIndex === 0 &&
                    <>
                        <div className="p-card cac-card">
                            <DataDrivenForm schema={schema} onSubmit={onSubmit}
                                data={form.configList.parameter}>
                            </DataDrivenForm>
                        </div>
                        <div className="description col-10 mt-8">
                            <p>
                                This module will manage the traffic between two instances created in two different subnets in two different availability zone.
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