import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import graph from "../../../../images/ap2.jpg";
import Header1 from "../../../../Header1";


export default function Ap4() {
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [access_key, setaccess_key] = useState(null);
  const [secret_key, setsecret_key] = useState(null);
  const [formState, setformState] = useState(0);
  const [env_name, setenv_name] = useState("");
  const [region, setregion] = useState("");
  const [key_name, setkey_name] = useState("");
  const [web_ami, setweb_ami] = useState("");
  const [app_ami, setapp_ami] = useState("");
  const [db_ami, setdb_ami] = useState("");
  const [webserver_instance_type, setwebserver_instance_type] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [dbserver_instance_type, setdbserver_instance_type] = useState("");
  const [db_subnet_id, setdb_subnet_id] = useState("");
  const [private_subnet_id, setprivate_subnet_id] = useState("");
  const [public_subnet_id, setpublic_subnet_id] = useState("");
  const [web_security_group_ids, setweb_security_group_ids] = useState("");
  const [app_security_group_ids, setapp_security_group_ids] = useState("");
  const [db_security_group_ids, setdb_security_group_ids] = useState("");
  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);



  // const  {exec} = require("child_process");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "3-tier",
    "usecaseName": "ap4",
    "parameter": {
      "access_key": access_key,
      "secret_key": secret_key,
      "env_name ": env_name,
      "region": region,
      "key_name": key_name,
      "web_ami": web_ami,
      "app_ami": app_ami,
      "db_ami": db_ami,
      "webserver_instance_type": webserver_instance_type,
      "appserver_instance_type": appserver_instance_type,
      "dbserver_instance_type": dbserver_instance_type,
      "db_subnet_id": db_subnet_id,
      "private_subnet_id": private_subnet_id,
      "public_subnet_id": public_subnet_id,
      "web_security_group_ids": web_security_group_ids,
      "app_security_group_ids": app_security_group_ids,
      "db_security_group_ids": db_security_group_ids,
    }
  };
  const configList1 = {

    "Environment Name ": env_name,
    "Region": region,
    "Key Name": key_name,
    "Public Subnet Id": public_subnet_id,
    "App Subnet Id": private_subnet_id,
    "DB Subnet Id": db_subnet_id,
    "Web AMI": web_ami,
    "App AMI": app_ami,
    "DB AMI": db_ami,
    "Webserver Instance Type": webserver_instance_type,
    "Appserver Instance Type": appserver_instance_type,
    "DB Server Instance Type": dbserver_instance_type,
    "Web Security Group ID": web_security_group_ids,
    "App Security Group ID": app_security_group_ids,
    "DB Security Group ID": db_security_group_ids
  };
  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e)
  }

  const setCredentials = (list) => {
    setaccess_key(list.accessKey)
    setsecret_key(list.secretKey)
    // setaccountId(list.accountCode)
    console.log(list);
  }
  const clearInputField = () => {
    // setaccess_key("");
    // setsecret_key("");
    setenv_name("");
    setregion("");
    setkey_name("");
    setweb_ami("");
    setapp_ami("");
    setdb_ami("");
    setwebserver_instance_type("");
    setappserver_instance_type("");
    setdbserver_instance_type("");
    setdb_subnet_id("");
    setprivate_subnet_id("");
    setpublic_subnet_id("");
    setweb_security_group_ids("");
    setapp_security_group_ids("");
    setdb_security_group_ids("");
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
        web_ami,
        app_ami,
        db_ami,
        webserver_instance_type,
        appserver_instance_type,
        dbserver_instance_type,
        db_subnet_id,
        private_subnet_id,
        public_subnet_id,
        web_security_group_ids,
        app_security_group_ids,
        db_security_group_ids,
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
    window.scrollTo(0, 100)
  };

  const setformIndex = (e) => {
    setformState(e)
  }
  if (formState === 0) {
    return (
      <>
        <div>




          <h4 className="text-center">3-Tier Web Application - EC2 DB</h4>
          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">3-Tier Web Application - EC2 DB</h4> </div>
            <Header1 />
          </div><hr style={{ backgroundColor: "black", opacity: .1 }} />
          <section className="col-10  mx-auto">
            <div classname="inputfield">
              <img src={graph} className="image float-end" alt="home img" />
            </div>

            <Form className="main-form ">

              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)' }}>
                <h6>Application Details</h6>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Environment Name</Tooltip>} placement="left">
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
                        </span></OverlayTrigger>

                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Region</Tooltip>} placement="right">
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

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Key Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setkey_name(e.target.value)}
                            name="key_name"
                            id="key_name"
                            value={key_name}
                            placeholder="Key Name"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>

                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Public Subnet ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setpublic_subnet_id(e.target.value)}
                            name="public_subnet_id"
                            id="public_subnet_id"
                            value={public_subnet_id}
                            placeholder="Public Subnet ID"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >App Subnet ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setprivate_subnet_id(e.target.value)}
                            name="private_subnet_id"
                            id="private_subnet_id"
                            value={private_subnet_id}
                            placeholder="App Subnet ID"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Subnet ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdb_subnet_id(e.target.value)}
                            name="db_subnet_id"
                            id="db_subnet_id"
                            value={db_subnet_id}
                            placeholder="DB Subnet ID"
                            required=""
                          />
                        </span></OverlayTrigger>



                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Web AMI</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setweb_ami(e.target.value)}
                            name="web_ami"
                            id="web_ami"
                            value={web_ami}
                            placeholder="Web AMI"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >App AMI</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setapp_ami(e.target.value)}
                            name="app_ami"
                            id="app_ami"
                            value={app_ami}
                            placeholder="App AMI"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB AMI</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdb_ami(e.target.value)}
                            name="db_ami"
                            id="db_ami"
                            value={db_ami}
                            placeholder="DB AMI"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Webserver Instance Type</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setwebserver_instance_type(e.target.value)}
                            name="webserver_instance_type"
                            id="webserver_instance_type"
                            value={webserver_instance_type}
                            placeholder="Webserver Instance Type"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">

                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Appserver Instance Type</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setappserver_instance_type(e.target.value)}
                            name="appserver_instance_type"
                            id="appserver_instance_type"
                            value={appserver_instance_type}
                            placeholder="Appserver Instance Type"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Server Instance Type</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdbserver_instance_type(e.target.value)}
                            name="dbserver_instance_type"
                            id="dbserver_instance_type"
                            value={dbserver_instance_type}
                            placeholder="DB Server Instance Type"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>

                  </div>
                </Form.Group>



                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >Web Security Group ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setweb_security_group_ids(e.target.value)}
                            name="web_security_group_ids"
                            id="web_security_group_ids"
                            value={web_security_group_ids}
                            placeholder="Web Security Group ID"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >App Security Group ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setapp_security_group_ids(e.target.value)}
                            name="app_security_group_ids"
                            id="app_security_group_ids"
                            value={app_security_group_ids}
                            placeholder="App Security Group ID"
                            required=""
                          />
                        </span></OverlayTrigger>


                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="inputfield">
                      <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Security Group ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdb_security_group_ids(e.target.value)}
                            name="db_security_group_ids"
                            id="db_security_group_ids"
                            value={db_security_group_ids}
                            placeholder="DB Security Group ID"
                            required=""
                          />
                        </span></OverlayTrigger>


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
        <div className="description col-10 mt-8">
          <p> This Blueprint automates the provision of 3 tier Application Architecture in existing subnets  with below components:
            <br />&#10148; Web  instance provisioned in existing Public Subnet (connected to Internet)
            <br />&#10148;  Application instance provisioned in existing App Subnet (Private).
            <br />&#10148;	EC2 Database instance provisioned in existing DB Subnet (Private).
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
