import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import profile from "../../../../profile.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake8() {
  // Account details
   const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_account, setaws_account] = useState(null);

  // S3 Buckets details
  const [s3_bucket_raw, sets3_bucket_raw] = useState("");
  const [s3_bucket_processed, sets3_bucket_processed] = useState("");

  // Lambda Function details
  const [lambda_function_name, setlambda_function_name] = useState("");

  // VPC Details
  const [vpc_id, setvpc_id] = useState("");
  const [subnet_id, setsubnet_id] = useState("");

  // EC2 Instance Details
  const [instance_ami_id, setinstance_ami_id] = useState("");
  const [instance_type, setinstance_type] = useState("");
  const [key_name, setkey_name] = useState("");

  // SNS Details
  const [
    sns_subscription_email_address_list,
    setsns_subscription_email_address_list,
  ] = useState("");

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake8",
    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "s3_bucket_raw": s3_bucket_raw,
      "s3_bucket_processed": s3_bucket_processed,
      "lambda_function_name": lambda_function_name,
      "sns_subscription_email_address_list": [sns_subscription_email_address_list],
      "instance_ami_id": instance_ami_id,
      "instance_type": instance_type,
      "key_name": key_name,
      "vpc_id": vpc_id,
      "subnet_id": subnet_id,

    }
  };

  const configList1 = {
    "AWS Region": aws_region,
    "S3 Bucket for Raw": s3_bucket_raw,
    "S3 Bucket for Processed": s3_bucket_processed,
    "Lambda Function Name": lambda_function_name,
    "SNS Subscription Email Address List": sns_subscription_email_address_list,
    "Instance AMI ID": instance_ami_id,
    "Instance Type": instance_type,
    "Key Name": key_name,
    "VPC ID": vpc_id,
    "Subnet ID": subnet_id,

  };

  const clearInputField = () => {
    setaws_region("");
    sets3_bucket_raw("");
    sets3_bucket_processed("");
    setinstance_type("");
    setkey_name("");
    setlambda_function_name("");
    setinstance_ami_id("");
    setvpc_id("");
    setsubnet_id("");
    setsns_subscription_email_address_list("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,
        aws_account,
        s3_bucket_raw,
        s3_bucket_processed,
        instance_type,
        key_name,
        lambda_function_name,
        instance_ami_id,
        vpc_id,
        subnet_id,
        sns_subscription_email_address_list,
      ];

      const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== "" && value !== "0";
      });

      if (allFieldsFilled) {
        setflag(false);
      } else {
        alert("fill all the fields");
      }
    } else {
      setShowCloudConnectionPopup(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      header: { "Content-Type": "application/json" },
      url: Api.ip + "runUseCase",
      data: configList,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    clearInputField();
    setflag1(false);
  };

  const onBack = (e) => {
    setflag(true);
  };

  const setCredentials = (input) => {
    setaws_access_key(input.accessKey);
    setaws_secret_key(input.secretKey);
    setaws_account(input.accountCode);
  }

  var sno = 0;

  if (flag === true) {
    return (
      <>
        <div>


          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">Datalake - S3 Buckets, SNS, SQS, EC2 Lambda - Standalone Setup</h4> </div>
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

                  <h6>S3 Buckets Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">
                              S3 Bucket for Raw
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => sets3_bucket_raw(e.target.value)}
                              name="s3_bucket_raw"
                              id="s3_bucket_raw"
                              value={s3_bucket_raw}
                              placeholder="S3 Bucket for Raw"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">
                              S3 Bucket for Processed
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                sets3_bucket_processed(e.target.value)
                              }
                              name="s3_bucket_processed"
                              id="s3_bucket_processed"
                              value={s3_bucket_processed}
                              placeholder="S3 Bucket for Processed"
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

                  <h6>Lambda Function Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">
                              lambda Function Name
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              name="lambda_function_name"
                              id="lambda_function_name"
                              value={lambda_function_name}
                              onChange={(e) =>
                                setlambda_function_name(e.target.value)
                              }
                              placeholder="Lambda Function Name"
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
                  <h6>SNS Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">
                              SNS Subscription Email Address List
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setsns_subscription_email_address_list(
                                  e.target.value
                                )
                              }
                              name="sns_subscription_email_address_list"
                              id="sns_subscription_email_address_list"
                              value={sns_subscription_email_address_list}
                              placeholder="SNS Subscription Email Address List"
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

                  <h6>EC2 Instance Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">
                              Instance AMI ID
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              name="instance_ami_id"
                              id="instance_ami_id"
                              value={instance_ami_id}
                              onChange={(e) =>
                                setinstance_ami_id(e.target.value)
                              }
                              placeholder="Instance AMI ID"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>

                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Instance Type</Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setinstance_type(e.target.value)}
                              name="instance_type"
                              id="instance_type"
                              value={instance_type}
                              placeholder="Instance Type"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Key Name</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setkey_name(e.target.value)}
                              name="key_name"
                              id="key_name"
                              value={key_name}
                              placeholder="Key Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="dynamodb_name">VPC ID</Tooltip>}
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setvpc_id(e.target.value)}
                              name="vpc_id"
                              id="vpc_id"
                              value={vpc_id}
                              placeholder="VPC ID"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="row mt-2">

                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="dynamodb_name">Subnet ID</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setsubnet_id(e.target.value)}
                              name="subnet_id"
                              id="subnet_id"
                              value={subnet_id}
                              placeholder="Subnet ID"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
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
          <p>
            &#10148; This usecase creates two S3 Buckets (Raw and Processed),
            Lambda, SQS, SNS and an EC2 instance.
            <br />
            &#10148; Whenever there is a change in the S3 bucket, the lambda
            will get triggered for processing the data and then a message will get
            send through SQS and Notifications through SNS. Currently the lambda
            code is left empty and the code logic to be included by the teams
            later depending on the business need. An EC2 instance is also
            provided to retrieve messages from SQS and then to do processing.
            <br />
          </p>
        </div>
        <ConnectionInfo setCredentials={setCredentials}
          setConnectionPopup={setShowCloudConnectionPopup}
          showCloudConnectionPopup={showCloudConnectionPopup}>
        </ConnectionInfo>
      </>
    );
  } else {
    if (flag1 === true)
      return (
        <>
          <Review_header />
          <div className="Review">
            {Object.entries(configList1).map(([key, value]) => {
              sno += 1;
              return (
                <div key={sno}>
                  {key} : {value}
                </div>
              );
            })}
          </div>
          <div className="Review-button">
            <Button
              type="submit"
              style={{ marginRight: "16px" }}
              onClick={onSubmit}
              className="primary"
            >
              Create
            </Button>
            <Button
              variant="primary"
              style={{ marginRight: "16px" }}
              onClick={onBack}
            >
              Back
            </Button>
          </div>
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
