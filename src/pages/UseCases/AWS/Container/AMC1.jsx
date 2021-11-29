import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function AMC1() {

  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
  useState(false);
const [aws_region, setaws_region] = useState("");
const [aws_access_key, setaws_access_key] = useState(null);
const [aws_secret_key, setaws_secret_key] = useState(null);
const [accountId, setaccountId] = useState(null);
  
  // Docker Image details
  const [web_server_image , setweb_server_image ] = useState("");
  const [db_server_image  , setdb_server_image  ] = useState("");
  

  // VPC Details
  const [ecs_vpc_id , setecs_vpc_id ] = useState("");
  const [subnet_id, setsubnet_id] = useState("");

  // EC2 container instance Details
  const [ecs_optimized_ami , setecs_optimized_ami ] = useState("");
  const [ecs_instance_type , setecs_instance_type ] = useState("");
  const [instance_key_name , setinstance_key_name ] = useState("");

  const [formState, setformState] = useState(0);
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName":"AWS",
    "usecaseType":"Container",
    "usecaseName":"amc1",
    "parameter":{
    "aws_region": aws_region,
    "aws_access_key": aws_access_key,
    "aws_secret_key": aws_secret_key,
    "web_server_image ": web_server_image ,
    "db_server_image  ": db_server_image  ,
    "ecs_vpc_id ": ecs_vpc_id ,
    "subnet_id": subnet_id,    
    "ecs_optimized_ami ": ecs_optimized_ami ,
    "instance_key_name ": instance_key_name ,
    "ecs_instance_type ": ecs_instance_type ,
    }
   };
  const configList1 = {
    "AWS Region": aws_region,
    "ECS VPC ID": ecs_vpc_id ,
    "Subnet ID": subnet_id,
    "ECS Optimized AMI": ecs_optimized_ami ,
    "ECS Instance Type": ecs_instance_type ,
    "Instance Key Name": instance_key_name ,
    "Web Server Image": web_server_image ,
    "DB Server Image": db_server_image  ,
   };


  const clearInputField = () => {
    setaws_region("");

    setweb_server_image ("");
    setdb_server_image  ("");
    setecs_instance_type ("");
    setinstance_key_name ("");
    setecs_optimized_ami ("");
    setecs_vpc_id ("");
    setsubnet_id("");  

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
    if(aws_access_key) {
    const values = [
      aws_region,
      aws_access_key,
      aws_secret_key,
      web_server_image ,
      db_server_image  ,
      ecs_instance_type ,
      instance_key_name ,    
      ecs_optimized_ami ,
      ecs_vpc_id ,
      subnet_id,
      
     
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
  setformState(e)
}

  if (formState === 0) {
    return (
      <>
      <div>

      <div class="clearfix">
          <div class="box3"></div>
         <div> <h4 class="box1">Standalone ECS-EC2 Linux cluster</h4> </div>
          <Header1 />
        </div>
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />

{/*         
        <Header />
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />
        <h4 className="text-center">Standalone ECS-EC2 Linux cluster</h4>
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        /> */}





        <section className="col-10 mx-auto">
          {/* <div>
            <img src={graph} className="image float-end" alt="home img" />
          </div> */}

          <div><Form className="main-form ">

            
           <Card style={{ padding: '10px', margin: '10px', width: 'auto',  boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)" }}>
            <h6>AWS Details</h6>
              

              <Form.Group>
                <div className="row mt-2">
                                   
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="dynamodb_name">AWS Region</Tooltip>}placement="left">
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
             
                            <h6>VPC (Networking) Details</h6>
              <Form.Group>
                <div className="row mt-2">
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="dynamodb_name">ECS VPC ID</Tooltip>}placement="left">
                        <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setecs_vpc_id (e.target.value)}
                      name="ecs_vpc_id "
                      id="ecs_vpc_id "
                      value={ecs_vpc_id }
                      placeholder="ECS VPC ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Subnet ID</Tooltip>}placement="right">
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
              <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />
              
            <h6>EC2 Instance Details</h6>
              <Form.Group>
                <div className="row mt-2">
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="dynamodb_name">ECS Optimized AMI</Tooltip>}placement="left">
                        <span>
                    <Form.Control
                      type="text"
                      name="ecs_optimized_ami "
                      id="ecs_optimized_ami "
                      value={ecs_optimized_ami }
                      onChange={(e) => setecs_optimized_ami (e.target.value)}
                      placeholder="ECS Optimized AMI"
                      required=""
                    /></span></OverlayTrigger>
                  </div>

                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="dynamodb_name">ECS Instance Type</Tooltip>}placement="right">
                        <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setecs_instance_type (e.target.value)}
                      name="ecs_instance_type "
                      id="ecs_instance_type "
                      value={ecs_instance_type }
                      placeholder="ECS Instance Type"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row mt-2">                                   
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Instance Key Name</Tooltip>}placement="left">
                        <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setinstance_key_name (e.target.value)}
                      name="instance_key_name "
                      id="instance_key_name "
                      value={instance_key_name }
                      placeholder="Instance Key Name"
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
             
            <h6>Docker Images Details</h6>
              <Form.Group>
                <div className="row mt-2">
                
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="dynamodb_name">Web Server Image</Tooltip>}placement="left">
                        <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setweb_server_image (e.target.value)}
                      name="web_server_image "
                      id="web_server_image "
                      value={web_server_image }
                      placeholder="Web Server Image"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="dynamodb_name">DB Server Image</Tooltip>}placement="right">
                        <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdb_server_image  (e.target.value)}
                      name="db_server_image  "
                      id="db_server_image  "
                      value={db_server_image  }
                      placeholder="DB Server Image"
                      required=""
                    /></span></OverlayTrigger>
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
          </Form></div>
        </section>
        </div>

        <div className="description col-10 mt-8">
      <p>  This usecase will create one ECS-EC2 Linux cluster with one ECS-optimized EC2.
          It will also create one ECS task definition which consists of Web-Apache and MariaDB Container definitions with respective IAM roles and CloudWatch log-groups.
         Finally it will create ECS Service which will run both the containers on ECS-optimized EC2.
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
