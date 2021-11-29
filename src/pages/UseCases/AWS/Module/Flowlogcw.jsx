import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Chips } from "primereact/chips";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { RadioButton } from "primereact/radiobutton";
import axios from "axios";
import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
const { ip } = settings;

export default function Flowlogcw() {
  // Account details

  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null);

  const [vpcid, setvpcid] = useState("");
  const [interval, setinterval] = useState("");
  const [loggroup, setloggroup] = useState("");
  const [iamrole, setiamrole] = useState("");


  const [formState, setformState] = useState(0);

  const [output, setoutput] = useState("");
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
    providerName: "AWS",
    usecaseType: "Module",
    usecaseName: "Flowlogcw",

    parameter: {
      aws_region: aws_region,
      aws_access_key: aws_access_key,
      aws_secret_key: aws_secret_key,

      vpcid: vpcid,
      interval: interval,
      loggroup: loggroup,
      iamrole: iamrole,


    },
  };

  const configList1 = {
    "AWS Region": aws_region,
    "VPC ID": vpcid,
    "Interval": interval,
    "Log Group Name arn": loggroup,
    "I AM Role arn": iamrole,

  };

  const clearInputField = () => {
    setaws_region("");
    setvpcid("");
    setInterval("");
    setloggroup("");
    setiamrole("");

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
        vpcid,
        interval,
        loggroup,
        iamrole,

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
            <div>
              {" "}
              <h4 class="box1">VPC Flow log with (existing) CloudWatch logs</h4>{" "}
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
                  <h6>AWS Details</h6>

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

                  <h6>VPC Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="vpcid">VPC ID</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setvpcid(e.target.value)}
                              name="vpcid "
                              id="vpcid "
                              value={vpcid}
                              placeholder="VPC ID"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span style={{ fontSize: "10px", color: "grey" }}>
                        The ID of the VPC for which the flow log will be created. IP traffic flows will be captured for all of the network interfaces in the specified VPC.
                      </span>
                    </div>
                  </Form.Group>

                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Interval</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="interval">
                              Maximum Aggregation Interval
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <RadioButton
                              value="600"
                              inputId="10 minutes"
                              name="10 minutes"
                              onChange={(e) => setinterval(e.target.value)}
                              checked={interval === "600"}
                            />
                            <label
                              style={{ fontSize: "14px" }}
                              htmlFor="10 minutes"
                            >
                              10 minutes
                            </label>
                            <RadioButton
                              value="60"
                              inputId="1 minute"
                              name="1 minute"
                              onChange={(e) => setinterval(e.target.value)}
                              checked={interval === "60"}
                            />
                            <label
                              style={{ fontSize: "14px" }}
                              htmlFor="1 minute"
                            >
                              1 minute
                            </label>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span style={{ fontSize: "10px", color: "grey" }}>
                        The maximum interval of time during which a flow of
                        packets is captured and aggregated into a flow log
                        record
                      </span>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Destination</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="loggroup">Log Group arn</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setloggroup(e.target.value)}
                              name="loggroup "
                              id="loggroup "
                              value={loggroup}
                              placeholder="Log Group arn"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="iamrole">IAM Role arn</Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setiamrole(e.target.value)}
                              name="iamrole "
                              id="iamrole "
                              value={iamrole}
                              placeholder="IAM Role arn"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span style={{ fontSize: "10px", color: "grey" }}>
                        The destination to publish the flow log data.
                      </span>
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
              </Form>
            </div>
          </section>
        </div>
        <div className="description col-10 mt-8">
          <p> This module will create VPC Flow log of the specified VPC.
            It will also publish the log data in existing CloudWatch Log Groups.


          </p>
        </div>
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
      return (
        <>
          <Output output={output} />
        </>
      );
    }
  }
}
