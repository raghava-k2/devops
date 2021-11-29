import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import graph from "../../../../images/az.jpg";
import Header1 from "../../../../Header1";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { Review } from "../../../../components/Review/Review";


export default function Ap1() {
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [region, setregion] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [vpc_cidr, setvpc_cidr] = useState("");
  const [az_1, setaz_1] = useState("");
  const [az_2, setaz_2] = useState("");
  const [public_subnet_cidr_1a, setpublic_subnet_cidr_1a] = useState("");
  const [public_subnet_cidr_1b, setpublic_subnet_cidr_1b] = useState("");
  const [private_subnet_cidr_1a, setprivate_subnet_cidr_1a] = useState("");
  const [private_subnet_cidr_1b, setprivate_subnet_cidr_1b] = useState("");
  const [dbsubnet_cidr_1a, setdbsubnet_cidr_1a] = useState("");
  const [dbsubnet_cidr_1b, setdbsubnet_cidr_1b] = useState("");
  const [env_name, setenv_name] = useState("");
  const [key_name, setkey_name] = useState("");
  const [webserver_ami, setwebserver_ami] = useState("");
  const [appserver_ami, setappserver_ami] = useState("");
  const [webserver_instance_type, setwebserver_instance_type] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [aurora_engine_version, setaurora_engine_version] = useState("");
  const [aurora_instance_type, setaurora_instance_type] = useState("");
  const [output, setoutput] = useState("");


  const [formState, setformState] = useState(0);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName":"AWS",
    "usecaseType":"3-tier",
    "usecaseName":"ap1",
    "parameter":{
    "aws_access_key":aws_access_key,
    "aws_secret_key":aws_secret_key,
    "region": region,
    "vpc_cidr": vpc_cidr,
    "az_1": az_1,
    "az_2": az_2,
    "public_subnet_cidr_1a": public_subnet_cidr_1a,
    "public_subnet_cidr_1b": public_subnet_cidr_1b,
    "private_subnet_cidr_1a": private_subnet_cidr_1a,
    "private_subnet_cidr_1b": private_subnet_cidr_1b,
    "dbsubnet_cidr_1a": dbsubnet_cidr_1a,
    "dbsubnet_cidr_1b": dbsubnet_cidr_1b,
    "env_name": env_name,
    "key_name": key_name,
    "webserver_ami": webserver_ami,
    "appserver_ami": appserver_ami,
    "webserver_instance_type": webserver_instance_type,
    "appserver_instance_type": appserver_instance_type,
    "aurora_engine_version": aurora_engine_version,
    "aurora_instance_type": aurora_instance_type,
    }
  };

  const configList1 = {
    "Environment Name": env_name,
    "Key Name": key_name,
    "Region": region,
    "VPC CIDR": vpc_cidr,
    "Availability Zone-1": az_1,
    "Availability Zone-2": az_2,
    "Public Subnet CIDR-1A": public_subnet_cidr_1a,
    "Public Subnet CIDR-1B": public_subnet_cidr_1b,
    "Application Subnet CIDR-1A": private_subnet_cidr_1a,
    "Application Subnet CIDR-1B": private_subnet_cidr_1b,
    "DB Subnet CIDR-1A": dbsubnet_cidr_1a,
    "DB Subnet CIDR-1B": dbsubnet_cidr_1b,
    "Webserver AMI": webserver_ami,
    "Webserver Instance Type": webserver_instance_type,
    "Appserver AMI": appserver_ami,
    "Appserver Instance Type": appserver_instance_type,
    "Aurora Engine Version": aurora_engine_version,
    "Aurora Instance Type": aurora_instance_type,
  };


  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e)
  }

  const setCredentials = (list) => {
    setaws_access_key(list.accessKey)
    setaws_secret_key(list.secretKey)
    // setaccountId(list.accountCode)
    console.log(list);
  }

  const clearInputField = () => {
    //setaccess_key("")
    //setsecret_key("")
    setregion("");
    setvpc_cidr("");
    setaz_1("");
    setaz_2("");
    setpublic_subnet_cidr_1a("");
    setpublic_subnet_cidr_1b("");
    setprivate_subnet_cidr_1a("");
    setprivate_subnet_cidr_1b("");
    setdbsubnet_cidr_1a("");
    setdbsubnet_cidr_1b("");
    setenv_name("");
    setkey_name("");
    setwebserver_ami("");
    setappserver_ami("");
    setwebserver_instance_type("");
    setappserver_instance_type("");
    setaurora_engine_version("");
    setaurora_instance_type("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
    const values = [
      aws_access_key,
      aws_secret_key,
      region,
      vpc_cidr,
      az_1,
      az_2,
      public_subnet_cidr_1a,
      public_subnet_cidr_1b,
      private_subnet_cidr_1a,
      private_subnet_cidr_1b,
      dbsubnet_cidr_1a,
      dbsubnet_cidr_1b,
      env_name,
      key_name,
      webserver_ami,
      appserver_ami,
      webserver_instance_type,
      appserver_instance_type,
      aurora_engine_version,
      aurora_instance_type,
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
  }
  else {
    setConnectionPopup(true)
  }
  };

  const setformIndex = (e) => {
    setformState(e)
  }

  if (formState === 0) {
    return (
      <>
        <div>
          
          
    <div class="clearfix">
          <div class="box3"></div>
         <div> <h4 class="box1">3-Tier Web Application - VPC & RDS Aurora DB (with HA)</h4> </div>
          <Header1 />
        </div> 
          <hr
            style={{
              backgroundColor: "black",
              opacity: 0.1,
            }}
          />

          <section className="col-10 mx-auto">
            <Form className="main-form">
              
                <Card
                  style={{
                    padding: "10px",
                    margin: "10px",
                    width: "auto",
                    boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  <h6>Application Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="env_name">Environment Name</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setenv_name(e.target.value)}
                              name="env_name"
                              id="env_name"
                              value={env_name}
                              placeholder="Environment Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>

                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Key Name</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setkey_name(e.target.value)}
                          name="key_name"
                          id="key_name"
                          value={key_name}
                          placeholder="Key Name"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Region</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          name="region"
                          id="region"
                          value={region}
                          onChange={(e) => setregion(e.target.value)}
                          placeholder="Region"
                          required=""
                        /></span></OverlayTrigger>
                      </div>

                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >VPC CIDR</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setvpc_cidr(e.target.value)}
                          name="vpc_cidr"
                          id="vpc_cidr"
                          value={vpc_cidr}
                          placeholder="VPC CIDR"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Availability Zone-1</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setaz_1(e.target.value)}
                          name="az_1"
                          id="az_1"
                          value={az_1}
                          placeholder="Availability Zone-1"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Availability Zone-2</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setaz_2(e.target.value)}
                          name="az_2"
                          id="az_2"
                          value={az_2}
                          placeholder="Availability Zone-2"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Public Subnet CIDR-1A</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setpublic_subnet_cidr_1a(e.target.value)
                          }
                          name="public_subnet_cidr_1a"
                          id="public_subnet_cidr_1a"
                          value={public_subnet_cidr_1a}
                          placeholder="Public Subnet CIDR-1A"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Public Subnet CIDR-1B</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setpublic_subnet_cidr_1b(e.target.value)
                          }
                          name="public_subnet_cidr_1b"
                          id="public_subnet_cidr_1b"
                          value={public_subnet_cidr_1b}
                          placeholder="Public Subnet CIDR-1B"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Application Subnet CIDR-1A</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setprivate_subnet_cidr_1a(e.target.value)
                          }
                          name="private_subnet_cidr_1a"
                          id="private_subnet_cidr_1a"
                          value={private_subnet_cidr_1a}
                          placeholder="Application Subnet CIDR-1A"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Application Subnet CIDR-1B</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setprivate_subnet_cidr_1b(e.target.value)
                          }
                          name="private_subnet_cidr_1b"
                          id="private_subnet_cidr_1b"
                          value={private_subnet_cidr_1b}
                          placeholder="Application Subnet CIDR-1B"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Subnet CIDR-1A</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setdbsubnet_cidr_1a(e.target.value)}
                          name="dbsubnet_cidr_1a"
                          id="dbsubnet_cidr_1a"
                          value={dbsubnet_cidr_1a}
                          placeholder="DB Subnet CIDR-1A"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Subnet CIDR-1B</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setdbsubnet_cidr_1b(e.target.value)}
                          name="dbsubnet_cidr_1b"
                          id="dbsubnet_cidr_1b"
                          value={dbsubnet_cidr_1b}
                          placeholder="DB Subnet CIDR-1B"
                          required=""
                          pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$"
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Webserver AMI</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setwebserver_ami(e.target.value)}
                          name="webserver_ami"
                          id="webserver_ami"
                          value={webserver_ami}
                          placeholder="Webserver AMI"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Webserver Instance Type</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setwebserver_instance_type(e.target.value)
                          }
                          name="webserver_instance_type"
                          id="webserver_instance_type"
                          value={webserver_instance_type}
                          placeholder="Webserver Instance Type"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver AMI</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) => setappserver_ami(e.target.value)}
                          name="appserver_ami"
                          id="appserver_ami"
                          value={appserver_ami}
                          placeholder="Appserver AMI"
                          required=""
                        /></span></OverlayTrigger>
                      </div>

                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver Instance Type</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setappserver_instance_type(e.target.value)
                          }
                          name="appserver_instance_type"
                          id="appserver_instance_type"
                          value={appserver_instance_type}
                          placeholder="Appserver Instance Type"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Aurora Engine Version</Tooltip> } placement="left">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setaurora_engine_version(e.target.value)
                          }
                          name="aurora_engine_version"
                          id="aurora_engine_version"
                          value={aurora_engine_version}
                          placeholder="Aurora Engine Version"
                          required=""
                        /></span></OverlayTrigger>
                      </div>

                      <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Aurora Instance Type</Tooltip> } placement="right">
                  <span>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            setaurora_instance_type(e.target.value)
                          }
                          name="aurora_instance_type"
                          id="aurora_instance_type"
                          value={aurora_instance_type}
                          placeholder="Aurora Instance Type"
                          required=""
                        /></span></OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <ConnectionInfo setCredentials={setCredentials} setConnectionPopup={setConnectionPopup}
                  showCloudConnectionPopup={showCloudConnectionPopup}></ConnectionInfo>

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
        <img
          src={graph}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "35%",
            marginTop: "1em",
          }}
          alt="home img"
        />
        <div className="description col-10 mt-8">
          <p>
            This Blueprint automates the provision of 3 tier Application
            Architecture with below components:
            <br /> &#10148; VPC created with Public and Private Subnets spanning
            across two Availability zones for providing High Availability.
            <br /> &#10148; Web instances provisioned in Public Subnet
            (connected to Internet)
            <br /> &#10148; App instances provisioned in App Subnet (Private).
            <br /> &#10148; RDS Aurora Database provisioned in DB subnet
            (Private).
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
