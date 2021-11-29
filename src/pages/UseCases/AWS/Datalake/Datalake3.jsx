import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Header1 from "../../../../Header1";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Datalake3() {

  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [aws_account, setaws_account] = useState(null);
  const [region, setregion] = useState("");
  const [env_name, setenv_name] = useState("");
  const [vpc_id, setvpc_id] = useState("");
  const [cidr_range, setcidr_range] = useState("");
  const [private_subnet_id, setprivate_subnet_id] = useState("");
  const [db_subnet_id, setdb_subnet_id] = useState("");
  const [db_security_group_ids, setdb_security_group_ids] = useState("");
  const [app_security_group_ids, setapp_security_group_ids] = useState("");
  const [app_ami, setapp_ami] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [ebs_volume_size, setebs_volume_size] = useState("");
  const [root_volume_size, setroot_volume_size] = useState("");
  const [key_name, setkey_name] = useState("");

  //RDS details

  const [rds_instance_class, setrds_instance_class] = useState("");
  const [major_engine_version, setmajor_engine_version] = useState("");
  const [mysql_family, setmysql_family] = useState("");
  const [engine_version, setengine_version] = useState("");

  const [pageid, setpageid] = useState(0);
  const [output, setoutput] = useState("");
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Datalake",
    "usecaseName": "datalake3",
    "parameter": {
      "access_key": aws_access_key,
      "secret_key": aws_secret_key,
      "aws_account ": aws_account,
      "region": region,
      "env_name": env_name,
      "vpc_id": vpc_id,
      "cidr_range": cidr_range,
      "private_subnet_id": private_subnet_id,
      "db_subnet_id": db_subnet_id,
      "db_security_group_ids": db_security_group_ids,
      "app_security_group_ids": app_security_group_ids,
      "app_ami": app_ami,
      "appserver_instance_type": appserver_instance_type,
      "ebs_volume_size": ebs_volume_size,
      "root_volume_size": root_volume_size,
      "key_name": key_name,
      "rds_instance_class": rds_instance_class,
      "major_engine_version": major_engine_version,
      "mysql_family": mysql_family,
      "engine_version": engine_version,
    }
  };

  const configList1 = {

    // account details

    "Region": region,
    "Environment Name": env_name,

    // application details
    "VPC ID": vpc_id,
    "CIDR Range": cidr_range,
    "EC2 Subnet ID": private_subnet_id,

    "EC2 Security Group IDs": app_security_group_ids,
    "EC2 AMI": app_ami,
    "EC2 Instance Type": appserver_instance_type,
    "EBS Volume Size": ebs_volume_size,
    "Root Volume Size": root_volume_size,


    "Key Name": key_name,

    // RDS details
    "DB Subnet ID": db_subnet_id,
    "DB Security Group IDs": db_security_group_ids,
    "RDS Instance Class": rds_instance_class,
    "Major Engine Version": major_engine_version,
    "MySQL Family": mysql_family,
    "Engine Version": engine_version,
  };

  const clearInputField = () => {
    //account details

    // setaccess_key("")
    // setsecret_key("")
    setregion("");
    setenv_name("");

    // application details
    setvpc_id("");
    setcidr_range("");
    setprivate_subnet_id("");
    setdb_subnet_id("");
    setdb_security_group_ids("");
    setapp_security_group_ids("");
    setapp_ami("");
    setappserver_instance_type("");
    setebs_volume_size("");
    setroot_volume_size("");
    setkey_name("");

    // RDS details

    setrds_instance_class("");
    setmajor_engine_version("");
    setmysql_family("");
    setengine_version("");
  };

  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        //account details
        aws_access_key,
        aws_secret_key,
        aws_account,
        region,
        env_name,

        // application details

        vpc_id,
        cidr_range,
        private_subnet_id,
        db_subnet_id,
        db_security_group_ids,
        app_security_group_ids,
        app_ami,
        appserver_instance_type,
        ebs_volume_size,
        root_volume_size,
        key_name,

        //rds details

        rds_instance_class,
        major_engine_version,
        mysql_family,
        engine_version,
      ];

      const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== "";
      });

      if (allFieldsFilled) {
        setpageid(1);
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
    setpageid(2);
  };

  const onBack = (e) => {
    setpageid(0);
  };

  const setCredentials = (input) => {
    setaws_access_key(input.accessKey);
    setaws_secret_key(input.secretKey);
    setaws_account(input.accountCode);
  }
  var sno = 0;

  if (pageid === 0) {
    return (
      <>
        <div>



          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">Data Processing using - EFS, EC2, RDS(MySQL) - Standalone Setup</h4> </div>
            <Header1 />
          </div>


          <hr
            style={{
              backgroundColor: "black",
              opacity: 0.1,
            }}
          />

          <section>
            <Form className="main-form">
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
                        overlay={<Tooltip id="aws_region">AWS Region</Tooltip>}
                        placement="left"
                      >
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
                        </span>
                      </OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Environment Name</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setenv_name(e.target.value)}
                            name="env_name"
                            id="env_name"
                            value={env_name}
                            placeholder="Environment Name"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>
                <hr
                  style={{
                    backgroundColor: "black",
                    opacity: 0.1,
                  }}
                />

                <h6>EC2 Details</h6>
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
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >CIDR Range</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setcidr_range(e.target.value)}
                            name="cidr_range"
                            id="cidr_range"
                            value={cidr_range}
                            placeholder="CIDR Range"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >EC2 Subnet ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setprivate_subnet_id(e.target.value)}
                            name="private_subnet_id"
                            id="private_subnet_id"
                            value={private_subnet_id}
                            placeholder="EC2 Subnet ID"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >EC2 Security Group IDs</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setapp_security_group_ids(e.target.value)
                            }
                            name="app_security_group_ids"
                            id="app_security_group_ids"
                            value={app_security_group_ids}
                            placeholder="EC2 Security Group IDs"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >EC2 AMI</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setapp_ami(e.target.value)}
                            name="app_ami"
                            id="app_ami"
                            value={app_ami}
                            placeholder="EC2 AMI"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >EC2 Instance Type</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setappserver_instance_type(e.target.value)
                            }
                            name="appserver_instance_type"
                            id="appserver_instance_type"
                            value={appserver_instance_type}
                            placeholder="EC2 Instance Type"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >EBS Volume Size</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setebs_volume_size(e.target.value)}
                            name="ebs_volume_size"
                            id="ebs_volume_size"
                            value={ebs_volume_size}
                            placeholder="EBS Volume Size"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Root Volume Size</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setroot_volume_size(e.target.value)}
                            name="root_volume_size"
                            id="root_volume_size"
                            value={root_volume_size}
                            placeholder="Root Volume Size"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Key Pair</Tooltip>} placement="left">
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
                <hr
                  style={{
                    backgroundColor: "black",
                    opacity: 0.1,
                  }}
                />
                <h6>RDS Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Subnet ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdb_subnet_id(e.target.value)}
                            name="db_subnet_id"
                            id="db_subnet_id"
                            value={db_subnet_id}
                            placeholder="DB Subnet ID"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Security Group IDs</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setdb_security_group_ids(e.target.value)
                            }
                            name="db_security_group_ids"
                            id="db_security_group_ids"
                            value={db_security_group_ids}
                            placeholder="DB Security Group IDs"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >RDS Instance Class</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setrds_instance_class(e.target.value)}
                            name="rds_instance_class"
                            id="rds_instance_class"
                            value={rds_instance_class}
                            placeholder="RDS Instance Class"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Major Engine Version</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setmajor_engine_version(e.target.value)
                            }
                            name="major_engine_version"
                            id="major_engine_version"
                            value={major_engine_version}
                            placeholder="Major Engine Version"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >MySQL Family</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setmysql_family(e.target.value)}
                            name="mysql_family"
                            id="mysql_family"
                            value={mysql_family}
                            placeholder="MySQL Family"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Engine Version</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setengine_version(e.target.value)}
                            name="engine_version"
                            id="engine_version"
                            value={engine_version}
                            placeholder="Engine Version"
                            required=""
                          /></span></OverlayTrigger>
                    </div>
                  </div>
                </Form.Group>

                {/* <div className="col-12 review-reset-btn">

                                <Button onClick={reviewList} className="primary">Review</Button>
                                &nbsp;&nbsp;
                                <Button onClick={clearInputField} type="reset">Reset</Button>

                            </div> */}
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
          <p>
            {" "}
            This Blueprint automates the provision of Infrastructure for the
            data processing using EFS, EC2 and RDS. Details of provision are
            given below:
            <br />
            &#10148; Creation of one EFS volume.
            <br />
            &#10148; Creation of one EC2 instance.
            <br />
            &#10148; Creation of one RDS(MySQL) database.
          </p>
        </div>
        <ConnectionInfo setCredentials={setCredentials}
          setConnectionPopup={setShowCloudConnectionPopup}
          showCloudConnectionPopup={showCloudConnectionPopup}>
        </ConnectionInfo>
      </>
    );
  } else {
    if (pageid === 1)
      return (
        <>
          <div className="reviewbox home">
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
