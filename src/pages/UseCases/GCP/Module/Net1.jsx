import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Chips } from 'primereact/chips';
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import lodash from 'lodash';

export default function Net1() {


    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
    const [gcpCred, setgcpCred] = useState(null)


    const [subnet_flow_logs, setsubnet_flow_logs] = useState("");
    const [description, setdescription] = useState("");
    const [subnet_private_access, setsubnet_private_access] = useState("");

    // Account details
    const [network_name, setnetwork_name] = useState("");
    const [project_id, setproject_id] = useState("");
    const [routing_mode, setrouting_mode] = useState("");

    const [subnet_name, setsubnet_name] = useState("");
    const [subnet_ip, setsubnet_ip] = useState("");
    const [subnet_region, setsubnet_region] = useState("");

    const [formState, setformState] = useState(0)
    const [output, setoutput] = useState("");

    const { exec } = require("child_process");


    const configList = {
        "providerName": "GCP",
        "usecaseType": "Module",
        "usecaseName": "Net1",
        "gcpCred": gcpCred,
        "parameter": {

            "network_name": network_name,
            "project_id": project_id,
            "routing_mode": routing_mode,

            "subnets": [
                {
                    "subnet_flow_logs": "true",
                    "subnet_name": subnet_name,
                    "subnet_ip": subnet_ip,
                    "subnet_region": subnet_region,
                    "description": "Management Subnet of non-prod host project",
                    "subnet_private_access": "true"
                }
            ]

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

        "Network Name": network_name,
        "Routing Mode": routing_mode,

        "Subnet Name": subnet_name,
        "Subnet IP": subnet_ip,
        "Subnet Region": subnet_region,
        // "Subnet Flow Logs": subnet_flow_logs,
        // "Description": description,
        // "Subnet Private Access": subnet_private_access,

    };


    const setConnectionPopup = (e) => {
        setShowCloudConnectionPopup(e)
    }

    const setCredentials = (list) => {
        setproject_id(list ? JSON.parse(list)['project_id'] : '');
        setgcpCred(list);
    }

    const clearInputField = () => {
        network_name("");
        project_id("");
        routing_mode("");

        subnet_name("");
        subnet_ip("");
        subnet_region("");


    };

    const reviewList = (e) => {
        e.preventDefault();

        if (gcpCred) {
            const values = [
                network_name,
                routing_mode,
                subnet_name,
                subnet_ip,
                subnet_region,
                // subnet_flow_logs,
                // description,
                // subnet_private_access,

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
                        <div> <h4 class="box1">Module - Network VCP</h4> </div>
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

                            <Card style={{ padding: '10px', margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)' }}>
                                <h6>Network Details</h6>

                                <Form.Group>
                                    <div className="row mt-2">
                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="network_name" >Network Name</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setnetwork_name(e.target.value)}
                                                        name="network_name"
                                                        id="network_name"
                                                        value={network_name}
                                                        placeholder="Network Name"
                                                        required=""
                                                    />

                                                </span></OverlayTrigger>
                                        </div>


                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="routing_mode" >Routing Mode</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setrouting_mode(e.target.value)}
                                                        name="routing_mode"
                                                        id="routing_mode"
                                                        value={routing_mode}
                                                        placeholder="Routing Mode"
                                                        required=""
                                                    />

                                                    {/* <span className="span_hint_details">
                                                    The network routing mode.
                                                    </span> */}
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

                                <h6>Subnet Details</h6>

                                <Form.Group>
                                    <div className="row mt-2">
                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="subnet_name" >Subnet Name</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setsubnet_name(e.target.value)}
                                                        name="subnet_name"
                                                        id="subnet_name"
                                                        value={subnet_name}
                                                        placeholder="Subnet Name"
                                                        required=""

                                                    />

                                                </span></OverlayTrigger>
                                        </div>
                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="subnet_ip" >Subnet IP</Tooltip>} placement="right">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setsubnet_ip(e.target.value)}
                                                        name="subnet_ip"
                                                        id="subnet_ip"
                                                        value={subnet_ip}
                                                        placeholder="Subnet IP"
                                                        required=""
                                                    />
                                                </span></OverlayTrigger>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group>
                                    <div className="row mt-2">
                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="subnet_region" >Subnet Region</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setsubnet_region(e.target.value)}
                                                        name="subnet_region"
                                                        id="subnet_region"
                                                        value={subnet_region}
                                                        placeholder="Subnet Region"
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
                        This modules makes it easy to set up a new VPC Network in GCP by defining your network and subnet ranges in a concise syntax.

                        <br/><br/>It supports creating:<br/>

                        1. A Google Virtual Private Network (VPC)<br/>
                        2. Subnets within the VPC.<br/>
                        
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
            //     axios
            //         .get(Api.ip + "runUseCase")
            //         .then((response) => setoutput(response.data));
            //     setTimeout(rec, 3000);
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
