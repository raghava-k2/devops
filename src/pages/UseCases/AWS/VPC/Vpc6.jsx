import { useMemo, useState, useEffect, useContext  } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import axios from "axios";
import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
const { ip } = settings;
export default function Vpc6() {

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
          summary: "Cloud Standards",
          detail: `Error fetching the Cloud Standards`,
        });
      }
    };
    useEffect(() => {
      const categories = [
        STANDARD_CONTROL_CATEGORIES.VPC,
        STANDARD_CONTROL_CATEGORIES.REGION,
        STANDARD_CONTROL_CATEGORIES.SECURITY_GROUP,
        STANDARD_CONTROL_CATEGORIES.KEY_NAME,
        STANDARD_CONTROL_CATEGORIES.SNS_TOPIC_NAME,
        STANDARD_CONTROL_CATEGORIES.INSTANCE_SCHEDULE,
        STANDARD_CONTROL_CATEGORIES.BACKUP,
        STANDARD_CONTROL_CATEGORIES.EBS_VOLUME_TYPE,
        STANDARD_CONTROL_CATEGORIES.IAM_PROFILE,
        STANDARD_CONTROL_CATEGORIES.INSTANCE_TYPE,
        STANDARD_CONTROL_CATEGORIES.AMI,
        STANDARD_CONTROL_CATEGORIES.EC2_TAGS,
        STANDARD_CONTROL_CATEGORIES.BACKUP,
        STANDARD_CONTROL_CATEGORIES.INSTANCE_SCHEDULE,
        STANDARD_CONTROL_CATEGORIES.AZ,
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
                        name: "aws_region",
                        label: "AWS Region",
                        component: "Dropdown",
                        options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || [],
                        optionLabel: "name",
                        optionValue: "value",
                        filter: true,
                        showClear: true,
                        filterBy: "name",
                        placeholder: "Select AWS Region",
                        uniqueKey: uuidv4(),
                        validators: [
                          {
                            type: "size",
                            min: 1,
                          },
                        ],
                      },
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'VPC Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'vpc1',
                        label: 'VPC ID - 1',
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
                        name: 'vpc2',
                        label: 'VPC ID - 2',
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
                label: 'Subnet Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'vpc1_subnet_ids',
                        label: 'VPC-1 Subnet Id\'s',
                        component: 'Chips',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'size',
                                min: 1
                            }
                        ]
                    },
                    {
                        name: 'vpc2_subnet_ids',
                        label: 'VPC-2 Subnet Id\'s',
                        component: 'Chips',
                        uniqueKey: uuidv4(),
                        validators: [
                            {
                                type: 'size',
                                min: 1
                            }
                        ]
                    }
                ]
            },
            {
                name: 'layout',
                component: 'two-column',
                label: 'Route Table Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'vpc1_route_table_id',
                        label: 'VPC-1 Route Table ID',
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
                        name: 'vpc2_route_table_id',
                        label: 'VPC-2 Route Table ID',
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
                label: 'CIDR Details',
                uniqueKey: uuidv4(),
                fields: [
                    {
                        name: 'destination_cidr_block1',
                        label: 'Destination CIDR Block-1',
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
                        name: 'destination_cidr_block2',
                        label: 'Destination CIDR Block-2',
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
            }
        ],
        footer: {
            submit: { label: 'Review' }
        }
    }), [dropDownOptions]);

    <div className="description col-10 mt-8">
    <p>This template will create one Transit Gateway(TGW) with two Transit Gateway Attachments,
    Next, it will create default Transit Gateway route table and updates VPC CIDR for transferring traffic from TGW to VPC,
    It will also add transit gateway entry in VPC route table for both VPC for return traffic (from VPC TO TGW).</p>
  </div>

    const onSubmit = (form) => {
        const { fields } = schema;
        if (aws_access_key) {
            const configList1 = preparePreviewObject(form, fields);
            const configList = {
                providerName: 'AWS',
                usecaseType: 'Module',
                usecaseName: 'vpc6',
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
                        <h4>VPC Transit Gateway</h4>
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
    <p>This template will create one Transit Gateway(TGW) with two Transit Gateway Attachments,
     It will also create default Transit Gateway Route Table and updates VPC CIDR for transferring traffic from TGW to VPC,
    It will also add Transit Gateway entry in VPC Route Table for both VPC for return traffic (from VPC TO TGW).</p>
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