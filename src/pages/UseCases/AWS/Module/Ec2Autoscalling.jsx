import {  useContext, useEffect, useMemo, useState  } from "react";
import { v4 as uuidv4 } from "uuid";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import DataDrivenForm from "../../../../components/dataDrivenForm/DataDrivenForm";
import Output from "../../../../components/Output";
import { Review } from "../../../../components/Review/Review";
import cac from "../../../../images/CAC-Full-Logo-V1.0.jpg";
import { ToasterContext } from "../../../../components/common/Context";
import axios from "axios";
import settings from "../../../../settings.json";
import lodash from "lodash";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
const { ip } = settings;
export default function Ec2Autoscalling() {
  const [form, setForm] = useState({
    configList1: {},
    configList: {},
    output: "",
  });

  const [formIndex, setFormIndex] = useState(0);

  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);

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

  const schema = useMemo(
    () => ({
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
          label: "VPC Details",
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
              name: "vpc_subnet_ids",
              label: "Subnet",
              component: "MultiSelect",
              options: dropDownOptions[STANDARD_CONTROL_CATEGORIES.SUBNET_NAME] || [],
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
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "EC2 and Security Group Details",
          uniqueKey: uuidv4(),
          fields: [
           
            {
              name: "ec2_ami",
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
              helpMessage: (
                <span className="span_hint_details">
                  <a href="https://aws.amazon.com/ec2/instance-types/" target="_blank">learn</a>
                  more about instance types and how they can meet your computing
                  needs.
                </span>
              ),
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
            
            {
              name: "ingress",
              label: "Ingress Port Number",
              component: "Chips",
              helpMessage: (
                <span className="span_hint_details">
                  A security group is a set of firewall rules that control the
                  traffic for your instance. Add port number to ingress rule
                  that allows unrestricted access to the ports.
                  <br />
                  *Multiple port numbers can be added in field seprated by enter
                </span>
              ),
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "size",
                  min: 1,
                },
              ],
            },
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
          ],
        },
        {
          name: "layout",
          component: "two-column",
          label: "Autoscaling Group Details",
          uniqueKey: uuidv4(),
          fields: [
            {
              name: "autoscaling_desired_capacity",
              label: "Autoscallig Desired Capacity",
              component: "InputText",
              type: "number",
              helpMessage: (
                <span className="span_hint_details">
                  The number of Amazon EC2 instances that should be running in the autoscaling group.
                </span>
              ),
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "required",
                  value: true,
                },
              ],
            },
            {
              name: "autoscaling_min_size",
              label: "Autoscaling Minimum Size",
              component: "InputText",
              type: "number",
              helpMessage: (
                <span className="span_hint_details">
                  The minimum size of the autoscaling group.
                </span>
              ),
              uniqueKey: uuidv4(),
              validators: [
                {
                  type: "required",
                  value: true,
                },
              ],
            },
            {
              name: "autoscaling_max_size",
              label: "Autoscaling Maximum Size",
              component: "InputText",
              type: "number",
              helpMessage: (
                <span className="span_hint_details">
                  The maximum size of the autoscaling group.
                </span>
              ),
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
      footer: {
        submit: { label: "Review" },
      },
    }),
    [dropDownOptions]
  );

  const onSubmit = (form) => {
    const { fields } = schema;
    if (aws_access_key) {
      const configList1 = preparePreviewObject(form, fields);
      const configList = {
        providerName: "AWS",
        usecaseType: "Module",
        usecaseName: "Ec2Autoscalling",
        parameter: { ...form, ...{ aws_access_key, aws_secret_key } },
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
  };

  return (
    <div
      className={`p-grid p-nogutter ${formIndex === 0 ? "cac-container" : ""}`}
    >
      {formIndex === 0 && (
        <div className="p-col-12">
          <div className="p-grid p-nogutter p-align-center cac-header-container">
            <div className="p-col-10 cac-header-title">
              <h4>EC2 Autoscaling</h4>
            </div>
            <div className="p-col-2 p-text-right">
              <img src={cac} alt="no image" className="cac-title-image" />
            </div>
          </div>
        </div>
      )}

      <div className="p-col-12 cac-form-container">
        {formIndex === 0 && <> (
          <div className="p-card cac-card">
            <DataDrivenForm
              schema={schema}
              onSubmit={onSubmit}
              data={form.configList.parameter}
            ></DataDrivenForm>
          </div>
          <div className="description col-10 mt-8">
        <p>
          This Module will create EC2 with autoscaling group and it will also
          create security group with multiple inbound rules provided by user and
          attach it to EC2.
        </p>
      </div>
        )</>}
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
