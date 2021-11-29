import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import profile from "../../../../profile.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Cognito1() {
  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null);

  // S3 Buckets details
  const [bucket_name, setbucket_name] = useState("");

  // cognito user pool Details
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [formState, setformState] = useState(0);
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  const configList = {
    providerName: "AWS",
    usecaseType: "Cognito",
    usecaseName: "cognito1",
    parameter: {
      aws_region: aws_region,
      aws_access_key: aws_access_key,
      aws_secret_key: aws_secret_key,
      bucket_name: bucket_name,
      username: username,
      password: password,
    },
  };

  const configList1 = {
    "AWS Region": aws_region,
    "Bucket Name": bucket_name,
    Username: username,
    Password: "********",
  };

  const clearInputField = () => {
    setaws_region("");
    setbucket_name("");
    setusername("");
    setpassword("");
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
        bucket_name,
        username,
        password,
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
              <h4 class="box1">Cognito - Static Microsite</h4>{" "}
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
                  <h6>AWS Details</h6>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">AWS Region</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setaws_region(e.target.value)}
                              name="aws_region"
                              id="aws_region"
                              value={aws_region}
                              placeholder="AWS Region"
                              required=""
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

                  <h6>S3 Buckets details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Bucket Name</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setbucket_name(e.target.value)}
                              name="bucket_name "
                              id="bucket_name "
                              value={bucket_name}
                              placeholder="Bucket Name"
                              required=""
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

                  <h6>Cognito User Pool Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Username</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setusername(e.target.value)}
                              name="username "
                              id="username "
                              value={username}
                              placeholder="Username"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Password</Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="password"
                              onChange={(e) => setpassword(e.target.value)}
                              name="password"
                              id="password"
                              value={password}
                              placeholder="Password"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
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
              </Form>
            </div>
          </section>
        </div>

        <div className="description col-10 mt-8">
          <p>
            
            This usecase will create one S3 Bucket holding static HTML file and
            integrating with CloudFront distribution in front of S3 bucket. This
            will also provision a Cognito user pool for Amazon Cognito to
            provide authentication to HTML static page.
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
