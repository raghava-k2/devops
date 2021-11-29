import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"

import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
export default function Ap2() {
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [formState, setformState] = useState(0);

  const [vpc_cidr, setvpc_cidr] = useState("");
  const [public_subnet_cidr_1a, setpublic_subnet_cidr_1a] = useState("");
  const [public_subnet_cidr_1b, setpublic_subnet_cidr_1b] = useState("");
  const [private_subnet_cidr_1a, setprivate_subnet_cidr_1a] = useState("");
  const [private_subnet_cidr_1b, setprivate_subnet_cidr_1b] = useState("");
  const [dbsubnet_cidr_1a, setdbsubnet_cidr_1a] = useState("");
  const [dbsubnet_cidr_1b, setdbsubnet_cidr_1b] = useState("");
  const [env_name, setenv_name] = useState("");
  const [az_1, setaz_1] = useState("");
  const [az_2, setaz_2] = useState("");
  const [region, setregion] = useState("");
  const [key_name, setkey_name] = useState("");
  const [webserver_ami, setwebserver_ami] = useState("");
  const [appserver_ami, setappserver_ami] = useState("");
  const [dbserver_ami, setdbserver_ami] = useState("");
  const [webserver_instance_type, setwebserver_instance_type] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [dbserver_instance_type, setdbserver_instance_type] = useState("");

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);



  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "3-tier",
    "usecaseName": "ap2",
    "parameter": {
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "vpc_cidr": vpc_cidr,
      "public_subnet_cidr_1a": public_subnet_cidr_1a,
      "public_subnet_cidr_1b": public_subnet_cidr_1b,
      "private_subnet_cidr_1a": private_subnet_cidr_1a,
      "private_subnet_cidr_1b": private_subnet_cidr_1b,
      "dbsubnet_cidr_1a": dbsubnet_cidr_1a,
      "dbsubnet_cidr_1b": dbsubnet_cidr_1b,
      "env_name": env_name,
      "az_1": az_1,
      "az_2": az_2,
      "region": region,
      "key_name": key_name,
      "webserver_ami ": webserver_ami,
      "appserver_ami": appserver_ami,
      "dbserver_ami": dbserver_ami,
      "webserver_instance_type": webserver_instance_type,
      "appserver_instance_type": appserver_instance_type,
      "dbserver_instance_type": dbserver_instance_type,
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
    "DB Subnet CIDR-1A": dbsubnet_cidr_1b,
    "Webserver AMI ": webserver_ami,
    "Webserver Instance Type": webserver_instance_type,
    "Appserver AMI": appserver_ami,
    "Appserver Instance Type": appserver_instance_type,
    "DB Server AMI": dbserver_ami,
    "DB Server Instance Type": dbserver_instance_type,
  };


  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e)
  }

  const setCredentials = (list) => {
    setaws_access_key(list.accessKey)
    setaws_secret_key(list.secretKey)
    // setaccountId(list.accountCode)
    
  }

  const clearInputField = () => {
    //setaccess_key("");
    //setsecret_key("");
    setregion("");
    setkey_name("");
    setwebserver_ami("");
    setappserver_ami("");
    setdbserver_ami("");
    setenv_name("");
    setpublic_subnet_cidr_1a("");
    setpublic_subnet_cidr_1b("");
    setwebserver_instance_type("");
    setappserver_instance_type("");
    setvpc_cidr("");
    setdbserver_instance_type("");
    setprivate_subnet_cidr_1b("");
    setdbsubnet_cidr_1a("");
    setprivate_subnet_cidr_1a("");
    setdbsubnet_cidr_1b("");
    setaz_1("");
    setaz_2("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_access_key,
        aws_secret_key,
        region,
        key_name,
        webserver_ami,
        appserver_ami,
        dbserver_ami,
        env_name,
        public_subnet_cidr_1a,
        public_subnet_cidr_1b,
        webserver_instance_type,
        appserver_instance_type,
        vpc_cidr,
        dbserver_instance_type,
        private_subnet_cidr_1a,
        private_subnet_cidr_1b,
        dbsubnet_cidr_1a,
        dbsubnet_cidr_1b,
        az_1,
        az_2
      ];

      const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== "" && value !== "0";
      });

      if (allFieldsFilled) {
        setformState(1)
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
            <div> <h4 class="box1">3-Tier Web Application - VPC & EC2 DB</h4> </div>
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

            <div>
              <Form className="main-form">

                <Card style={{ border: 'none' }}>


                  <Card style={{ padding: '10px', margin: '10px', width: 'auto' }}>
                    <h5>Application Details</h5>
                    <Form.Group>
                      <div className="row mt-2">

                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setenv_name(e.target.value)}
                            name="env_name"
                            id="env_name"
                            value={env_name}
                            placeholder="Environment Name"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setkey_name(e.target.value)}
                            name="key_name"
                            id="key_name"
                            value={key_name}
                            placeholder="Key Name"
                            required=""
                          />
                        </div>

                      </div>
                    </Form.Group>

                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            name="region"
                            id="region"
                            value={region}
                            onChange={(e) => setregion(e.target.value)}
                            placeholder="Region"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc_cidr(e.target.value)}
                            name="vpc_cidr"
                            id="vpc_cidr"
                            value={vpc_cidr}
                            placeholder="VPC CIDR"
                            required=""
                          />
                        </div>


                      </div>
                    </Form.Group>

                    <Form.Group>
                      <div className="row mt-2">

                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setaz_1(e.target.value)}
                            name="az_1"
                            id="az_1"
                            value={az_1}
                            placeholder="Availability Zone-1"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setaz_2(e.target.value)}
                            name="az_2"
                            id="az_2"
                            value={az_2}
                            placeholder="Availability Zone-2"
                            required=""
                          />
                        </div>

                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setpublic_subnet_cidr_1a(e.target.value)}
                            name="public_subnet_cidr_1a"
                            id="public_subnet_cidr_1a"
                            value={public_subnet_cidr_1a}
                            placeholder="Public Subnet CIDR-1A"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setpublic_subnet_cidr_1b(e.target.value)}
                            name="public_subnet_cidr_1b"
                            id="public_subnet_cidr_1b"
                            value={public_subnet_cidr_1b}
                            placeholder="Public Subnet CIDR-1B"
                            required=""
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setprivate_subnet_cidr_1a(e.target.value)}
                            name="private_subnet_cidr_1a"
                            id="private_subnet_cidr_1a"
                            value={private_subnet_cidr_1a}
                            placeholder="Application Subnet CIDR-1A"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setprivate_subnet_cidr_1b(e.target.value)}
                            name="private_subnet_cidr_1b"
                            id="private_subnet_cidr_1b"
                            value={private_subnet_cidr_1b}
                            placeholder="Application Subnet CIDR-1B"
                            required=""
                          />

                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setdbsubnet_cidr_1a(e.target.value)}
                            name="dbsubnet_cidr_1a"
                            id="dbsubnet_cidr_1a"
                            value={dbsubnet_cidr_1a}
                            placeholder="DB Subnet CIDR-1A"
                            required=""
                          />

                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setdbsubnet_cidr_1b(e.target.value)}
                            name="dbsubnet_cidr_1b"
                            id="dbsubnet_cidr_1b"
                            value={dbsubnet_cidr_1b}
                            placeholder="DB Subnet CIDR-1B"
                            required=""
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control type="text" onChange={(e) => setwebserver_ami(e.target.value)} name="webserver_ami" id="webserver_ami" value={webserver_ami} placeholder="Webserver AMI" required="" />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control type="text" onChange={(e) => setwebserver_instance_type(e.target.value)} name="webserver_instance_type" id="webserver_instance_type" value={webserver_instance_type} placeholder="Webserver Instance Type" required="" />
                        </div>

                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control type="text" onChange={(e) => setappserver_ami(e.target.value)} name="appserver_ami" id="appserver_ami" value={appserver_ami} placeholder="Appserver AMI" required="" />
                        </div>

                        <div className="col-6 col-6-xsmall">
                          <Form.Control type="text" onChange={(e) => setappserver_instance_type(e.target.value)} name="appserver_instance_type" id="appserver_instance_type" value={appserver_instance_type} placeholder="Appserver Instance Type" required="" />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div className="row mt-2">
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setdbserver_ami(e.target.value)}
                            name="dbserver_ami"
                            id="dbserver_ami"
                            value={dbserver_ami}
                            placeholder="DB Server AMI"
                            required=""
                          />
                        </div>
                        <div className="col-6 col-6-xsmall">
                          <Form.Control
                            type="text"
                            onChange={(e) => setdbserver_instance_type(e.target.value)}
                            name="dbserver_instance_type"
                            id="dbserver_instance_type"
                            value={dbserver_instance_type}
                            placeholder="DB Server Instance Type"
                            required=""
                          />
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


                </Card>
              </Form>
            </div>
            <br />


          </section>
        </div>

        <div className="description col-10 mt-8">
          <p> This Blueprint automates the provision of 3 tier Application Architecture with below components:
            <br />&#10148; VPC created with Public and Private Subnets in two Availability Zones but Resources are provisioned in one Availability Zone - 1 (AZ1) only .
            <br />&#10148; Web instances provisioned in Public Subnet (connected to Internet) in AZ1.
            <br />&#10148; Application instances provisioned in App Subnet (Private) in AZ1.
            <br />&#10148; Database instances provisioned in DB subnet (Private) in AZ1.


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
      //  "/var/www/html/cac/3tier_ap2_outputsbs.txt"
      /*
          var fs = require('fs');
          var filepath="/var/www/html/cac/3tier_ap2_outputsbs.txt";
          var file=fs.readFileSync(filepath);
          setoutput(file);
  
          fetch("/var/www/html/cac/3tier_ap2_outputsbs.txt")
         .then(response => console.log(response.text()))
        .then(data => {
    // Do something with your data
      console.log(data);
      });          
         
*/
      function rec() {
        axios
          .get(Api.ip + "runUseCase")
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
