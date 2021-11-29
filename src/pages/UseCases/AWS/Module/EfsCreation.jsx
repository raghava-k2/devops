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
import settings from "../../../../settings.json";
import { ToasterContext } from "../../../../components/common/Context";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import { Dropdown } from "primereact/dropdown";
const { ip } = settings;

export default function EfsCreation() {

  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null);

  const [efs_name, setefs_name] = useState("");
  const [availability_zone_name, setavailability_zone_name] = useState("");


  const [formState, setformState] = useState(0);


  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);
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
        summary: "Enterprise Standards & Controls",
        detail: `Error fetching the Enterprise Standards & Controls`,
      });
    }
  };

  useEffect(() => {
    const categories = [
      STANDARD_CONTROL_CATEGORIES.REGION,
    ];
    getAllCategoryDropDownList(categories);
  }, []);

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "EfsCreation",


    "parameter": {

      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "aws_region": aws_region,
      "efs_name": efs_name,
      "availability_zone_name": availability_zone_name,


    }
  };

  const configList1 = {
    "Region": aws_region,
    "Name": efs_name,
    "availability_zone_name": availability_zone_name,





  };


  const clearInputField = () => {
    setaws_region("");

    setavailability_zone_name("");
    setefs_name("");

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
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,

        availability_zone_name,
        efs_name,



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
    setformState(e);
  };


  if (formState === 0) {
    return (
      <>
        <div>

          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">EFS(Elastic File System) Creation</h4> </div>



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
                <h6>AWS Region:</h6>

                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region">AWS Region</Tooltip>} placement="left">
                        <span>
                          <Dropdown
                            optionLabel="name"
                            onChange={(e) => setaws_region(e.target.value)}
                            options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || []}
                            value={aws_region}
                            placeholder="Select AWS Region"
                          />
                        </span></OverlayTrigger>
                    </div>



                  </div>
                </Form.Group>
                <hr
                  style={{

                    backgroundColor: "black",
                    opacity: .1

                  }}

                />

                <h6>EFS Details:</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="efs_name">EFS Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setefs_name(e.target.value)}
                            name="efs_name"
                            id="efs_name"
                            value={efs_name}
                            placeholder="EFS Name"
                            required=""
                          /></span></OverlayTrigger>
                      <span className="span_hint_details">
                        Name must not be longer than 256 characters, and must only contain letters, numbers, and these characters: + - = . _ : /
                      </span>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="availability_zone_name">Availability Zone</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setavailability_zone_name(e.target.value)}
                            name="availability_zone_name "
                            id="availability_zone_name "
                            value={availability_zone_name}
                            placeholder="Availability Zone"
                            required=""
                          /></span></OverlayTrigger>
                      <span className="span_hint_details">
                        Choose the Availability Zone where you want to create your file system
                      </span>
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
          <p>This module will create on EFS (Elastic File System) in the user specified availability zone.


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
