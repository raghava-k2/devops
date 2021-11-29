import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Chips } from 'primereact/chips';
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";

import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
const { ip } = settings;
export default function Vpc5() {

  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
  useState(false);
const [aws_region, setaws_region] = useState("");
const [aws_access_key, setaws_access_key] = useState(null);
const [aws_secret_key, setaws_secret_key] = useState(null);
const [accountId, setaccountId] = useState(null);
const [dropDownOptions, setDropDownOptions] = useState({});
  // VPC details
  const [vpc_id, setvpc_id] = useState("");
  const [private_rt_id, setprivate_rt_id] = useState("");

  const [formState, setformState] = useState(0);
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);


  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "vpc5",


    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,

      "vpc_id": vpc_id,
      "private_rt_id": private_rt_id,
    }
  };

  const configList1 = {
    "AWS Region": aws_region,
    "CIDR Block": vpc_id,
    "Private RT ID": private_rt_id,

  };


  const clearInputField = () => {
    setaws_region("");
    setvpc_id("");
    setprivate_rt_id("");



  };
  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e);
  };

  const setCredentials = (list) => {
    setaws_access_key(list.accessKey);
    setaws_secret_key(list.secretKey);
    setaccountId(list.accountCode);
    console.log(list);
  };
  const reviewList = (e) => {
    e.preventDefault();
    if(aws_access_key) {
    const values = [
      aws_region,
      aws_access_key,
      aws_secret_key,
      vpc_id,
      private_rt_id,
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
    setConnectionPopup(true);
  }
};

  const setformIndex = (e) => {
    setformState(e)
  }

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
  if (formState === 0) {
    return (
      <>
        <div>

          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">VPC Gateway Endpoints for (S3 and DynamoDB) Services</h4> </div>

            {/* <div> <h4 class="box1">Standalone VPC with Public and Private Subnets Creation</h4> </div> */}

            <Header1 />
          </div>
          <hr
            style={{

              backgroundColor: "black",
              opacity: .1

            }}

          />

          <section className="col-10 mx-auto">
            {/* <div>
            <img src={graph} className="image float-end" alt="home img" />
          </div> */}

            <div><Form className="main-form ">


              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)" }}>
                <h6>AWS Details</h6>

                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">AWS Region</Tooltip>} placement="left">
                        <span>
                        <Dropdown
                              optionLabel="name"
                              onChange={(e) => setaws_region(e.target.value)}
                              options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || []}
                              value={aws_region}
                              placeholder="Select AWS Region"
                            /></span></OverlayTrigger>
                    </div>



                  </div>
                </Form.Group>
                <hr
                  style={{

                    backgroundColor: "black",
                    opacity: .1

                  }}

                />

                <h6>VPC Details</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc_id">VPC ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc_id(e.target.value)}
                            name="vpc_id "
                            id="vpc_id "
                            value={vpc_id}
                            placeholder="VPC ID"
                            required=""
                          /></span></OverlayTrigger>
                          <span className="span_hint_details" >The VPC in which to create your endpoint.</span>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="Private RT ID">Route Table ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setprivate_rt_id(e.target.value)}
                            name="private_rt_id "
                            id="private_rt_id "
                            value={private_rt_id}
                            placeholder="Route Table ID"
                            required=""
                          /></span></OverlayTrigger>
                          <span className="span_hint_details" >Subnets associated with selected route tables will be able to access this endpoint.</span>
                    </div>

                  </div>
                </Form.Group>

                <ConnectionInfo
                    setCredentials={setCredentials}
                    setConnectionPopup={setConnectionPopup}
                    showCloudConnectionPopup={showCloudConnectionPopup}
                  ></ConnectionInfo>

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
            </Form></div>
          </section>
        </div>

        <div className="description col-10 mt-8">
    <p>
       This template will create VPC Gateway Endpoints for services S3 and DynamoDB,
       A VPC endpoint enables connections between a virtual private cloud (VPC) and supported services, without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Therefore, your VPC is not exposed to the public internet.
      </p>
  </div>


      </>
    );
  } else {
    if (formState === 1)

      return (
        <>

        <Review configList1={configList1} configList={configList} setformIndex={setformIndex} />


        </>
      );
    else {
                
      return (
        <>
          <Output output={output} />
        </>
      );
    }
  }
}
