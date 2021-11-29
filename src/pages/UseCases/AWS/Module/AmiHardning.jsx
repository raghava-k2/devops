import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from '../../../../images/CAC-Full-Logo-V1.0.jpg';
import * as cloneDeep from 'lodash/cloneDeep';
import settings from "../../../../settings.json";
import { ToasterContext } from "../../../../components/common/Context";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
const { ip } = settings;
export default function AmiHardning() {

    const [form, setForm] = useState({ configList1: {}, configList: {
        parameter:{
          folderName:"",
          builders:[
            {
                "access_key":"",
                "secret_key":"",
                "ssh_username": "",
                "ssh_pty": "",
                "instance_type":""
            }
        ],
        provisioners:[{
            "type":"",
            "execute_command": ""}]},
    }, output: '' });

    const [formIndex, setFormIndex] = useState(0);

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

    const [aws_access_key, setaws_access_key] = useState(null);

    const [aws_secret_key, setaws_secret_key] = useState(null);
    const [dropDownOptions, setDropDownOptions] = useState({});

    const { addMessage } = useContext(ToasterContext);
  
    const getDropDownValues = (categoryName) => {
      return axios.get(`${ip}standardControl/${categoryName}`);
    };
  
    const getDropDownValueContainParent = (categoryName, parentCategoryName) => {
      return axios.get(`${ip}standardControl/${categoryName}/${parentCategoryName}`);
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


    const onFolderSelect = ({ options }, { target: { value } }) => {
      const { originalName } = options.find(option => option.value === value);
      getDropDownValueContainParent(STANDARD_CONTROL_CATEGORIES.AMI_SCRIPTS_FILE, originalName)
        .then(({ data }) => {
          const values = data.map(i => ({ ...i, ...{ name: `${i.name} || ${i.value}` } }));
          const dropDown = { [STANDARD_CONTROL_CATEGORIES.AMI_SCRIPTS_FILE]: values };
          setDropDownOptions((p) => ({ ...p, ...dropDown }));
        }).catch(() => {
          addMessage({
            severity: "error",
            summary: "Cloud Standards",
            detail: `Error fetching the Cloud Standards with parent : ${originalName}`,
          });
        });
    }
  
    useEffect(() => {
      const categories = [
        STANDARD_CONTROL_CATEGORIES.REGION,
        STANDARD_CONTROL_CATEGORIES.AMI_SCRIPTS_FOLDER,
        STANDARD_CONTROL_CATEGORIES.INSTANCE_TYPE,
        STANDARD_CONTROL_CATEGORIES.AMI_TYPE
        
        
      ];
      getAllCategoryDropDownList(categories);
    }, []);

    const schema ={
        fields: [
            
            {

                component: "FORM_ARRAY",
                name: "builders",
                label: "Builders",
                className: "heading1",
                uniqueKey: uuidv4(),
                fields: [
                  {
                    name: "layout",
                    component: "two-column",
                    label: "",
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
                      {
                        name: "type",
                        label: "Type",
                        component: "Dropdown",
                        options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.AMI_TYPE] || [],
                        optionLabel: "name",
                        optionValue: "value",
                        filter: true,
                        showClear: true,
                        filterBy: "name",
                        placeholder: "Select AMI Type",
                        uniqueKey: uuidv4(),
                        validators: [
                          {
                            type: "size",
                            min: 1,
                          },
                        ],
                      },
                      
                      {
                        name: "source_ami",
                        label: "Source AMI",
                        component: "InputText",
                        uniqueKey: uuidv4(),
                        validators: [
                          {
                            type: "required",
                            value: true,
                          },
                        ],
                      },
                      {
                        name: "ami_name",
                        label: "AMI Name",
                        component: "InputText",
                        uniqueKey: uuidv4(),
                        validators: [
                          {
                            type: "required",
                            value: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "layout",
                component: "two-column",
                label: "Folder",
                uniqueKey: uuidv4(),
                fields: [
                  {
                    name: "folderName",
                    label: "Select Folder",
                    component: "Dropdown",
                    options:
                      dropDownOptions[STANDARD_CONTROL_CATEGORIES.AMI_SCRIPTS_FOLDER] || [],
                    optionLabel: "name",
                    optionValue: "value",
                    filter: false,
                    showClear: true,
                    filterBy: "name",
                    placeholder: "select folder",
                    onChange: onFolderSelect,
                    uniqueKey: uuidv4(),
                    validators: [
                      {
                        type: "size",
                        min: 1,
                      },
                    ],
                  }
                  
                ],
              },
              
              {

                component: "FORM_ARRAY",
                name: "provisioners",
                label: "Add scripts to be executed",
                className: "heading1",
                uniqueKey: uuidv4(),
                fields: [
                  {
                    name: "layout",
                    component: "two-column",
                    label: "",
                    uniqueKey: uuidv4(),
                    fields: [
                      {
                        name: "script",
                        label: "Script",
                        component: "Dropdown",
                        options:
                          dropDownOptions[STANDARD_CONTROL_CATEGORIES.AMI_SCRIPTS_FILE] || [],
                        optionLabel: "name",
                        optionValue: "value",
                        filter: false,
                        showClear: true,
                        filterBy: "name",
                        placeholder: "select Script",
                        uniqueKey: uuidv4(),
                        validators: [
                          {
                            type: "size",
                            min: 1,
                          },
                        ],
                      }
                      
                    ],
                  },
                ],
              }
        ],
        footer: {
            submit: { label: 'Review' }
        }
    }

    const onSubmit = (form) => {
        const { fields } = schema;
        if (aws_access_key) {

            // const configList1 = preparePreviewObject(form, fields);
            form.builders.forEach(i=>{i.access_key=aws_access_key;});
            form.builders.forEach(i=>{i.secret_key=aws_secret_key;});
            form.builders.forEach(i=>{i.ssh_username="ec2-user"});
            form.builders.forEach(i=>{i.ssh_pty="true"});
            form.builders.forEach(i=>{i.instance_type="c5.xlarge"});
            form.provisioners.forEach(i=>{i.execute_command="echo \'vagrant\' | {{.Vars}} sudo -S -E sh -eux \'{{.Path}}\'";});
            form.provisioners.forEach(i=>{i.type="shell"});
            const configList = {
                providerName: 'AWS',
                usecaseType: 'Module',
                usecaseName: 'AmiHardning',
                parameter: { ...form}
            }
            const configList1=cloneDeep(form)
            configList1.builders.forEach(i=>delete i.access_key)
            configList1.builders.forEach(i=>delete i.secret_key)
            configList1.builders.forEach(i=>delete i.ssh_username)
            configList1.builders.forEach(i=>delete i.ssh_pty)
            configList1.builders.forEach(i=>delete i.instance_type)
            configList1.provisioners.forEach(i=>delete i.execute_command)
            configList1.provisioners.forEach(i=>delete i.type)
            setForm({ configList1, configList, output: '' });
            setFormIndex(1);
        } else {
            setShowCloudConnectionPopup(true);
        }
    }

    const preparePreviewObject = (form, fields) => {
        return fields.reduce((acc, item) => {
            if (item.name==='layout') {
                acc = { ...acc, ...preparePreviewObject(form, item.fields) };
            }
            else if(item.fields){
              acc = { ...acc, ...{[item.label]:preparePreviewObject(form[item.name], item.fields)} };
            }
             else {
                acc = { ...acc, ...{ [item.label]: form[item.name] } };
            };
            console.log(acc);
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
                            <h4>Enterprise AMI Creation</h4>
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
                        data={form.configList.parameter}
                        >
                    </DataDrivenForm>

                </div>
                    <div className="description col-10 mt-8">
                        <p></p>
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