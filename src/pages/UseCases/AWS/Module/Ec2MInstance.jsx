import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { ToasterContext } from "../../../../components/common/Context";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from "../../../../images/CAC-Full-Logo-V1.0.jpg";
import settings from "../../../../settings.json";
import lodash from "lodash";
import { createUseStyles } from "react-jss";
import { unstable_batchedUpdates } from "react-dom";

const { ip } = settings;

export default function Ec2MInstance() {
  const [form, setForm] = useState({
    configList1: {},
    configList: {
      originalForm: {
        ebs_volume_name: '',
        ebs_volume_type: '',
        ebs_volume_size: '0'
      }
    },
    output: "",
  });

  const [formIndex, setFormIndex] = useState(0);

  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);

  const [aws_access_key, setaws_access_key] = useState(null);

  const [aws_secret_key, setaws_secret_key] = useState(null);

  const [aws_accountid, setaws_accountid] = useState(null);

  const [dropDownOptions, setDropDownOptions] = useState({});

  const [enableEBSFields, setEnableEBSFields] = useState(false);

  const { addMessage } = useContext(ToasterContext);

  const useStyles = createUseStyles({
    'enable-ebs': {
      marginBottom: '10px !important'
    }
  });

  const classes = useStyles();

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
        if (categories[index] === STANDARD_CONTROL_CATEGORIES.EC2_TAGS) {
          setForm((p) => {
            const { originalForm = {} } = lodash.cloneDeep(p.configList);
            originalForm.Instance_tag = data.reduce((acc, item, index) => {
              acc[`key${index}`] = item.value;
              return acc;
            }, {});
            return { ...p, ...{ configList: { originalForm } } };
          });

          acc[categories[index]] = data;
        } else {
          acc[categories[index]] = data.map((i) => ({
            ...i, ...{
              originalName: i.name,
              name: `${i.name} || ${i.value}`
            }
          }));
        }
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

  const createInstanceSchemaFields = (data) => {
    const map = new Map();
    map.set('Backup', STANDARD_CONTROL_CATEGORIES.BACKUP);
    map.set('Instance_Schedule', STANDARD_CONTROL_CATEGORIES.INSTANCE_SCHEDULE);
    const arrayField = {
      name: "",
      label: "Key",
      component: "Dropdown",
      options: [],
      optionLabel: "name",
      optionValue: "value",
      filter: true,
      showClear: true,
      filterBy: "name",
      placeholder: "Select Key",
      uniqueKey: '',
      validators: [
        {
          type: "size",
          min: 1,
        },
      ],
    };
    const valueField = {
      name: "",
      label: "Value",
      component: "InputText",
      type: "text",
      placeholder: "Value",
      uniqueKey: '',
      validators: [{ type: 'required', value: true }],
    }
    const updatedInstaceTagFields = data.reduce((acc, d, index) => {
      const updatedArrayField = lodash.cloneDeep(arrayField);
      const updatedValueField = lodash.cloneDeep(valueField);
      updatedArrayField.name = `key${index}`;
      updatedArrayField.options = dropDownOptions[STANDARD_CONTROL_CATEGORIES.EC2_TAGS];
      updatedArrayField.uniqueKey = uuidv4();
      if (map.get(d.name)) {
        const updatedSubArrayField = lodash.cloneDeep(arrayField);
        updatedSubArrayField.name = `value${index}`;
        updatedSubArrayField.options = dropDownOptions[map.get(d.name)];
        updatedSubArrayField.uniqueKey = uuidv4();
        acc = [...acc, ...[updatedArrayField, updatedSubArrayField]];
      } else {
        updatedValueField.name = `value${index}`;
        updatedValueField.uniqueKey = uuidv4();
        acc = [...acc, ...[updatedArrayField, updatedValueField]];
      }
      return acc;
    }, []);
    return updatedInstaceTagFields;
  }

  const onVpcSelected = ({ options }, { target: { value } }) => {
    const { originalName } = options.find(option => option.value === value);
    getDropDownValueContainParent(STANDARD_CONTROL_CATEGORIES.SUBNET_NAME, originalName)
      .then(({ data }) => {
        const values = data.map(i => ({ ...i, ...{ name: `${i.name} || ${i.value}` } }));
        const dropDown = { [STANDARD_CONTROL_CATEGORIES.SUBNET_NAME]: values };
        setDropDownOptions((p) => ({ ...p, ...dropDown }));
      }).catch(() => {
        addMessage({
          severity: "error",
          summary: "Cloud Standards",
          detail: `Error fetching the Cloud Standards with parent : ${originalName}`,
        });
      });
  }

  const onChangeOfEbsEnable = (_, { target: { value } }) => {
    unstable_batchedUpdates(() => {
      if (!value) {
        setTimeout(() => {
          setForm((p) => {
            const { originalForm = {} } = lodash.cloneDeep(p.configList);
            originalForm.ebs_volume_name = '';
            originalForm.ebs_volume_type = '';
            originalForm.ebs_volume_size = '0';
            return { ...p, ...{ configList: { originalForm } } };
          });
        }, 1000);
      }
      setEnableEBSFields(value);
    });
  }

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
      STANDARD_CONTROL_CATEGORIES.LOADBALANCER_TYPE,
      STANDARD_CONTROL_CATEGORIES.PROTOCOL
    ];
    getAllCategoryDropDownList(categories);
  }, []);

  const schema = useMemo(() => {
    const instaceTagFields = createInstanceSchemaFields((dropDownOptions[STANDARD_CONTROL_CATEGORIES.EC2_TAGS] || []));
    return {
      fields: [
        {
          name: "layout",
          component: "two-column",
          label: "AWS Details",
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
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "VPC and Security Group",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "vpc_id",
              label: "VPC",
              component: "Dropdown",
              options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.VPC] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: false,
              showClear: true,
              filterBy: "name",
              placeholder: "Select VPC",
              onChange: onVpcSelected,
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "subnet_id",
              label: "Subnet",
              component: "MultiSelect",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.SUBNET_NAME] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: false,
              showClear: true,
              filterBy: "name",
              placeholder: "Select Subnet ID",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "availability_zones",
              label: "Availablilty Zone",
              component: "Chips",
              
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "security_group_ids",
              label: "Security Group",
              component: "MultiSelect",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.SECURITY_GROUP] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Select Security Group",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "EC2 Instance",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "key_name",
              label: "Key Name",
              component: "Dropdown",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.KEY_NAME] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Select Key Name",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "ami_id",
              label: "AMI",
              component: "Dropdown",
              options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.AMI] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Select AMI",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "instance_count",
              label: "Total Instance Count",
              component: "InputText",
              type: "number",
              placeholder: "Enter the number of Instance to create",
              
              uniqueKey: uuidv4(),
              validators: [],
            },
            {
              name: "instance_type",
              label: "Instance Type",
              component: "Dropdown",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.INSTANCE_TYPE] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Select Instance Type",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            {
              name: "iam_instance_profile",
              label: "IAM Instance Profile",
              component: "Dropdown",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.IAM_PROFILE] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Select IAM Instance Profile",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "EC2 EBS Data volume",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "Create_ebs",
              label: "Do you want to have EBS Data Volume ?",
              component: "InputSwitch",
              containerClass: `p-col-12 ${classes["enable-ebs"]}`,
              placeholder: "Do you want to edit EBS Settings",
              uniqueKey: uuidv4(),
              onChange: onChangeOfEbsEnable,
              validators: [],
            },
            {
              name: "ebs_volume_name",
              label: "Ebs Volume Name",
              component: "InputText",
              type: "text",
              helpMessage: (
                <span className='span_hint_details'>
                &ensp;&ensp;&ensp;&ensp;EBS Volume name example: /dev/sdf             </span>
              ),
              placeholder: "Ebs Volume Name",
              uniqueKey: uuidv4(),
              disabled: !enableEBSFields,
              validators: [],
            },
            {
              name: "ebs_volume_type",
              label: "Ebs Volume Type",
              component: "Dropdown",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.EBS_VOLUME_TYPE] ||
                [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "Ebs Volume Type",
              disabled: !enableEBSFields,
              uniqueKey: uuidv4(),
              validators: [],
            },
            {
              name: "ebs_volume_size",
              label: "Ebs Volume Size (in GiB)",
              component: "InputText",
              type: "number",
              placeholder: "Ebs Volume Size",
              disabled: !enableEBSFields,
              uniqueKey: uuidv4(),
              validators: [],
            },


          ],
        },
        
        {
          name: "layout",
          component: "two-column",
          label: "SNS Variables",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "sns_topic_name",
              label: "SNS Topic Name",
              component: "Dropdown",
              options:
                dropDownOptions[STANDARD_CONTROL_CATEGORIES.SNS_TOPIC_NAME] || [],
              optionLabel: "name",
              optionValue: "value",
              filter: true,
              showClear: true,
              filterBy: "name",
              placeholder: "SNS Topic Name",
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "",
              label: "",
              component: "",
              type: "",
              helpMessage: (
                <span style={{ fontSize: '11px', color: 'orange', fontWeight: 'bold' }}>
                  Note: 1. Backup tag can have only three values Daily, Weekly, Monthly.
                  <br />&nbsp; &ensp; &ensp; &ensp; 2. Instance Schedule can have only two valuse Tier1, Tier2.             </span>
              ),
              uniqueKey: uuidv4(),
              validators: [
                {

                },
              ],
            },
          ],
        },
        {
          component: "SUB_FORM",
          name: "Instance_tag",
          label: "Tags ",
          className: "heading1",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "layout",
              component: "two-column",
              label: "",
              uniqueKey: uuidv4(),
              fields: instaceTagFields
            },
          ],
        },

      ],
      footer: {
        submit: { label: "Review" },
      },
    }
  }, [dropDownOptions, enableEBSFields]);

  const onSubmit = (form) => {
    const { fields } = schema;
    if (aws_access_key) {
      const configList1 = preparePreviewObject(form, fields);
      const originalForm = lodash.cloneDeep(form);
      const tempTag = {};
      for (let i = 0; i < (Object.keys(form.Instance_tag).length / 2); i++) {
        tempTag[form.Instance_tag[`key${i}`]] = form.Instance_tag[`value${i}`];
      }
      
      form.Create_ebs=form.Create_ebs?'true':'false';
      form.Instance_tag = tempTag;
      const configList = {
        providerName: "AWS",
        usecaseType: "Module",
        usecaseName: "Ec2MInstance",
        parameter: {
          ...form,
          ...{ aws_access_key, aws_secret_key, aws_accountid },
        },
        originalForm: originalForm
      };
      setForm({ configList1, configList, output: "" });
      setFormIndex(1);
    } else {
      setShowCloudConnectionPopup(true);
    }
  };

  const preparePreviewObject = (form, fields) => {
    return fields.reduce((acc, item) => {
      if (item.fields) {
        acc = { ...acc, ...preparePreviewObject(form, item.fields) };
      } else {
        acc = { ...acc, ...{ [item.label]: form[item.name] } };
      }
      return acc;
    }, {});
  };

  const setCredentials = (input) => {
    setaws_access_key(input.accessKey);
    setaws_secret_key(input.secretKey);
    setaws_accountid(input.accountCode);
  };

  const onChange = (form) => {
    setForm((p) => {
      return { ...p, ...{ configList: { originalForm: form } } };
    });
  }

  return (
    <div
      className={`p-grid p-nogutter ${formIndex === 0 ? "cac-container" : ""}`}
    >
      {formIndex === 0 && (
        <>
          {" "}
          <div className="p-col-12">
            <div className="p-grid p-nogutter p-align-center cac-header-container">
              <div className="p-col-10 cac-header-title">
                <h4>EC2 (Multiple) Instance Creation</h4>
              </div>
              <div className="p-col-2 p-text-right">
                <img src={cac} alt="no image" className="cac-title-image" />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-col-12 cac-form-container">
        {formIndex === 0 && (
          <>
            <div className="p-card cac-card">
              <DataDrivenForm
                schema={schema}
                onSubmit={onSubmit}
                data={form.configList.originalForm}
                onChange={onChange}
              ></DataDrivenForm>
            </div>
            <div className="description col-10 mt-8">
              <p>
              <span style={{ fontWeight: "bold" }}>
                  This module will create an EC2 (Multiple) Instance with the below
                  features which are in line to the pre-defined Cloud Standards
                  of the Organization:
                </span>
                <br />
                &#10148; Customised AMI (This image can be created separately in
                the tool by installing the required software like Antivirus,
                Patch Manager as well as any OS hardening scripts).
                <br />
                &#10148; Security Groups to be allowed.
                <br />
                &#10148; EBS Storage Volume, which is encrypted or non-encrypted
                depending on the pre-defined Cloud Standards.
                <br />
                &#10148; IAM Roles
                <br />
                &#10148; Tags
                <br />
                &#10148; Logging
                <br />
                &#10148; Monitoring
                <br />
                &#10148; SNS Subscriptions
                
                <br />
                &#10148; Instance Scheduling
                <br />
                &#10148; Backup
              </p>
            </div>
          </>
        )}
        {formIndex === 1 && (
          <Review
            configList1={form.configList1}
            configList={form.configList}
            setformIndex={setFormIndex}
          />
        )}
        {formIndex === 2 && <Output output={form.output} />}
      </div>

      <ConnectionInfo
        setCredentials={setCredentials}
        setConnectionPopup={setShowCloudConnectionPopup}
        showCloudConnectionPopup={showCloudConnectionPopup}
      ></ConnectionInfo>
    </div>
  );
}
