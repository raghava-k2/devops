import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import graph from "../../../../images/rdsmysql.jpg";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";

export default function Ap5() {

  
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [access_key, setaccess_key] = useState(null);
  const [secret_key, setsecret_key] = useState(null);
  const [formState, setformState] = useState(0);

  const [env_name, setenv_name] = useState("");
  const [region, setregion] = useState("");
  const [key_name, setkey_name] = useState("");
  const [web_ami, setweb_ami] = useState("");
  const [webserver_instance_type, setwebserver_instance_type] = useState("");
  const [appserver_instance_type, setappserver_instance_type] = useState("");
  const [db_subnet_id, setdb_subnet_id] = useState("");
  const [private_subnet_id, setprivate_subnet_id] = useState("");
  const [public_subnet_id, setpublic_subnet_id] = useState("");
  const [web_security_group_ids, setweb_security_group_ids] = useState("");
  const [app_security_group_ids, setapp_security_group_ids] = useState("");
  const [db_security_group_ids, setdb_security_group_ids] = useState("");

  const [engine_version, setengine_version] = useState("");
  const [mysql_family, setmysql_family] = useState("");
  const [major_engine_version, setmajor_engine_version] = useState("");

  const [rds_instance_class, setrds_instance_class] = useState("");

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");


  const configList = {
    "providerName":"AWS",
    "usecaseType":"3-tier",
    "usecaseName":"ap5",
    "parameter":{
      "access_key": access_key,
      "secret_key": secret_key,
      "env_name ": env_name,
      "region": region,
      "key_name": key_name,
      "web_ami": web_ami,
      "engine_version": engine_version,
      "mysql_family": mysql_family,
      "webserver_instance_type": webserver_instance_type,
      "appserver_instance_type": appserver_instance_type,
      "major_engine_version": major_engine_version,
      "db_subnet_id": db_subnet_id,
      "private_subnet_id": private_subnet_id,
      "public_subnet_id": public_subnet_id,
      "web_security_group_ids": web_security_group_ids,
      "app_security_group_ids": app_security_group_ids,
      "db_security_group_ids": db_security_group_ids,
      "rds_instance_class": rds_instance_class
   }};


   const configList1 = {
    
    "Environment Name ": env_name,
    "Region": region,
    "Key Name": key_name,
    "Web AMI": web_ami,
    "Public Subnet ID": public_subnet_id,
    "App Subnet ID": private_subnet_id,
    "DB Subnet ID": db_subnet_id,
    "Webserver Instance Type": webserver_instance_type,
    "Appserver Instance Type": appserver_instance_type,
    "Web Security Group ID": web_security_group_ids,
    "App Security Group ID": app_security_group_ids,
    "DB Security Group ID": db_security_group_ids,
    "RDS Instance Class": rds_instance_class,
    "MySQL Family": mysql_family,
    "Engine Version": engine_version,
    "Major Engine Version": major_engine_version,
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
    setweb_ami("");
    setengine_version("");
    setmysql_family("");
    setwebserver_instance_type("");
    setappserver_instance_type("");
    setmajor_engine_version("");
    setdb_subnet_id("");
    setprivate_subnet_id("");
    setpublic_subnet_id("");
    setweb_security_group_ids("");
    setapp_security_group_ids("");
    setdb_security_group_ids("");
    setrds_instance_class("");
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
      engine_version,
      mysql_family,
      webserver_instance_type,
      appserver_instance_type,
      major_engine_version,
      db_subnet_id,
      private_subnet_id,
      public_subnet_id,
      web_security_group_ids,
      app_security_group_ids,
      db_security_group_ids,
      rds_instance_class
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
         <div> <h4 class="box1">LAMP 3-Tier Web Application - RDS (MySQL)</h4> </div>
          <Header1 />
        </div>
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />

        <section className="col-10 mx-auto">
          <div >
            <img src={graph} className="image float-end" alt="home img" />
          </div>
          <div>
            <Form className="main-form">
            <Card style={{border: 'none'}}> 
            
              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)' }}>
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
                      />
                    </span></OverlayTrigger>
                      
                    </div>
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >Region</Tooltip> } placement="right">
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
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >Key Name</Tooltip> } placement="left">
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
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >Web AMI</Tooltip> } placement="right">
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
                  </div>
                </Form.Group>

                

                

                <Form.Group>
                  <div className="row mt-2">
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="aws_region" >Public Subnet ID</Tooltip> } placement="left">
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

                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >App Subnet ID</Tooltip> } placement="right">
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
                      />
                    </span></OverlayTrigger>
                    
                      
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
                      />
                    </span></OverlayTrigger>
                      
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
                      />
                    </span></OverlayTrigger>
                      
                    </div>
                    
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" > Web Security Group ID</Tooltip> } placement="right">
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
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >App Security Group ID </Tooltip> } placement="left">
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
                    <div className="col-6 col-6-xsmall">
                    <OverlayTrigger overlay={<Tooltip id="aws_region" >DB Security Group ID</Tooltip> } placement="right">
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
                <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />

                <h6>RDS Details</h6>

                            <Form.Group>
                                <div className="row mt-2">
                                    <div className="col-6 col-6-xsmall">
                                    <OverlayTrigger overlay={<Tooltip id="aws_region" >RDS Instance Class</Tooltip> } placement="left">
                  <span>
                  <Form.Control 
                                        type="text" 
                                        onChange={(e) => setrds_instance_class(e.target.value)} 
                                        name="rds_instance_class" 
                                        id="rds_instance_class" 
                                        value={rds_instance_class} 
                                        placeholder="RDS Instance Class" 
                                        required="" 
                                        />
                    </span></OverlayTrigger>
                                       
                                    </div>
                                    <div className="col-6 col-6-xsmall">
                                    <OverlayTrigger overlay={<Tooltip id="aws_region" >MySQL family</Tooltip> } placement="right">
                  <span>
                  <Form.Control 
                    type="text" 
                    onChange={(e) => setmysql_family(e.target.value)} 
                    name="mysql_family" 
                    id="mysql_family" 
                    value={mysql_family} 
                    placeholder="MySQL family" 
                    required="" />
 
                    </span></OverlayTrigger>
                                    </div>

                                    
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <div className="row mt-2">
                                    
                                    <div className="col-6 col-6-xsmall">
                                    <OverlayTrigger overlay={<Tooltip id="aws_region" >Engine Version</Tooltip> } placement="left">
                  <span>
                  <Form.Control
                     type="text" 
                     onChange={(e) => setengine_version(e.target.value)} 
                     name="engine_version" 
                     id="engine_version" 
                     value={engine_version} 
                     placeholder="Engine Version" 
                     required="" />

                    </span></OverlayTrigger>
                                    </div>
                                    <div className="col-6 col-6-xsmall">
                                    <OverlayTrigger overlay={<Tooltip id="aws_region" >Major Engine Version</Tooltip> } placement="right">
                  <span>
                  <Form.Control 
                                        type="text" 
                                        onChange={(e) => setmajor_engine_version(e.target.value)} 
                                        name="major_engine_version" 
                                        id="major_engine_version" 
                                        value={major_engine_version} 
                                        placeholder="Major Engine Version" 
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
              
                            

                        </Card>
            </Form>
          </div>



        </section>
       </div>
       <div className="description col-10 mt-8">
      <p>This Blueprint automates the provision of 3 tier LAMP Stack Architecture in existing subnets. (LAMP stands for Linux, Apache, MySQL, and PHP. Together, they provide a proven set of software for delivering high-performance web applications.)
      <br/>&#10148;Web instance provisioned in existing Public Subnet (connected to Internet).
      <br/>&#10148;Application instance provisioned in existing App Subnet (Private).
      <br/>&#10148;RDS MySQL Database instance provisioned in existing DB Subnet (Private).
       
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
