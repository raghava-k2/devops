import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake4() {
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_account, setaws_account] = useState(null);
  const [aws_region, setaws_region] = useState("");
  const [function_name, setfunction_name] = useState("");
  const [dynamodb_name, setdynamodb_name] = useState("");
  const [hash_key, sethash_key] = useState("");
  const [lake_db_name, setlake_db_name] = useState("");
  const [glue_crawler_name, setglue_crawler_name] = useState("");
  const [kinesis_firehose_name, setkinesis_firehose_name] = useState("");
  const [s3_bucket, sets3_bucket] = useState("");
  const [user_name, setuser_name] = useState("rajasekaran_s06@infosys.com");
  const [output, setoutput] = useState("");
  const [outputScreen, setoutputScreen] = useState(false)
  const [formState, setformState] = useState(0)

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake4",
    "parameter": {
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "aws_region": aws_region,
      "function_name": function_name,
      "dynamodb_name": dynamodb_name,
      "hash_key": hash_key,
      "lake_db_name": lake_db_name,
      "glue_crawler_name": glue_crawler_name,
      "kinesis_firehose_name": kinesis_firehose_name,
      "s3_bucket": s3_bucket,
      "aws_account": aws_account,
      "user_name": user_name,
    }
  };
  const configList1 = {
    "AWS Region": aws_region,
    "Dynamo DB Name": dynamodb_name,
    "Hash Key": hash_key,
    "Kinesis Firehose Name": kinesis_firehose_name,
    "S3 Bucket Name": s3_bucket,
    "Lambda Function Name": function_name,
    "Lake DB Name": lake_db_name,
    "Glue Crawler Name": glue_crawler_name,
  };

  const clearInputField = () => {
    setaws_region("");
    setfunction_name("");
    setdynamodb_name("");
    sethash_key("");
    setlake_db_name("");
    setglue_crawler_name("");
    setkinesis_firehose_name("");
    sets3_bucket("");
  };

  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_access_key,
        aws_secret_key,
        aws_region,
        function_name,
        dynamodb_name,
        hash_key,
        lake_db_name,
        glue_crawler_name,
        kinesis_firehose_name,
        s3_bucket,
        aws_account,
        user_name,
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
    setformState(e)
  }


  const showOutput = (e) => {
    setoutputScreen(true)

  }

  const setCredentials = (input) => {
    setaws_access_key(input.accessKey);
    setaws_secret_key(input.secretKey);
    setaws_account(input.accountCode);
  }

  if (formState === 0) {
    return (
      <>
        <div>
          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">Datalake - DynamoDB Table Audit</h4> </div>
            <Header1 />
          </div>
          <hr
            style={{
              backgroundColor: "black",
              opacity: .1
            }}
          />
          <section className="col-10 mx-auto">
            <Form className="main-form ">

              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)" }}>

                <h6>AWS Region</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >AWS Region</Tooltip>} placement="left">

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
                    opacity: .1
                  }}
                />
                <h6>Dynamo DB Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Dynamo DB Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdynamodb_name(e.target.value)}
                            name="dynamodb_name"
                            id="dynamodb_name"
                            value={dynamodb_name}
                            placeholder="Dynamo DB Name"
                            required=""
                          />
                        </span>
                      </OverlayTrigger>

                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="hash_key">Hash Key</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sethash_key(e.target.value)}
                            name="hash_key"
                            id="hash_key"
                            value={hash_key}
                            placeholder="Hash Key"
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
                      <OverlayTrigger overlay={<Tooltip id="kinesis_firehose_name">Kinesis Firehose Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setkinesis_firehose_name(e.target.value)}
                            name="kinesis_firehose_name"
                            id="kinesis_firehose_name"
                            value={kinesis_firehose_name}
                            placeholder="Kinesis Firehose Name"
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
                    opacity: .1

                  }}

                />
                <h6>S3 Bucket, Lambda Details</h6>
                <Form.Group>
                  <div className="row mt-2">


                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="s3_bucket">S3 Bucket Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket(e.target.value)}
                            name="s3_bucket"
                            id="s3_bucket"
                            value={s3_bucket}
                            placeholder="S3 Bucket Name"
                            required=""
                          />
                        </span>
                      </OverlayTrigger>

                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="function_name">Lambda Function Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setfunction_name(e.target.value)}
                            name="function_name"
                            id="function_name"
                            value={function_name}
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
                    opacity: .1

                  }}

                />
                <h6>Datalake Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="lake_db_name">Lake DB Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlake_db_name(e.target.value)}
                            name="lake_db_name"
                            id="lake_db_name"
                            value={lake_db_name}
                            placeholder="Lake DB Name"
                            required=""
                          />
                        </span>
                      </OverlayTrigger>

                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="glue_crawler_name">Glue Crawler Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setglue_crawler_name(e.target.value)}
                            name="glue_crawler_name"
                            id="glue_crawler_name"
                            value={glue_crawler_name}
                            placeholder="Glue Crawler Name"
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
                    className="primary"
                  >
                    Review
                  </Button>
                  <Button
                    style={{ marginRight: "16px" }}
                    onClick={clearInputField}
                    type="reset"
                  >
                    Reset
                  </Button>
                </div>
              </Card>
            </Form>




          </section>
        </div>
        <div className="description col-10 mt-8">
          <p>This blueprint will help customers to track events of an item in DynamoDB table over time. Details of provision are given below:
            <br />&#10148; DynamoDB table with orderId, orderstate and lastUpdatedTime.
            <br />&#10148; Lambda to process the data and push the results to Kinesis Firehose.
            <br />&#10148; The data with catologue type format will be pushed to S3 bucket.
            <br />&#10148; The data can be queried using Athena SQL query while the Glue crawler will crawl for the data periodically
          </p>
        </div>
        <ConnectionInfo setCredentials={setCredentials}
          setConnectionPopup={setShowCloudConnectionPopup}
          showCloudConnectionPopup={showCloudConnectionPopup}>
        </ConnectionInfo>
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
