import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake6() {
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_account, setaws_account] = useState(null);
  const [s3_bucket_raw, sets3_bucket_raw] = useState("");
  const [s3_bucket_landing, sets3_bucket_landing] = useState("");
  const [s3_bucket_curated, sets3_bucket_curated] = useState("");
  const [s3_bucket_aggregated, sets3_bucket_aggregated] = useState("");

  // Lambda Function details
  const [lambda_function_name1, setlambda_function_name1] = useState("");
  const [lambda_function_name2, setlambda_function_name2] = useState("");
  const [lambda_function_name3, setlambda_function_name3] = useState("");
  const [lambda_function_name4, setlambda_function_name4] = useState("");


  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake6",
    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "s3_bucket_raw": s3_bucket_raw,
      "s3_bucket_landing": s3_bucket_landing,
      "s3_bucket_curated": s3_bucket_curated,
      "s3_bucket_aggregated": s3_bucket_aggregated,
      "lambda_function_name1": lambda_function_name1,
      "lambda_function_name2": lambda_function_name2,
      "lambda_function_name3": lambda_function_name3,
      "lambda_function_name4": lambda_function_name4,
    }
  };
  const configList1 = {
    "AWS Region": aws_region,
    "S3 Bucket for Raw": s3_bucket_raw,
    "S3 Bucket for Landing": s3_bucket_landing,
    "S3 Bucket for Curated": s3_bucket_curated,
    "S3 Bucket for Aggregated": s3_bucket_aggregated,
    "Lambda Function Name-1": lambda_function_name1,
    "Lambda Function Name-2": lambda_function_name2,
    "Lambda Function Name-3": lambda_function_name3,
    "Lambda Function Name-4": lambda_function_name4,
  };

  const clearInputField = () => {
    setaws_region("");
    sets3_bucket_raw("");
    sets3_bucket_landing("");
    sets3_bucket_curated("");
    sets3_bucket_aggregated("");
    setlambda_function_name1("");
    setlambda_function_name2("");
    setlambda_function_name3("");
    setlambda_function_name4("");
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
        s3_bucket_landing,
        s3_bucket_curated,
        s3_bucket_aggregated,
        lambda_function_name1,
        lambda_function_name2,
        lambda_function_name3,
        lambda_function_name4
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
            <div> <h4 class="box1">Datalake - S3 Buckets & Lambda Function</h4> </div>
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
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">AWS Region</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setaws_region(e.target.value)}
                            name="aws_region"
                            id="aws_region"
                            value={aws_region}
                            placeholder="AWS Region"
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
                <h6>S3 Bucket Details:</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Landing</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket_landing(e.target.value)}
                            name="s3_bucket_landing"
                            id="s3_bucket_landing"
                            value={s3_bucket_landing}
                            placeholder="S3 Bucket for Landing"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Raw</Tooltip>} placement="right">
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
                  </div>

                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Curated</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket_curated(e.target.value)}
                            name="s3_bucket_curated"
                            id="s3_bucket_curated"
                            value={s3_bucket_curated}
                            placeholder="S3 Bucket for Curated"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Aggregated</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => sets3_bucket_aggregated(e.target.value)}
                            name="s3_bucket_aggregated"
                            id="s3_bucket_aggregated"
                            value={s3_bucket_aggregated}
                            placeholder="S3 Bucket for Aggregated"
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

                <h6>Lambda Function Details:</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Lambda Function Name-1</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name1(e.target.value)}
                            name="lambda_function_name1"
                            id="lambda_function_name1"
                            value={lambda_function_name1}
                            placeholder="Lambda Function Name-1"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Lambda Function Name-2</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name2(e.target.value)}
                            name="lambda_function_name2"
                            id="lambda_function_name2"
                            value={lambda_function_name2}
                            placeholder="Lambda Function Name-2"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Lambda Function Name-3</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name3(e.target.value)}
                            name="lambda_function_name3"
                            id="lambda_function_name3"
                            value={lambda_function_name3}
                            placeholder="Lambda Function Name-3"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Lambda Function Name-4</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlambda_function_name4(e.target.value)}
                            name="lambda_function_name4"
                            id="lambda_function_name4"
                            value={lambda_function_name4}
                            placeholder="Lambda Function Name-4"
                            required=""
                          /></span></OverlayTrigger>
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
            </Form></div>




          </section>
        </div>
        <div className="description col-10 mt-8">
          <p> &#10148;This usecase will create four S3 Buckets (Landing, Raw, Curated, Aggregated) and four Lambda functions.
            <br />&#10148; Whenever there is a change in the S3 bucket, the corresponding lambda will  get triggered and execute the code logic. Currently the lambda code is left empty and the code logic to be included by the teams later depending on the business need.
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
      function rec() {
        axios
          .get(Api.ip + "datalake6")
          .then((response) => setoutput(response.data));
        setTimeout(rec, 3000);
      }
      rec();


      return (
        <>
          <Output output={output} />
        </>
      );
    }
  }
}
