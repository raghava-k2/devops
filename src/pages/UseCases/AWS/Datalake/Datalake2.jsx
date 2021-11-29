import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake2() {
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [aws_account, setaws_account] = useState(null);
  const [region, setregion] = useState("");
  const [s3_bucket_raw, sets3_bucket_raw] = useState("");
  const [s3_bucket_processed, sets3_bucket_processed] = useState("");
  const [lambda_function_name, setlambda_function_name] = useState("");
  const [name, setname] = useState("");
  const [hash_key, sethash_key] = useState("");
  const [range_key, setrange_key] = useState("");
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake2",
    "parameter": {
      "region": region,
      "access_key": aws_access_key,
      "secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "s3_bucket_raw": s3_bucket_raw,
      "s3_bucket_processed": s3_bucket_processed,
      "lambda_function_name": lambda_function_name,
      "name": name,
      "hash_key": hash_key,
      "range_key": range_key,
    }
  };
  const configList1 = {
    "Region": region,
    "S3 Bucket for Raw": s3_bucket_raw,
    "S3 Bucket for Processed": s3_bucket_processed,
    "Lambda Function Name": lambda_function_name,
    "Dynamo DB Table Name": name,
    "Hash Key": hash_key,
    "Range Key": range_key,
  };

  const clearInputField = () => {
    setregion("");
    sets3_bucket_raw("");
    sets3_bucket_processed("");
    setlambda_function_name("");
    setname("");
    sethash_key("");
    setrange_key("");
  };

  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_access_key,
        aws_secret_key,
        aws_account,
        region,
        s3_bucket_raw,
        s3_bucket_processed,
        lambda_function_name,
        name,
        hash_key,
        range_key,
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
            <div> <h4 class="box1">Datalake - S3, Dynamo DB, Lambda - Standalone Setup</h4> </div>

            <Header1 />
          </div>

          <hr
            style={{

              backgroundColor: "black",
              opacity: .1

            }}

          />
          <section className="col-10 mx-auto">
            <div><Form className="main-form ">
              <Card style={{
                padding: '10px',
                margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)'
              }}>
                <h6>AWS Region</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >AWS Region</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setregion(e.target.value)}
                            name="region"
                            id="region"
                            value={region}
                            placeholder="Region"
                            required=""
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

                <h6>S3 Bucket Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >S3 Bucket for Raw</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket_raw(e.target.value)}
                            name="s3_bucket_raw"
                            id="s3_bucket_raw"
                            value={s3_bucket_raw}
                            placeholder="S3 Bucket for Raw"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >S3 Bucket for Processed</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket_processed(e.target.value)}
                            name="s3_bucket_processed"
                            id="s3_bucket_processed"
                            value={s3_bucket_processed}
                            placeholder="S3 Bucket for Processed"
                            required=""
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
                <h6>Lambda Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Lambda Function Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name(e.target.value)}
                            name="lambda_function_name"
                            id="lambda_function_name"
                            value={lambda_function_name}
                            placeholder="Lambda Function Name"
                            required=""
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
                <h6>Dynamo DB Details</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Dynamo DB Table Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setname(e.target.value)}
                            name="name"
                            id="name"
                            value={name}
                            placeholder="Dynamo DB Table Name"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Hash Key</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sethash_key(e.target.value)}
                            name="hash_key"
                            id="hash_key"
                            value={hash_key}
                            placeholder="Hash Key"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Range Key</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setrange_key(e.target.value)}
                            name="range_key"
                            id="range_key"
                            value={range_key}
                            placeholder="Range Key"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Lambda Function Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name(e.target.value)}
                            name="lambda_function_name"
                            id="lambda_function_name"
                            value={lambda_function_name}
                            placeholder="Lambda Function Name"
                            required=""
                          /></span></OverlayTrigger>
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
            </Form></div>




          </section>
        </div>
        <div className="description col-10 mt-8">

          <p> This Blueprint automates the provision of Infrastructure for the data processing using S3, Dynamo DB and Lambda. Details of provision are given below:
            <br />&#10148; Creation of two S3 buckets:
            <br />&nbsp;&nbsp;&#9679; Rawdata-landing-(random number) with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&nbsp;&nbsp;&#9679; Processeddata-(random number)  with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&#10148;  Dynamo DB table with two columns (filename, fileprocessed).
            <br />&#10148;	Lambda – One lambda with name datatransform with an empty code.
            <br />&#10148;Lambda will get triggered based on S3 Put event.
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
