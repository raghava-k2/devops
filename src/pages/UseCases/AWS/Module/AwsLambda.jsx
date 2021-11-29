import { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';

export default function AwsLambda() {

    const [form, setForm] = useState({ configList1: {}, configList: {parameter:{bucketname:'', keyname:'', filename:'', createiam:'no', iamrolename:'', iamrolearn:'',}},
     output: '' });

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
                label: 'Bucket Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'bucketname',
                        label: 'Bucket Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                              Name of the S3 Bucket where the lambda code is residing.
                            </span>
                          ),
                        uniqueKey: uuidv4(),
                        
                    },
                    {
                        name: 'keyname',
                        label: 'Key Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                             Name of the S3 object, If code is present in S3 Bucket.
                             Example:sample-lambda/code.zip
                            </span>
                          ),
                        uniqueKey: uuidv4(),
                        
                    },
                    {
                        name: 'filename',
                        label: 'File Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                             Path of code within the local filesystem, if it is not present in S3 Bucket. Example:C:\\Users\\Downloads\\code.zip
                            </span>
                          ),
                        uniqueKey: uuidv4(),
                        
                    }
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'Lambda Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'lambdaname',
                        label: 'Lambda Name',
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
                component: 'six-column',
                label: 'IAM Role Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'createiam',
                        label: 'Create IAM Role',
                        component: 'ToggleButton',
                        onLabel: 'No',
                        offLabel: 'Yes',
                        onIcon: 'pi pi-times',
                        offIcon: 'pi pi-check',
                        uniqueKey: uuidv4()
                    }]},
                    {
                        name: 'layout',
                        component: 'two-column',
                        
                        uniqueKey: uuidv4(),
                        fields: [   
                    
                    {
                        name: 'iamrolename',
                        label: 'IAM Role Name',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                             Name of the IAM role to be created. Use this field only when create IAM role is set to yes.
                            </span>
                          ),
                        uniqueKey: uuidv4(),
                       
                    },
                    {
                        name: 'iamrolearn',
                        label: 'IAM Role ARN',
                        component: 'InputText',
                        type: 'text',
                        helpMessage: (
                            <span className="span_hint_details">
                            ARN of the IAM role present. Use this field only when create IAM role is set to no.
                            </span>
                          ),
                        uniqueKey: uuidv4(),
                       
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
            form.createiam =form.createiam ?'no':'yes';
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'AWS',
                usecaseType: 'Module',
                usecaseName: 'AwsLambda',
                parameter: {...form, ...{ aws_access_key, aws_secret_key } }
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
                            <h4>Lambda Function</h4>
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
                        <p>AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers.
This module will create Lambda function which can take code from S3 bucket or Local path.
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