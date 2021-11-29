import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";

import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
const { ip } = settings;

export default function Vpc4() {

  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [dropDownOptions, setDropDownOptions] = useState({});
  // VPC details
  const [VPC_ID1, setVPC_ID1] = useState("");
  const [cidr_vpc1, setcidr_vpc1] = useState("");
  const [peer_vpc_route_table, setpeer_vpc_route_table] = useState("");

  const [VPC_ID2, setVPC_ID2] = useState("");
  const [cidr_vpc2, setcidr_vpc2] = useState("");
  const [vpc_route_table, setvpc_route_table] = useState("");

  const [peering_connection_name, setpeering_connection_name] = useState("");



  const [formState, setformState] = useState(0);
  const [output, setoutput] = useState("");


  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "vpc4",


    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,

      "VPC_ID1": VPC_ID1,
      "cidr_vpc1": cidr_vpc1,
      "peer_vpc_route_table": peer_vpc_route_table,

      "VPC_ID2": VPC_ID2,
      "cidr_vpc2": cidr_vpc2,
      "vpc_route_table": vpc_route_table,

      "peering_connection_name": peering_connection_name,

    }
  };

  const configList1 = {
    "AWS Region": aws_region,

    "VPC ID1": VPC_ID1,
    "CIDR VPC1": cidr_vpc1,
    "Peer VPC Route Table": peer_vpc_route_table,

    "VPC ID2": VPC_ID2,
    "CIDR VPC2": cidr_vpc2,
    "VPC Route Table": vpc_route_table,

    "Peering Connection Name": peering_connection_name,

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
    setaws_region("");
    setcidr_vpc1("");
    setpeer_vpc_route_table("");
    setVPC_ID2("");
    setcidr_vpc2("");
    setvpc_route_table("");
    setpeering_connection_name("");

  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,

        VPC_ID1,
        cidr_vpc1,
        peer_vpc_route_table,

        VPC_ID2,
        cidr_vpc2,
        vpc_route_table,

        peering_connection_name
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


  const { addMessage } = useContext(ToasterContext);
  const getDropDownValues = (categoryName) => {
    return axios.get(`${ip}standardControl/${categoryName}`);
  };

  const getAllCategoryDropDownList = async (categories) => {
    const requestMap = categories.map((category) =>
      getDropDownValues(category)
    );
    try {
      const values = await Promise.allSettled(requestMap);
      const valueObject = values.reduce((acc, { value: { data } }, index) => {
        
          acc[categories[index]] = data.map((i) => ({
            ...i, ...{
              originalName: i.name,
              name: `${i.name} || ${i.value}`
            }
          }));
        
        return acc;
      }, {});
      setDropDownOptions((p) => ({ ...p, ...valueObject }));
    } catch (e) {
      addMessage({
        severity: "error",
        summary: "Cloud Standards",
        detail: `Error fetching the Cloud Standards`,
      });
    }
  };
  useEffect(() => {
    const categories = [
      STANDARD_CONTROL_CATEGORIES.VPC,
      STANDARD_CONTROL_CATEGORIES.REGION,
      STANDARD_CONTROL_CATEGORIES.SECURITY_GROUP,
      STANDARD_CONTROL_CATEGORIES.KEY_NAME,
      STANDARD_CONTROL_CATEGORIES.SNS_TOPIC_NAME,
      STANDARD_CONTROL_CATEGORIES.INSTANCE_SCHEDULE,
      STANDARD_CONTROL_CATEGORIES.BACKUP,
      STANDARD_CONTROL_CATEGORIES.EBS_VOLUME_TYPE,
      STANDARD_CONTROL_CATEGORIES.IAM_PROFILE,
      STANDARD_CONTROL_CATEGORIES.INSTANCE_TYPE,
      STANDARD_CONTROL_CATEGORIES.AMI,
      STANDARD_CONTROL_CATEGORIES.EC2_TAGS,
      STANDARD_CONTROL_CATEGORIES.BACKUP,
      STANDARD_CONTROL_CATEGORIES.INSTANCE_SCHEDULE,
      STANDARD_CONTROL_CATEGORIES.AZ,
    ];
    getAllCategoryDropDownList(categories);
  }, []);
  if (formState === 0) {
    return (
      <>
        <div>

          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">AWS VPC Peering</h4> </div>

            {/* <div> <h4 class="box1">Standalone VPC with Public and Private Subnets Creation</h4> </div> */}

            <Header1 />
          </div>
          <hr style={{ backgroundColor: "black", opacity: .1 }} />

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
                        <Dropdown
                              optionLabel="name"
                              onChange={(e) => setaws_region(e.target.value)}
                              options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || []}
                              value={aws_region}
                              placeholder="Select AWS Region"
                            /></span></OverlayTrigger>
                    </div>



                  </div>
                </Form.Group>
                <hr style={{ backgroundColor: "black", opacity: .1 }} />
                <h6>Peering Connection Name</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="peering_connection_name">Peering Connection Name</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setpeering_connection_name(e.target.value)}
                            name="peering_connection_name "
                            id="peering_connection_name "
                            value={peering_connection_name}
                            placeholder="Peering Connection Name"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>
                <hr style={{ backgroundColor: "black", opacity: .1 }} />
                <h6>Requester VPC</h6>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="VPC_ID1">VPC ID</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setVPC_ID1(e.target.value)}
                            name="VPC_ID1 "
                            id="VPC_ID1 "
                            value={VPC_ID1}
                            placeholder="VPC ID"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="cidr_vpc1">CIDR</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setcidr_vpc1(e.target.value)}
                            name="cidr_vpc1"
                            id="cidr_vpc1 "
                            value={cidr_vpc1}
                            placeholder="CIDR"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="peer_vpc_route_table">Route Table</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setpeer_vpc_route_table(e.target.value)}
                            name="peer_vpc_route_table "
                            id="peer_vpc_route_table "
                            value={peer_vpc_route_table}
                            placeholder="Route Table"
                            required=""
                          /></span></OverlayTrigger>
                    </div>



                  </div>
                </Form.Group>
                <hr style={{ backgroundColor: "black", opacity: .1 }} />

                <h6>Accepter VPC</h6>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="VPC_ID2">VPC ID</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setVPC_ID2(e.target.value)}
                            name="VPC_ID2 "
                            id="VPC_ID2 "
                            value={VPC_ID2}
                            placeholder="VPC ID"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="cidr_vpc2">CIDR</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setcidr_vpc2(e.target.value)}
                            name="cidr_vpc2 "
                            id="cidr_vpc2 "
                            value={cidr_vpc2}
                            placeholder="CIDR"
                            required=""
                          /></span></OverlayTrigger>
                    </div>



                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="vpc_route_table">Route Table</Tooltip>} placement="right">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc_route_table(e.target.value)}
                            name="vpc_route_table "
                            id="vpc_route_table "
                            value={vpc_route_table}
                            placeholder="Route Table"
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

        
        <div className="description col-10 mt-8">
          <p>
             This template will create one VPC Peering Connection between two VPCs provided as input,
             It will also update the Route Table Entries for the provided Route Table as input to allow the peering connection traffic.
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

      // function rec() {
      //   axios
      //     .get(Api.ip + "Vpc4")
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
