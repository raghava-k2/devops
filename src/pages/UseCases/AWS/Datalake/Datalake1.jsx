import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake1() {

  // Account details
  const [region, setregion] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

  // S3 Buckets details
  const [aws_account, setaws_account] = useState(null);
  const [s3_bucket_raw, sets3_bucket_raw] = useState("");
  const [s3_bucket_processed, sets3_bucket_processed] = useState("");

  // Dynamodb details
  const [name, setname] = useState("");
  const [hash_key, sethash_key] = useState("");
  const [range_key, setrange_key] = useState("");

  // EMR details
  const [cluster_name, setcluster_name] = useState("");
  const [key_name, setkey_name] = useState("");
  const [vpc_id, setvpc_id] = useState("");
  const [subnet_id, setsubnet_id] = useState("");



  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake1",
    "parameter": {
      "region": region,
      "access_key": aws_access_key,
      "secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "s3_bucket_raw": s3_bucket_raw,
      "s3_bucket_processed": s3_bucket_processed,
      "name": name,
      "hash_key": hash_key,
      "range_key": range_key,
      "cluster_name": cluster_name,
      "key_name": key_name,
      "vpc_id": vpc_id,
      "subnet_id": subnet_id,
    }
  };
  const configList1 = {
    "Region": region,
    "S3 Bucket for Raw": s3_bucket_raw,
    "S3 Bucket for Processed": s3_bucket_processed,
    "Name": name,
    "Hash Key": hash_key,
    "Range Key": range_key,
    "Cluster Name": cluster_name,
    "Key Name": key_name,
    "VPC ID": vpc_id,
    "Subnet ID": subnet_id,
  };

  const clearInputField = () => {
    setregion("");
    sets3_bucket_raw("");
    sets3_bucket_processed("");
    setname("");
    sethash_key("");
    setrange_key("");
    setcluster_name("");
    setkey_name("");
    setvpc_id("");
    setsubnet_id("");
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
        name,
        hash_key,
        range_key,
        cluster_name,
        key_name,
        vpc_id,
        subnet_id
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
            <div> <h4 class="box1">Datalake - S3, Dynamo DB, EMR - Standalone Setup</h4> </div>
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




                <h6>Dynamo DB Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Dynamo DB Table Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
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
                  </div>
                </Form.Group>
                <hr
                  style={{

                    backgroundColor: "black",
                    opacity: .1

                  }}

                />


                <h6>Cluster Details</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Cluster Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setcluster_name(e.target.value)}
                            name="cluster_name"
                            id="cluster_name"
                            value={cluster_name}
                            placeholder="Cluster Name"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Key Pair</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setkey_name(e.target.value)}
                            name="key_name"
                            id="key_name"
                            value={key_name}
                            placeholder="Key Pair"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >VPC ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc_id(e.target.value)}
                            name="vpc_id"
                            id="vpc_id"
                            value={vpc_id}
                            placeholder="VPC ID"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Subnet ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setsubnet_id(e.target.value)}
                            name="subnet_id"
                            id="subnet_id"
                            value={subnet_id}
                            placeholder="Subnet ID"
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
          <p> This Blueprint automates the provision of Infrastructure for the data processing using S3, Dynamo DB and EMR. Details of provision are given below:
            <br />&#10148; Creation of two S3 buckets:
            <br />&nbsp;&nbsp;&#9679; Rawdata-landing-(random number) with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&nbsp;&nbsp;&#9679; Processeddata-(random number)  with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
            <br />&#10148;  EMR – One Name Node and one Worker Node which runs for every 30 minutes.
            <br />&#10148;	Dynamo DB table with two columns (filename, fileprocessed).
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
