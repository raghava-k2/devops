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
  const[prefix, setprefix] = useState("");
  const[location, setlocation] = useState("");
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
    "usecaseName":"AzureVmCreation",
    "parameter":{
        "subscriptionid": subscriptionid,
        "client_id": client_id,
        "client_secret": client_secret,
        "tenant_id": tenant_id,
        "prefix": prefix,
        "location": location,
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
    "Resource Group Prefix" : prefix,
    "Location": location,
   };

  const clearInputField = () => {
    
    prefix("");
    location("");
   };
  const reviewList = (e) => {
    e.preventDefault();
    const values = [
      subscriptionid,
      client_id,
      client_secret,
      tenant_id,
      location,
      prefix,
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
         <div> <h4 class="box1">Module - Linux VM with VNET Creation</h4> </div>
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
                <OverlayTrigger overlay={<Tooltip id="prefix" >Resource Group Prefix</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setprefix(e.target.value)}
                      name="prefix"
                      id="prefix"
                      value={prefix}
                      placeholder="Prefix"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="location" >Location</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setlocation(e.target.value)}
                      name="location"
                      id="location"
                      value={location}
                      placeholder="Location"
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
