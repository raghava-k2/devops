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

export default function Datalake1() {

  // Account details
  const[resource_group, setresource_group] = useState("");
  const[resource_group_location, setresource_group_location] = useState("");
  const[nsg_name, setnsg_name] = useState("");
  const[name, setname] = useState("");
  const[priority, setpriority] = useState("");
  const[direction, setdirection] = useState("");
  const[access, setaccess] = useState("");
  const[protocol, setprotocol] = useState("");
  const[destination_port_range, setdestination_port_range] = useState("");
  const[source_address_prefix, setsource_address_prefix] = useState("");
  const[destination_address_prefix, setdestination_address_prefix] = useState("");
  const[description, setdescription] = useState("");
  const[subscriptionid, setsubscriptionid] = useState(profile.subscriptionid);
  const[client_id,setclient_id] = useState(profile.client_id);
  const[client_secret, setclient_secret] = useState(profile.client_secret);
  const[tenant_id,settenant_id] = useState(profile.tenant_id);
  const [formState, setformState] = useState(0)
  const [output, setoutput] = useState("");
  // const  {exec} = require("child_process");

  const configList = {
    "providerName":"AZURE",
    "usecaseType":"Module",
    "usecaseName":"Nsg",
    "parameter":{
        "subscriptionid": subscriptionid,
        "client_id": client_id,
        "client_secret": client_secret,
        "tenant_id": tenant_id,
        "resource_group": resource_group,
        "resource_group_location": resource_group_location,
        "nsg_name": nsg_name,
        "ns_rules": {
            "name": name,
            "priority": priority,
            "direction": direction,
            "access": access,
            "protocol": protocol,
            "destination_port_range": destination_port_range,
            "source_address_prefix": source_address_prefix,
            "destination_address_prefix": destination_address_prefix,
            "description": description,
        }
    }
   };

  //  const form={
  //    region:{
  //      terraformField:'_',
  //      label:'REgion',
  //      value:''
  //    }
  //  }
  const configList1 = {
     "Resource Group": resource_group,
        "Resource Group Location": resource_group_location,
        "NSG Name": nsg_name,
        
            "name": name,
            "priority": priority,
            "direction": direction,
            "access": access,
            "protocol": protocol,
            "destination_port_range": destination_port_range,
            "source_address_prefix": source_address_prefix,
            "destination_address_prefix": destination_address_prefix,
            "description": description,
        
    
   };

  const clearInputField = () => {
    resource_group("");
    resource_group_location("");
    nsg_name("");
    
    name("");
    priority("");
    direction("");
    access("");
    protocol("");
    destination_port_range("");
    source_address_prefix("");
    destination_address_prefix("");
    description("");
   };
   
  const reviewList = (e) => {
    e.preventDefault();
    console.log(configList);
    const values = [
      subscriptionid,
      client_id,
      client_secret,
      tenant_id,
      resource_group,
      resource_group_location,
      nsg_name,
     
      name,
      priority,
      direction,
      access,
      protocol,
      destination_port_range,
      source_address_prefix,
      destination_address_prefix,
      description,
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
         <div> <h4 class="box1">Module - Network Security Group </h4> </div>
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

           <Card style={{padding: '10px', margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)'}}> 
           
           <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="resource_group" >Resource Group</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setresource_group(e.target.value)}
                      name="resource_group"
                      id="resource_group"
                      value={resource_group}
                      placeholder="Resource Group"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="resource_group_location" >Resource Group Location</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setresource_group_location(e.target.value)}
                      name="resource_group_location"
                      id="resource_group_location"
                      value={resource_group_location}
                      placeholder="Resource Group Location"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="nsg_name" >Network Security Group Name</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setnsg_name(e.target.value)}
                      name="nsg_name"
                      id="nsg_name"
                      value={nsg_name}
                      placeholder="Network Security Group Name"
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
        <h6>Network Security Rules</h6>

              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="name" >Name</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setname(e.target.value)}
                      name="name"
                      id="name"
                      value={name}
                      placeholder="Name"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="priority" >Priority</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setpriority(e.target.value)}
                      name="priority"
                      id="priority"
                      value={priority}
                      placeholder="priority"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="name" >Direction</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdirection(e.target.value)}
                      name="direction"
                      id="direction"
                      value={direction}
                      placeholder="Direction"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="access" >Access</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setaccess(e.target.value)}
                      name="access"
                      id="access"
                      value={access}
                      placeholder="Access"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="protocol" >Protocol</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setprotocol(e.target.value)}
                      name="protocol"
                      id="protocol"
                      value={protocol}
                      placeholder="Protocol"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="destination_port_range" >Destination Port Range</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdestination_port_range(e.target.value)}
                      name="destination_port_range"
                      id="destination_port_range"
                      value={destination_port_range}
                      placeholder="Destination Port Range"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="source_address_prefix" >Source Address Prefix</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setsource_address_prefix(e.target.value)}
                      name="source_address_prefix"
                      id="source_address_prefix"
                      value={source_address_prefix}
                      placeholder="Source Address Prefix"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="destination_address_prefix" >Destination Address Prefix</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdestination_address_prefix(e.target.value)}
                      name="destination_address_prefix"
                      id="destination_address_prefix"
                      value={destination_address_prefix}
                      placeholder="Destination Address Prefix"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
               
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="description" >Description</Tooltip> } placement="left">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setdescription(e.target.value)}
                      name="description"
                      id="description"
                      value={description}
                      placeholder="Description"
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
        {/* <div className="description col-10 mt-8">
        <p> This Blueprint automates the provision of Infrastructure for the data processing using S3, Dynamo DB and EMR. Details of provision are given below:
        <br/>&#10148; Creation of two S3 buckets:
              <br/>&nbsp;&nbsp;&#9679; Rawdata-landing-(random number) with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
              <br/>&nbsp;&nbsp;&#9679; Processeddata-(random number)  with a Lifecycle policy of retention of 7 days and move  the data to glacier after that.
          <br/>&#10148;  EMR – One Name Node and one Worker Node which runs for every 30 minutes.
          <br/>&#10148;	Dynamo DB table with two columns (filename, fileprocessed).
          
        </p>
    </div>  */}
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
     
      function rec() {
        axios
          .get(Api.ip+"runUseCase")
          .then((response) => setoutput(response.data));
        setTimeout(rec, 3000);
      }
      rec();
      

      return (
        <>
         <Output output={output}/>
        </>
      );
    }
  }
}
