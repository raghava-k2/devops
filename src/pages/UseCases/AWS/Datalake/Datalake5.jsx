import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake5() {
  const [region, setregion] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_account, setaws_account] = useState(null);
  const [s3_bucket_raw, sets3_bucket_raw] = useState("");
  const [s3_bucket_processed, sets3_bucket_processed] = useState("");
  const [lake_db_name, setlake_db_name] = useState("");
  const [glue_crawler_name, setglue_crawler_name] = useState("");
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake5",
    "parameter": {
      "region": region,
      "access_key": aws_access_key,
      "secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "s3_bucket_raw": s3_bucket_raw,
      "s3_bucket_processed": s3_bucket_processed,
      "lake_db_name": lake_db_name,
      "glue_crawler_name": glue_crawler_name,
    }
  };
  const configList1 = {
    "Region": region,
    "S3 Bucket for Raw": s3_bucket_raw,
    "S3 Bucket for Processed": s3_bucket_processed,
    "Lake Db Name": lake_db_name,
    "Glue Crawler Name": glue_crawler_name,
  };

  const clearInputField = () => {
    setregion("");
    sets3_bucket_raw("");
    sets3_bucket_processed("");
    setlake_db_name("");
    setglue_crawler_name("");
  };

  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        region,
        aws_access_key,
        aws_secret_key,
        aws_account,
        s3_bucket_raw,
        s3_bucket_processed,
        lake_db_name,
        glue_crawler_name,
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
            <div> <h4 class="box1">Datalake - S3 Buckets, Glue, Athena</h4> </div>
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
          </div>*/}

            <div><Form className="main-form ">

              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)" }}>


                <h6>AWS Region:</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Region</Tooltip>} placement="left">
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

                <h6>S3 Bucket Details:</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Raw</Tooltip>} placement="left">
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
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">S3 Bucket for Processed</Tooltip>} placement="right">
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
                <h6>Datalake Details:</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Lake DB Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setlake_db_name(e.target.value)}
                            name="lake_db_name"
                            id="lake_db_name"
                            value={lake_db_name}
                            placeholder="Lake Db Name"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Glue Crawler Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setglue_crawler_name(e.target.value)}
                            name="glue_crawler_name"
                            id="glue_crawler_name"
                            value={glue_crawler_name}
                            placeholder="Glue Crawler Name"
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
          <p>This Blueprint automates the provision of Infrastructure for the data processing using S3, Glue and Athena. Details of provision are given below:
            <br />&#10148; Creation of Create two S3 buckets:
            <br />&nbsp;&nbsp;&#9679; Raw data landing (random number) with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&nbsp;&nbsp;&#9679; Processed data (random number)  with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&#10148; Glue – a Job which will run for every half an hour on Raw Data.
            <br />&#10148; Athena will be pointing to “Processeddata” S3 bucket.

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
