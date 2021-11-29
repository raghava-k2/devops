import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Chips } from 'primereact/chips';
import { Review } from "../../../../components/Review/Review";
import { getUser } from "../../../../hooks/useFindUser"
import useNavBar from "../../../../hooks/useNavBar";
import { Dialog } from 'primereact/dialog';
import { AwsCloud, AzureCloud } from "../../../../components/user/settings/cloudConnections/CloudConnections";
import { ToasterContext } from "../../../../components/common/Context";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";


export default function Vpc7() {

  // Account details
  const [navBar] = useNavBar();
  const user = getUser()
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null)

  // VPC details
  const [vpc1, setvpc1] = useState("");
  const [vpc2, setvpc2] = useState("");

  const [vpc1_subnet_ids, setvpc1_subnet_ids] = useState([]);
  const [vpc2_subnet_ids, setvpc2_subnet_ids] = useState([]);

  const [vpc1_route_table_id, setvpc1_route_table_id] = useState("");
  const [vpc2_route_table_id, setvpc2_route_table_id] = useState("");



  // Subnets and its components Details

  const [destination_cidr_block1, setdestination_cidr_block1] = useState("");
  const [destination_cidr_block2, setdestination_cidr_block2] = useState("");



  const [formState, setformState] = useState(0);
  const { addMessage } = useContext(ToasterContext);
  const cloudConnection = {};
  let formGroupData = null;

  useEffect(() => {
    const { cloudId } = navBar;
    const { userId } = user;
    axios
      .get(Api.ip + `connectionInfo/${userId}/${cloudId}`)
      .then((response) => {
        const { accessKey, secretKey, accountCode } = response.data
        setaws_secret_key(secretKey)
        setaws_access_key(accessKey)
        setaccountId(accountCode)

        console.log(accessKey, secretKey, accountCode);
      }).then((err) => {
        console.log(err);
      });
  }, [])

  const [output, setoutput] = useState("");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "vpc7",


    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,

      "vpc1": vpc1,
      "vpc2": vpc2,
      "vpc1_subnet_ids": vpc1_subnet_ids,
      "vpc2_subnet_ids": vpc2_subnet_ids,
      "vpc1_route_table_id": vpc1_route_table_id,
      "vpc2_route_table_id": vpc2_route_table_id,

      "destination_cidr_block1": destination_cidr_block1,
      "destination_cidr_block2": destination_cidr_block2,

    }
  };





  const configList1 = {
    "AWS Region": aws_region,

    "VPC-1": vpc1,
    "VPC-2": vpc2,
    "VPC-1 Subnet IDs": vpc1_subnet_ids,
    "VPC-2 Subnet IDs": vpc2_subnet_ids,
    "VPC-1 Route Table ID": vpc1_route_table_id,
    "VPC-2 Route Table ID": vpc2_route_table_id,

    "Destination CIDR Block-1": destination_cidr_block1,
    "Destination CIDR Block-2": destination_cidr_block2



  };


  const clearInputField = () => {
    setaws_region("");

    setvpc1("");
    setvpc2("");
    setvpc1_subnet_ids("");
    setvpc2_subnet_ids("");
    setvpc1_route_table_id("");
    setvpc2_route_table_id("");

    setdestination_cidr_block1("");
    setdestination_cidr_block2("");


  };

  const setConnectionPopup=(e)=>{
    setShowCloudConnectionPopup(e)
  }

  const setCredentials=(list)=>{
    setaws_access_key(list.accessKey)
    setaws_secret_key(list.secretKey)
    console.log(list);
  }



  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,

        vpc1,
        vpc2,
        vpc1_subnet_ids,
        vpc2_subnet_ids,
        vpc1_route_table_id,
        vpc2_route_table_id,

        destination_cidr_block1,
        destination_cidr_block2,

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
    } else {
      setShowCloudConnectionPopup(true);
    }
  }

  const setformIndex = (e) => {
    setformState(e)
  }

  const formGroup = (fromGroup) => {
    formGroupData = fromGroup;
  }

  const saveCloudProviderDetails = () => {
    const { form, validate } = formGroupData;
    const validation = validate();
    if (validation) {
      const { field, message } = validation;
      addMessage({ severity: 'error', summary: field, detail: message, sticky: true });
    } else {
      const { accessKey, secretKey, accountCode } = form;
      setaws_secret_key(secretKey)
      setaws_access_key(accessKey)
      setaccountId(accountCode)
      setShowCloudConnectionPopup(false);
    }
  }

  const Footer = () => {
    return (
      <div>
        <Button style={{ marginRight: "16px" }} onClick={() => setShowCloudConnectionPopup(false)}
          className="Primary">Cancel</Button>
        <Button onClick={saveCloudProviderDetails}
          className="Primary">Save</Button>
      </div>
    );
  }




  if (formState === 0) {
    return (
      <>
        <div>

          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">VPC Transit Gateway</h4> </div>

            {/* <div> <h4 class="box1">Standalone VPC with Public and Private Subnets Creation</h4> </div> */}

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
          </div> */}

            <div><Form className="main-form ">


              <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)" }}>
                <h6>AWS Details</h6>

                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="aws_region">AWS Region</Tooltip>} placement="left">
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

                <h6>VPC Details</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc1">VPC-1</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc1(e.target.value)}
                            name="vpc1"
                            id="vpc1"
                            value={vpc1}
                            placeholder="VPC-1"
                            required=""
                          /></span></OverlayTrigger>
                    </div>


                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc2">VPC-2</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc2(e.target.value)}
                            name="vpc2"
                            id="vpc2"
                            value={vpc2}
                            placeholder="VPC-2"
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

                <h6>Subnet Details</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc1_subnet_ids">VPC-1 Subnet IDs</Tooltip>} placement="left">
                        <span>
                          <Chips
                            type="text"
                            onChange={(e) => setvpc1_subnet_ids(e.value)}
                            name="vpc1_subnet_ids"
                            id="vpc1_subnet_ids"
                            value={vpc1_subnet_ids}
                            placeholder="VPC-1 Subnet IDs"
                            required=""
                            separator=","
                            allowDuplicate={false}
                          >
                          </Chips>
                        </span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc2_subnet_ids">VPC-2 Subnet IDs</Tooltip>} placement="right">
                        <span>
                          <Chips
                            type="text"
                            onChange={(e) => setvpc2_subnet_ids(e.value)}
                            name="vpc2_subnet_ids"
                            id="vpc2_subnet_ids"
                            value={vpc2_subnet_ids}
                            placeholder="VPC-2 Subnet IDs"
                            required=""
                            separator=","
                            allowDuplicate={false}
                          >
                          </Chips>
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

                <h6>Route Table Details</h6>
                
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc1_route_table_id">VPC-1 Route Table ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc1_route_table_id(e.target.value)}
                            name="vpc1_route_table_id"
                            id="vpc1_route_table_id"
                            value={vpc1_route_table_id}
                            placeholder="VPC-1 Route Table ID"
                            required=""
                          />
                        </span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc2_route_table_id">VPC-2 Route Table ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc2_route_table_id(e.target.value)}
                            name="vpc2_route_table_id"
                            id="vpc2_route_table_id"
                            value={vpc2_route_table_id}
                            placeholder="VPC-2 Route Table ID"
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

                <h6>CIDR Details</h6>

                <Form.Group>
                  <div className="row mt-2">

                  <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="destination_cidr_block1">Destination CIDR Block-1</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdestination_cidr_block1(e.target.value)}
                            name="destination_cidr_block1"
                            id="destination_cidr_block1"
                            value={destination_cidr_block1}
                            placeholder="Destination CIDR Block-1"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="destination_cidr_block2">Destination CIDR Block-2</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setdestination_cidr_block2(e.target.value)}
                            name="destination_cidr_block2"
                            id="destination_cidr_block2"
                            value={destination_cidr_block2}
                            placeholder="Destination CIDR Block-2"
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
        <Dialog header="Cloud Connection" visible={showCloudConnectionPopup} maximizable modal
          style={{ width: '50vw' }}
          footer={Footer}
          onHide={() => setShowCloudConnectionPopup(false)}>
          <div className="p-fluid p-formgrid p-grid cac-form">
            {(navBar?.cloudId === 1) &&
              <AwsCloud formGroup={formGroup} cloudConnection={cloudConnection}></AwsCloud>
            }
          </div>
        </Dialog>
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
      // function rec() {
      //   axios
      //     .get(Api.ip + "Vpc7")
      //     .then((response) => setoutput(response.data));
      //   setTimeout(rec, 3000);
      // }
      // rec();


      return (
        <>
          <Output output={output} />
        </>
      );
    }
  }
}
