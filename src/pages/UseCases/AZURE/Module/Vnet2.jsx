import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

import Header from "../../../../Header";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Api from "../../../../settings.json";
import Output from "../../../../components/Output";
import Output_header from "../../../../components/Output_header";
import Review_header from "../../../../components/Review_header";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { Chips } from "primereact/chips";

import profile from "../../../../profile.json";
export default function Vnet2() {
  const [subscriptionid, setsubscriptionid] = useState(profile.subscriptionid);
  const [client_id, setclient_id] = useState(profile.client_id);
  const [client_secret, setclient_secret] = useState(profile.client_secret);
  const [tenant_id, settenant_id] = useState(profile.tenant_id);

  const [resource_group_name, setresource_group_name] = useState("");
  const [resource_group_location, setresource_group_location] = useState("");
  const [vnet_name, setvnet_name] = useState("");

  const [vnet_address_space, setvnet_address_space] = useState([]);

  const [Public_Subnet_Names, setPublic_Subnet_Names] = useState([]);
  const [Public_Subnet_Prefixes, setPublic_Subnet_Prefixes] = useState([]);
  const [Private_Subnet_Names, setPrivate_Subnet_Names] = useState([]);
  const [Private_Subnet_Prefixes, setPrivate_Subnet_Prefixes] = useState([]);

  const [output, setoutput] = useState("");
  const [formState, setformState] = useState(0);

  // const  {exec} = require("child_process");

  const configList = {
    providerName: "AZURE",
    usecaseType: "Module",
    usecaseName: "Vnet2",
    parameter: {
      subscriptionid: subscriptionid,
      client_id: client_id,
      client_secret: client_secret,
      tenant_id: tenant_id,
      resource_group_name: resource_group_name,
      resource_group_location: resource_group_location,
      vnet_name: vnet_name,
      vnet_address_space: vnet_address_space,
      Public_Subnet_Names: Public_Subnet_Names,
      Public_Subnet_Prefixes: Public_Subnet_Prefixes,
      Private_Subnet_Names: Private_Subnet_Names,
      Private_Subnet_Prefixes: Private_Subnet_Prefixes,
    },
  };

  const configList1 = {
    "Resource Group Name": resource_group_name,
    "Resource Group Location": resource_group_location,
    "Vnet Name": vnet_name,
    "Vnet Address Space": vnet_address_space,
    "Public Subnet Names": Public_Subnet_Names,
    "Public Subnet Prefixes": Public_Subnet_Prefixes,
    "Private Subnet Names": Private_Subnet_Names,
    "private Subnet Prefixes": Private_Subnet_Prefixes,
  };

  const clearInputField = () => {
    setresource_group_name("");
    setresource_group_location("");
    setvnet_name("");
    setvnet_address_space("");
    setPublic_Subnet_Names("");
    setPublic_Subnet_Prefixes("");
    setPrivate_Subnet_Names("");
    setPrivate_Subnet_Prefixes("");
  };
  const reviewList = (e) => {
    e.preventDefault();
    const values = [
      resource_group_name,
      resource_group_location,
      vnet_name,
      Public_Subnet_Names,
      Public_Subnet_Prefixes,
      Private_Subnet_Names,
      Private_Subnet_Prefixes,
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
    setformState(e);
  };

  if (formState === 0) {
    return (
      <>
        <div>
          <div class="clearfix">
            <div class="box3"></div>
            <div>
              {" "}
              <h4 class="box1">Module - Vnet Creation With Public And Private Subnet</h4>{" "}
            </div>
            <Header1 />
          </div>
          <hr
            style={{
              backgroundColor: "black",
              opacity: 0.1,
            }}
          />

          <section classname="col-10 mx-auto">
            <div>
              <Form className="main-form">
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
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="resource_group_name">
                              Resource Group Name
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setresource_group_name(e.target.value)
                              }
                              name="resource_group_name"
                              id="resource_group_name"
                              value={resource_group_name}
                              placeholder="Resource Group Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="resource_group_location">
                              Resource Group Location
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setresource_group_location(e.target.value)
                              }
                              name="resource_group_location"
                              id="resource_group_location"
                              value={resource_group_location}
                              placeholder="Resource Group Location"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="vnet_name">Vnet Name</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setvnet_name(e.target.value)}
                              name="vnet_name"
                              id="vnet_name"
                              value={vnet_name}
                              placeholder="Vnet Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="vnet_address_space">
                              Vnet Address Space
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setvnet_address_space(e.value)}
                              name="vnet_address_space "
                              id="vnet_address_space "
                              value={vnet_address_space}
                              placeholder="Vnet Address Space"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />
                  <h6 style={{color:'orange'}}>*multiple subnet prefixes can be added.</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="Public_Subnet_Names">Public Subnet Names</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setPublic_Subnet_Names(e.value)}
                              name="Public_Subnet_Names "
                              id="Public_Subnet_Names "
                              value={Public_Subnet_Names}
                              placeholder="Public Subnet Names"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="Public_Subnet_Prefixes">
                              Public Subnet Prefixes
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setPublic_Subnet_Prefixes(e.value)}
                              name="Public_Subnet_Prefixes "
                              id="Public_Subnet_Prefixes "
                              value={Public_Subnet_Prefixes}
                              placeholder="Public Subnet Prefixes"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="Private_Subnet_Names">Private Subnet Names</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setPrivate_Subnet_Names(e.value)}
                              name="Private_Subnet_Names "
                              id="Private_Subnet_Names "
                              value={Private_Subnet_Names}
                              placeholder="Private Subnet Names"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="Private_Subnet_Prefixes">
                              Private Subnet Prefixes
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setPrivate_Subnet_Prefixes(e.value)}
                              name="Private_Subnet_Prefixes "
                              id="Private_Subnet_Prefixes "
                              value={Private_Subnet_Prefixes}
                              placeholder="Private Subnet Prefixes"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Form.Group>

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
            </div>
            <br />
          </section>
        </div>
        <div className="description col-10 mt-8">
        <p>&#10148; This template will create one resource group. 
        <br/> &#10148; Next, it will create virtual network in that resource group. 
        <br/> &#10148; Next, it will create subnets as per user requirement.
        
          
        </p>
    </div>
      </>
    );
  } else {
    if (formState === 1)
      return (
        <>
          <Review
            configList1={configList1}
            configList={configList}
            setformIndex={setformIndex}
          />
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
