import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import profile from "../../../../profile.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Chips } from "primereact/chips";
import { Review } from "../../../../components/Review/Review";
import { getUser } from "../../../../hooks/useFindUser";
import useNavBar from "../../../../hooks/useNavBar";
import { Dialog } from "primereact/dialog";
import {
  AwsCloud,
  AzureCloud,
} from "../../../../components/user/settings/cloudConnections/CloudConnections";
import { ToasterContext } from "../../../../components/common/Context";
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";


import settings from "../../../../settings.json";
const { ip } = settings;

export default function Ec2Clone() {
  // Account details
  const [navBar] = useNavBar();
  const user = getUser();
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null);
  const [ami, setami] = useState("");
  const [instance_type, setinstance_type] = useState("");
  const [dropDownOptions, setDropDownOptions] = useState({});

  const [formState, setformState] = useState(0);
  const { addMessage } = useContext(ToasterContext);
  const cloudConnection = {};
  let formGroupData = null;

  useEffect(() => {
    const { cloudId } = navBar;
    const { userId } = user;
    axios
      .get(Api.ip + `connectionInfo/${userId}/${cloudId}`)
      .then((response) => {
        const { accessKey, secretKey, accountCode } = response.data;
        setaws_secret_key(secretKey);
        setaws_access_key(accessKey);
        setaccountId(accountCode);

        console.log(accessKey, secretKey, accountCode);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const [output, setoutput] = useState("");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "Ec2Clone",

    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "ami": ami,
      "instance_type": instance_type,
    },
  };

  const configList1 = {
    "AWS Region": aws_region,
    "AMI ID": ami,
    "Instance Type": instance_type,
  };

  const clearInputField = () => {
    setaws_region("");
    setami("");
    setinstance_type("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,
        ami,
        instance_type,
      ];

      const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== "" && value !== "0";
      });

      if (allFieldsFilled) {
        setformState(1);
      } else {
        alert("fill all the fields");
      }
    } else {
      setShowCloudConnectionPopup(true);
    }
  };

  const setformIndex = (e) => {
    setformState(e);
  };

  const formGroup = (fromGroup) => {
    formGroupData = fromGroup;
  };

  const saveCloudProviderDetails = () => {
    const { form, validate } = formGroupData;
    const validation = validate();
    if (validation) {
      const { field, message } = validation;
      addMessage({
        severity: "error",
        summary: field,
        detail: message,
        sticky: true,
      });
    } else {
      const { accessKey, secretKey, accountCode } = form;
      setaws_secret_key(secretKey);
      setaws_access_key(accessKey);
      setaccountId(accountCode);
      setShowCloudConnectionPopup(false);
    }
  };

  
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

  const Footer = () => {
    return (
      <div>
        <Button
          style={{ marginRight: "16px" }}
          onClick={() => setShowCloudConnectionPopup(false)}
          className="Primary"
        >
          Cancel
        </Button>
        <Button onClick={saveCloudProviderDetails} className="Primary">
          Ok
        </Button>
      </div>
    );
  };

  if (formState === 0) {
    return (
      <>
        <div>
          <div class="clearfix">
            <div class="box3"></div>
            <div>
              {" "}
              <h4 class="box1">EC2 Instance Launch From AMI</h4>{" "}
            </div>

            <Header1 />
          </div>
          <hr
            style={{
              backgroundColor: "black",
              opacity: 0.1,
            }}
          />

          <section className="col-10 mx-auto">
            {/* <div>
            <img src={graph} className="image float-end" alt="home img" />
          </div> */}

            <div>
              <Form className="main-form ">
                <Card
                  style={{
                    padding: "10px",
                    margin: "10px",
                    width: "auto",
                    boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  <h6>AWS Region</h6>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="aws_region">AWS Region</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                          <Dropdown
                              optionLabel="name"
                              onChange={(e) => setaws_region(e.target.value)}
                              options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || []}
                              value={aws_region}
                              placeholder="Select AWS Region"
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>EC2 AMI</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="ami">EC2 AMI ID</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Dropdown
                            optionLabel="name"
                            onChange={(e) => setami(e.target.value)}
                            options={ dropDownOptions[STANDARD_CONTROL_CATEGORIES.AMI] || []}
                            value={ami}
                            placeholder="EC2 AMI ID"
                          />
                          </span>
                        </OverlayTrigger>
                        
                      </div>
                      <span className="span_hint_details">
                          An AMI is a template that contains the software
                          configuration (operating system, application server,
                          and applications) required to launch your instance.
                        </span>
                    </div>
                  </Form.Group>

                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Instance Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="instance_type">Instance Type</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                             <Dropdown
                            optionLabel="name"
                            onChange={(e) => setinstance_type(e.target.value)}
                            options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.INSTANCE_TYPE] || []}
                            value={instance_type}
                            placeholder="Instance Type"
                          />
                          </span>
                        </OverlayTrigger>
                        <span className="span_hint_details"><a href="https://aws.amazon.com/ec2/instance-types/" target="_blank"  icon="pi-external-link">Learn</a>
                             more about instance types and how they can meet your computing needs.
                     </span>
                      </div>
                     
                    </div>
                  </Form.Group>
                 

                  <div className="col-12 mt-4">
                    <Button
                      style={{ marginRight: "16px" }}
                      onClick={reviewList}
                      className="Primary"
                    >
                      Review
                    </Button>
                    <Button
                      style={{ marginRight: "16px" }}
                      onClick={clearInputField}
                      type="Reset"
                    >
                      Reset
                    </Button>
                  </div>
                </Card>
              </Form>
            </div>

          </section>
        </div>
        <div className="description col-10 mt-8">
      <p> This module will launch one EC2 instance, which is created using existing AMI.
        
        
        </p>
    </div>
        <Dialog
          header="Cloud Connection"
          visible={showCloudConnectionPopup}
          maximizable
          modal
          style={{ width: "50vw" }}
          footer={Footer}
          onHide={() => setShowCloudConnectionPopup(false)}
        >
          <div className="p-fluid p-formgrid p-grid cac-form">
            {navBar?.cloudId === 1 && (
              <AwsCloud
                formGroup={formGroup}
                cloudConnection={cloudConnection}
              ></AwsCloud>
            )}
          </div>
        </Dialog>
      </>
    );
  } else {
    if (formState === 1)
      return (
        <>
          <Review
            configList1={configList1}
            configList={configList}
            setformIndex={setformIndex}
          />
        </>
      );
    else {
      //  "/var/www/html/cac/3tier_ap4_outputsbs.txt"
      /*
          var fs = require('fs');
          var filepath="/var/www/html/cac/3tier_ap4_outputsbs.txt";
          var file=fs.readFileSync(filepath);
          setoutput(file);
  
          fetch("/var/www/html/cac/3tier_ap4_outputsbs.txt")
         .then(response => console.log(response.text()))
        .then(data => {
    // Do something with your data
      console.log(data);
      });          
         
*/
      // function rec() {
      //   axios
      //     .get(Api.ip + "Vpc3")
      //     .then((response) => setoutput(response.data));
      //   setTimeout(rec, 3000);
      // }
      // rec();

      return (
        <>
          <Output output={output} />
        </>
      );
    }
  }
}
