import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import graph from "../../../../images/rdsAuroraDb.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
export default function Ap3() {
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [access_key, setaccess_key] = useState(null);
  const [secret_key, setsecret_key] = useState(null);
  const [formState, setformState] = useState(0);
  const [env_name, setenv_name] = useState("");
  const [region, setregion] = useState("");
  const [key_name, setkey_name] = useState("");
  const [webserver_ami, setwebserver_ami] = useState("");
  const [appserver_ami, setappserver_ami] = useState("");
  const [vpc_id, setvpc_id] = useState("");
  const [webserver_instance_type, setwebserver_instance_type] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [aurora_instance_type, setaurora_instance_type] = useState("");
  const [db_subnet_id, setdb_subnet_id] = useState("");
  const [web_subnet_id, setweb_subnet_id] = useState("");
  const [app_subnet_id, setapp_subnet_id] = useState("");
  const [web_security_group_ids, setweb_security_group_ids] = useState("");
  const [app_security_group_ids, setapp_security_group_ids] = useState("");
  const [db_security_group_ids, setdb_security_group_ids] = useState("");

  const [subnet_group_name, setsubnet_group_name] = useState("");
  const [aurora_engine_version, setaurora_engine_version] = useState("");

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName":"AWS",
    "usecaseType":"3-tier",
    "usecaseName":"ap3",
    "parameter":{
    "access_key": access_key,
    "secret_key": secret_key,
    "env_name ": env_name,
    "region": region,
    "key_name": key_name,
    "webserver_ami": webserver_ami,
    "appserver_ami": appserver_ami,
    "vpc_id": vpc_id,
    "webserver_instance_type": webserver_instance_type,
    "appserver_instance_type": appserver_instance_type,
    "aurora_instance_type": aurora_instance_type,
    "db_subnet_id": db_subnet_id,
    "web_subnet_id": web_subnet_id,
    "app_subnet_id": app_subnet_id,
    "web_security_group_ids": web_security_group_ids,
    "app_security_group_ids": app_security_group_ids,
    "db_security_group_ids": db_security_group_ids,

    "subnet_group_name": subnet_group_name,
    "aurora_engine_version": aurora_engine_version,
    }
  };
  
  const configList1 = {
    
    "Environment Name": env_name,
    "Key Name": key_name,
    "Region": region,
    "VPC ID": vpc_id,
    "Web Subnet ID": web_subnet_id,
    "App Subnet ID": app_subnet_id,
    "DB Subnet ID": db_subnet_id,
    "Subnet Group Name": subnet_group_name,
    "Webserver AMI": webserver_ami,
    "Web Server Instance Type": webserver_instance_type,
    "Webserver Security Group ID": web_security_group_ids,
    "Appserver AMI": appserver_ami,
    "Appserver Instance Type": appserver_instance_type,
    "Appserver Security Group ID": app_security_group_ids,
    "Aurora Engine Version": aurora_engine_version,
   "Aurora Instance Type": aurora_instance_type,
   "DB Security Group ID": db_security_group_ids,

   
   
  };

  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e)
  }

  const setCredentials = (list) => {
    setaccess_key(list.accessKey)
    setsecret_key(list.secretKey)
    // setaccountId(list.accountCode)
   
  }

  const clearInputField = () => {
    // setaccess_key("");
    // setsecret_key("");
    setenv_name("");
    setregion("");
    setkey_name("");
    setwebserver_ami("");
    setappserver_ami("");
    setvpc_id("");
    setwebserver_instance_type("");
    setappserver_instance_type("");
    setaurora_instance_type("");
    setdb_subnet_id("");
    setweb_subnet_id("");
    setapp_subnet_id("");
    setweb_security_group_ids("");
    setapp_security_group_ids("");
    setdb_security_group_ids("");

    setsubnet_group_name("");
    setaurora_engine_version("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (access_key) {
    const values = [
      access_key,
      secret_key,
      env_name,
      region,
      key_name,
      webserver_ami,
      appserver_ami,
      vpc_id,
      webserver_instance_type,
      appserver_instance_type,
      aurora_instance_type,
      db_subnet_id,
      web_subnet_id,
      app_subnet_id,
      web_security_group_ids,
      app_security_group_ids,
      db_security_group_ids,

      subnet_group_name,
      aurora_engine_version

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
         <div> <h4 class="box1">3-Tier Web Application - RDS Aurora DB</h4> </div>
          <Header1 />
        </div>
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />





        <section className="col-10 mx-auto">
          <div>
            <img src={graph} className="image float-end" alt="home img" />
          </div>

          <div><Form className="main-form ">

          <Card
                  style={{
                    padding: "10px",
                    margin: "10px",
                    width: "auto",
                    boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)",
                  }}
                >
           
              
                            <h6>Application details</h6>
              <Form.Group>
                <div className="row mt-2">
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="aws_region" >Environment Name</Tooltip> } placement="left">
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
                      onChange={(e) => setregion(e.target.value)}
                      name="region"
                      id="region"
                      value={region}
                      placeholder="Region"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >VPC ID</Tooltip> } placement="right">
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
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="aws_region" >Web Subnet ID</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setweb_subnet_id(e.target.value)}
                      name="web_subnet_id"
                      id="web_subnet_id"
                      value={web_subnet_id}
                      placeholder="Web Subnet ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >App Subnet ID</Tooltip> } placement="right">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setapp_subnet_id(e.target.value)}
                      name="app_subnet_id"
                      id="app_subnet_id"
                      value={app_subnet_id}
                      placeholder="App Subnet ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                
                 
                 
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">
                  
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Subnet ID</Tooltip> } placement="left">
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
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >Subnet Group Name</Tooltip> } placement="right">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setsubnet_group_name(e.target.value)}
                      name="subnet_group_name"
                      id="subnet_group_name"
                      value={subnet_group_name}
                      placeholder="Subnet Group Name"
                      required=""
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
                      onChange={(e) => setwebserver_instance_type(e.target.value)}
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
                <OverlayTrigger overlay={<Tooltip id="aws_region" >Webserver Security Group ID</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setweb_security_group_ids(e.target.value)}
                      name="web_security_group_ids"
                      id="web_security_group_ids"
                      value={web_security_group_ids}
                      placeholder="Webserver Security Group ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver AMI</Tooltip> } placement="right">
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
                 
                  
                </div>
              </Form.Group>

              

              <Form.Group>
                <div className="row mt-2">
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver Instance Type</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setappserver_instance_type(e.target.value)}
                      name="appserver_instance_type"
                      id="appserver_instance_type"
                      value={appserver_instance_type}
                      placeholder="Appserver Instance Type"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver Security Group ID</Tooltip> } placement="right">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setapp_security_group_ids(e.target.value)}
                      name="app_security_group_ids"
                      id="app_security_group_ids"
                      value={app_security_group_ids}
                      placeholder="Appserver Security Group ID"
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
                      onChange={(e) => setaurora_engine_version(e.target.value)}
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
                      onChange={(e) => setaurora_instance_type(e.target.value)}
                      name="aurora_instance_type"
                      id="aurora_instance_type"
                      value={aurora_instance_type}
                      placeholder="Aurora Instance Type"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                 
                </div>
              </Form.Group>

             
              

              <Form.Group>
                <div className="row mt-2">
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Security Group ID</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdb_security_group_ids(e.target.value)}
                      name="db_security_group_ids"
                      id="db_security_group_ids"
                      value={db_security_group_ids}
                      placeholder="DB Security Group ID"
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
          </Form></div>




        </section>
        </div>
        <div className="description col-10 mt-8">
      <p> This Blueprint automates the provision of 3 tier Application Architecture in existing subnet with below components:
        <br/>&#10148; Web instance provisioned in existing Public Subnet (connected to Internet)
          <br/>&#10148; Application instance provisioned in existing App Subnet (Private).
          <br/>&#10148; RDS Aurora Database provisioned in existing DB Subnet (Private).
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
         <Output output={output}/>
          
        </>
      );
    }
  }
}
