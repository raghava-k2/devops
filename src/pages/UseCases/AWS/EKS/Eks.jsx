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

import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { Review } from "../../../../components/Review/Review";
export default function Eks() {
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
  useState(false);

const [access_key, setaccess_key] = useState(null);
const [secret_key, setsecret_key] = useState(null);
const [accountId, setaccountId] = useState(null);
  
  
  const [key_name, setkey_name] = useState("");
 
  const [vpc_id, setvpc_id] = useState("");
  const [region, setregion] = useState("");
  const [env_name, setenv_name] = useState("");
  const [subnet_1, setsubnet_1] = useState("");
  const [subnet_2, setsubnet_2] = useState("");
  const [instance_type ,setinstance_type] = useState("");
  const [desired_nodes,setdesired_nodes] = useState("");
  const [additional_security_group_id,setadditional_security_group_id] = useState("");
  const [root_volume_size,setroot_volume_size] = useState("");
 const [cluster_version,setcluster_version] = useState("");

  
 const [formState, setformState] = useState(0);
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "providerName":"AWS",
    "usecaseType":"Container",
    "usecaseName":"eks",
    "parameter":{
    "access_key": access_key,
    "secret_key": secret_key,
    "env_name ": env_name,
    "region": region,
    "key_name": key_name,
    
    "vpc_id": vpc_id,
    "subnet_1":subnet_1,
    "subnet_2": subnet_2,
    "instance_type":instance_type,
    "desired_nodes":desired_nodes,
    "additional_security_group_id":additional_security_group_id,
    "root_volume_size":root_volume_size,
    
    "cluster_version":cluster_version,
    }
  };
  
  const configList1 = {
    
    "Environment Name": env_name,
    "Key Name": key_name,
    "Region": region,
    "VPC ID": vpc_id,
    "Public Subnet ID": subnet_1,
    "Private Subnet ID":subnet_2,
    "Instance Type":instance_type,
    "Desired Nodes":desired_nodes,
    "Additional Security Group ID": additional_security_group_id,
    "Root Volume Size": root_volume_size,
    "Cluster Version": cluster_version,

   
   
  };

  const clearInputField = () => {
    // setaccess_key("");
    // setsecret_key("");
    setenv_name("");
    setregion("");
    setkey_name("");
    
    setvpc_id("");
    setsubnet_1("");
    setsubnet_2("");
    setinstance_type("");
    setdesired_nodes("");
    setadditional_security_group_id("");
    setroot_volume_size("");
    setcluster_version("");

    
  };
  
  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e);
  };
  const setCredentials = (list) => {
    setaccess_key(list.accessKey);
    setsecret_key(list.secretKey);
    setaccountId(list.accountCode);
    console.log(list);
  };
  const reviewList = (e) => {
    e.preventDefault();
    if(access_key) {
    const values = [
      access_key,
      secret_key,
      env_name,
      region,
      key_name,
      
      vpc_id,
      subnet_1,
      subnet_2,
      instance_type,
      desired_nodes,
      additional_security_group_id,
      root_volume_size,
      cluster_version,
      

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
         <div> <h4 class="box1">Container - EKS Cluster Creation</h4> </div>
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

          <Card
                  style={{
                    padding: "10px",
                    margin: "10px",
                    width: "auto",
                    boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)",
                  }}
                >
           
              
                            
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
                <OverlayTrigger overlay={<Tooltip id="subnet_1" >Public Subnet ID</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setsubnet_1(e.target.value)}
                      name="subnet_1"
                      id="subnet_1"
                      value={subnet_1}
                      placeholder="Public Subnet ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="subnet_2" >Private Subnet ID</Tooltip> } placement="right">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setsubnet_2(e.target.value)}
                      name="subnet_2"
                      id="subnet_2"
                      value={subnet_2}
                      placeholder="Private Subnet ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                
                 
                 
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">
                  
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="instance_type" >Instance Type</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setinstance_type(e.target.value)}
                      name="instance_type"
                      id="instance_type"
                      value={instance_type}
                      placeholder="Instance Type"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="desired_nodes" >Desired Nodes</Tooltip> } placement="right">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdesired_nodes(e.target.value)}
                      name="desired_nodes"
                      id="desired_nodes"
                      value={desired_nodes}
                      placeholder="Desired Nodes"
                      required=""
                    /></span></OverlayTrigger>
                  </div>

                  
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">
                  
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="additional_security_group_id" >Additional Security Group ID</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setadditional_security_group_id(e.target.value)}
                      name="additional_security_group_id"
                      id="additional_security_group_id"
                      value={additional_security_group_id}
                      placeholder="Additional Security Group ID"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="root_volume_size" >Root Volume Size</Tooltip> } placement="right">
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
                <OverlayTrigger overlay={<Tooltip id="cluster_version" >Cluster Version</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setcluster_version(e.target.value)}
                      name="cluster_version"
                      id="cluster_version"
                      value={cluster_version}
                      placeholder="Cluster Version"
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
      <p>This usecase will create an EKS cluster with managed worker nodes joined with the cluster in an Autoscaling Group.
         Additional Security Security Groups are also created along with necessary IAM Roles for the cluster and worker nodes to communicate with each other. 
       
          
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
