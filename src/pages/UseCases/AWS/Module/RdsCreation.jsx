import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import profile from "../../../../profile.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Chips } from "primereact/chips";
import { Review } from "../../../../components/Review/Review";
import { Dropdown } from "primereact/dropdown";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
const { ip } = settings;

export default function RdsCreation() {
  // Account details
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null)

  const [allocated_storage, setallocated_storage] = useState("");
  const [db_engine, setdb_engine] = useState("");
  const [db_engine_version, setdb_engine_version] = useState("");
  const [instance_class, setinstance_class] = useState("");
  const [db_name, setdb_name] = useState("");
  const [db_instance_identifier, setdb_instance_identifier] = useState("");
  const [db_username, setdb_username] = useState("");
  const [db_password, setdb_password] = useState("");
  const [db_subnetgroupname, setdb_subnetgroupname] = useState("");
  const [db_port, setdb_port] = useState("");
  const [vpc_security_group_ids, setvpc_security_group_ids] = useState("");

  const [formState, setformState] = useState(0);

  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);
  const [dropDownOptions, setDropDownOptions] = useState({});
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
        summary: "Enterprise Standards & Controls",
        detail: `Error fetching the Enterprise Standards & Controls`,
      });
    }
  };

  useEffect(() => {
    const categories = [
      STANDARD_CONTROL_CATEGORIES.REGION,
    ];
    getAllCategoryDropDownList(categories);
  }, []);

  const configList = {
    providerName: "AWS",
    usecaseType: "Module",
    usecaseName: "RdsCreation",

    parameter: {
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "aws_region": aws_region,

      "allocated_storage": allocated_storage,
      "db_engine": db_engine,
      "db_engine_version": db_engine_version,
      "instance_class": instance_class,

      "db_name": db_name,
      "db_instance_identifier": db_instance_identifier,
      "db_username": db_username,
      "db_password": db_password,
      "db_subnetgroupname": db_subnetgroupname,
      "db_port": db_port,
      "vpc_security_group_ids": [vpc_security_group_ids],
    },
  };

  const configList1 = {
    "Region": aws_region,
    "Engine Type": db_engine,
    "Engine Version": db_engine_version,
    "DB Username": db_username,
    "DB Password": "*********",
    "DB Instance Class": instance_class,
    "DB Insatnace Name": db_instance_identifier,
    "Allocated Storage": allocated_storage,
    "Subnet Group Name": db_subnetgroupname,
    "VPC Security Group IDs": vpc_security_group_ids,
    "DB Port": db_port,
    "DB Name": db_name,
  };

  const clearInputField = () => {
    setaws_region("");
    setdb_engine("");
    setdb_engine_version("");
    setinstance_class("");
    setdb_instance_identifier("");
    setallocated_storage("");
    setdb_subnetgroupname("");
    setvpc_security_group_ids("");
    setdb_port("");
    setdb_name("");
    setdb_username("");
    setdb_password("");
  };

  const setConnectionPopup = (e) => {
    setShowCloudConnectionPopup(e)
  }

  const setCredentials = (list) => {
    setaws_access_key(list.accessKey)
    setaws_secret_key(list.secretKey)
    setaccountId(list.accountCode)
    console.log(list);
  }
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        db_engine,
        db_engine_version,
        instance_class,
        db_instance_identifier,
        allocated_storage,
        db_subnetgroupname,
        vpc_security_group_ids,
        db_port,
        db_name,
        db_username,
        db_password,
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
    setformState(e);
  };
  const selectEngine = [
    { label: "Aurora", value: "aurora" },
    { label: "Aurora with MySQL compatibility", value: "aurora-mysql" },
    {
      label: "Aurora with PostgreSQL compatibility",
      value: "aurora-postgresql",
    },
    { label: "MySQL", value: "mysql" },
    { label: "MariaDB", value: "mariadb" },
    { label: "PostgreSQL", value: "postgres" },
    { label: "Oracle", value: "oracle-ee" },
    { label: "Microsoft SQL Server", value: "sqlserver-se" },
  ];

  if (formState === 0) {
    return (
      <>
        <div>
          <div class="clearfix">
            <div class="box3"></div>
            <div>
              {" "}
              <h4 class="box1">
                RDS(Relational Database Service) Creation
              </h4>{" "}
            </div>

            <Header1 />
          </div>
          <hr
            style={{
              backgroundColor: "black",
              opacity: 0.1,
            }}
          />

          <section className="col-10 mx-auto">
            {/* <div>
            <img src={graph} className="image float-end" alt="home img" />
          </div> */}

            <div>
              <Form className="main-form ">
                <Card
                  style={{
                    padding: "10px",
                    margin: "10px",
                    width: "auto",
                    boxShadow: "0 8px 12px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  <h6>AWS Region</h6>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="aws_region">AWS Region</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Dropdown
                              optionLabel="name"
                              onChange={(e) => setaws_region(e.target.value)}
                              options={dropDownOptions[STANDARD_CONTROL_CATEGORIES.REGION] || []}
                              value={aws_region}
                              placeholder="Select AWS Region"
                            />
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

                  <h6>Engine Options</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="db_engine">DB Engine</Tooltip>}
                          placement="left"
                        >
                          <Dropdown
                            value={db_engine}
                            options={selectEngine}
                            onChange={(e) => setdb_engine(e.value)}
                            placeholder="Select an Engine"
                          />
                          {/* <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setdb_engine(e.target.value)}
                              name="db_engine "
                              id="db_engine "
                              value={db_engine}
                              placeholder="DB Engine"
                              required=""
                            />
                          </span> */}
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="db_engine_version">DB Version</Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setdb_engine_version(e.target.value)
                              }
                              name="db_engine_version "
                              id="db_engine_version "
                              value={db_engine_version}
                              placeholder="DB Version"
                              required=""
                            />
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

                  <h6>Settings</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="db_instance_identifier">
                              DB Instance Identifier
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setdb_instance_identifier(e.target.value)
                              }
                              name="db_instance_identifier "
                              id="db_instance_identifier "
                              value={db_instance_identifier}
                              placeholder="DB Instance Identifier"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span style={{ fontSize: "10px", color: "grey" }}>
                        The DB instance identifier is case-insensitive, but is
                        stored as all lowercase (as in "mydbinstance").
                        Constraints: 1 to 60 alphanumeric characters or hyphens.
                        First character must be a letter. Can't contain two
                        consecutive hyphens. Can't end with a hyphen.
                      </span>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Credentials</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="db_username">Username</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setdb_username(e.target.value)}
                              name="db_username "
                              id="db_username "
                              value={db_username}
                              placeholder="Username"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                        <span style={{ fontSize: "10px", color: "grey" }}>
                          1 to 16 alphanumeric characters. First character must
                          be a letter
                        </span>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="db_password">Password</Tooltip>}
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="password"
                              onChange={(e) => setdb_password(e.target.value)}
                              name="db_password "
                              id="db_password "
                              value={db_password}
                              placeholder="Password"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                        <span style={{ fontSize: "10px", color: "grey" }}>
                          Constraints: At least 8 printable ASCII characters.
                          Can't contain any of the following: / (slash),
                          '(single quote), "(double quote) and @ (at sign).
                        </span>
                      </div>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>DB Instance Class</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="instance_class">
                              Instance Class
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setinstance_class(e.target.value)
                              }
                              name="instance_class "
                              id="instance_class "
                              value={instance_class}
                              placeholder="Instance Class"
                              required=""
                            />
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

                  <h6>Storage</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="allocated_storage">
                              Allocated Storage
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="number"
                              onChange={(e) =>
                                setallocated_storage(e.target.value)
                              }
                              name="allocated_storage "
                              id="allocated_storage "
                              value={allocated_storage}
                              placeholder="Allocated Storage in GiB"
                              required=""
                            />
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

                  <h6>Connectivity</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="db_subnetgroupname">
                              Subnet Group Name
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setdb_subnetgroupname(e.target.value)
                              }
                              name="db_subnetgroupname "
                              id="db_subnetgroupname "
                              value={db_subnetgroupname}
                              placeholder="Subnet Group Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="vpc_security_group_ids">
                              VPC Security Group IDs
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setvpc_security_group_ids(e.target.value)
                              }
                              name="vpc_security_group_ids "
                              id="vpc_security_group_ids "
                              value={vpc_security_group_ids}
                              placeholder="VPC Security Group IDs"
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
                          overlay={<Tooltip id="db_port">DB Port</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="number"
                              onChange={(e) => setdb_port(e.target.value)}
                              name="db_port "
                              id="db_port "
                              value={db_port}
                              placeholder="DB Port"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="db_name">DB Name</Tooltip>}
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setdb_name(e.target.value)}
                              name="db_name "
                              id="db_name "
                              value={db_name}
                              placeholder="DB Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
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
              </Form>
            </div>
          </section>
        </div>
        <div className="description col-10 mt-8">
          <p>
            This module will launch one RDS instance in provided VPC and Subnet,
            It supports all the AWS provided DB engines(mysql, oracle, postgresql, aurora, mssql, mariadb) with other DB configurations.

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
