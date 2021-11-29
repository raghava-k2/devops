import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json";
import profile from "../../../../profile.json";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Chips } from "primereact/chips";
import { Review } from "../../../../components/Review/Review";
import { getUser } from "../../../../hooks/useFindUser";
import useNavBar from "../../../../hooks/useNavBar";
import { Dialog } from "primereact/dialog";
import {
  AwsCloud,
  AzureCloud,
} from "../../../../components/user/settings/cloudConnections/CloudConnections";
import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
const { ip } = settings;

export default function Ec2InstanceCreation() {
  // Account details
  const [navBar] = useNavBar();
  const user = getUser();
  const [showCloudConnectionPopup, setShowCloudConnectionPopup] =
    useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null);
  const [vpc_id, setvpc_id] = useState("");
  const [availability_zone, setavailability_zone] = useState("");
  const [key_name, setkey_name] = useState("");
  const [instance_type, setinstance_type] = useState("");
  const [ec2_ami, setec2_ami] = useState("");
  const [ingress, setingress] = useState([]);
  const [ebs_volume_name, setebs_volume_name] = useState("");
  const [ebs_volume_type, setebs_volume_type] = useState("");
  const [ebs_volume_size, setebs_volume_size] = useState("");

  const [formState, setformState] = useState(0);
  const { addMessage } = useContext(ToasterContext);
  const cloudConnection = {};
  let formGroupData = null;
  const [dropDownOptions, setDropDownOptions] = useState({});


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

  useEffect(() => {
    const { cloudId } = navBar;
    const { userId } = user;
    axios
      .get(Api.ip + `connectionInfo/${userId}/${cloudId}`)
      .then((response) => {
        const { accessKey, secretKey, accountCode } = response.data;
        setaws_secret_key(secretKey);
        setaws_access_key(accessKey);
        setaccountId(accountCode);

        console.log(accessKey, secretKey, accountCode);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const [output, setoutput] = useState("");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "Ec2InstanceCreation",

    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,
      "vpc_id": vpc_id,
      "availability_zone": availability_zone,
      "key_name": key_name,
      "instance_type": instance_type,
      "ec2_ami": ec2_ami,
      "ingress": ingress,
      "ebs_volume_name": ebs_volume_name,
      "ebs_volume_type": ebs_volume_type,
      "ebs_volume_size": ebs_volume_size,
    },
  };

  const configList1 = {
    "AWS Region": aws_region,
    "EC2 AMI": ec2_ami,
    "Instance Type": instance_type,
    "VPC ID": vpc_id,
    "Availability Zone": availability_zone,
    "EBS Volume Type": ebs_volume_type,
    "EBS Volume Name": ebs_volume_name,
    "EBS Volume Size": ebs_volume_size,
    "Key Name": key_name,
    "Ingress Port Range": ingress,
  };

  const clearInputField = () => {
    setaws_region("");
    setec2_ami("");
    setinstance_type("");
    setvpc_id("");
    setavailability_zone("");
    setebs_volume_type("");
    setebs_volume_name("");
    setebs_volume_size("");
    setkey_name("");
    setingress([]);
  };
  const reviewList = (e) => {
    e.preventDefault();
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,

        ec2_ami,
        instance_type,
        vpc_id,
        availability_zone,
        ebs_volume_type,
        ebs_volume_name,
        ebs_volume_size,
        key_name,
        ingress,
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
      setShowCloudConnectionPopup(true);
    }
  };

  const setformIndex = (e) => {
    setformState(e);
  };

  const formGroup = (fromGroup) => {
    formGroupData = fromGroup;
  };

  const saveCloudProviderDetails = () => {
    const { form, validate } = formGroupData;
    const validation = validate();
    if (validation) {
      const { field, message } = validation;
      addMessage({
        severity: "error",
        summary: field,
        detail: message,
        sticky: true,
      });
    } else {
      const { accessKey, secretKey, accountCode } = form;
      setaws_secret_key(secretKey);
      setaws_access_key(accessKey);
      setaccountId(accountCode);
      setShowCloudConnectionPopup(false);
    }
  };

  const Footer = () => {
    return (
      <div>
        <Button
          style={{ marginRight: "16px" }}
          onClick={() => setShowCloudConnectionPopup(false)}
          className="Primary"
        >
          Cancel
        </Button>
        <Button onClick={saveCloudProviderDetails} className="Primary">
          Ok
        </Button>
      </div>
    );
  };

  if (formState === 0) {
    return (
      <>
        <div>
          <div class="clearfix">
            <div class="box3"></div>
            <div>
              {" "}
              <h4 class="box1">EC2 Instance Creation</h4>{" "}
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

                  <h6>EC2 AMI</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="ec2_ami">EC2 AMI ID</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setec2_ami(e.target.value)}
                              name="ec2_ami "
                              id="ec2_ami "
                              value={ec2_ami}
                              placeholder="EC2 AMI ID"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>

                      </div>
                      <span className="span_hint_details">
                        An AMI is a template that contains the software
                        configuration (operating system, application server,
                        and applications) required to launch your instance.
                      </span>
                    </div>
                  </Form.Group>

                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Instance Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="instance_type">Instance Type</Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setinstance_type(e.target.value)}
                              name="instance_type "
                              id="instance_type "
                              value={instance_type}
                              placeholder="Instance Type"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                        <span style={{ fontSize: '10px', color: 'grey' }}><a href="https://aws.amazon.com/ec2/instance-types/" target="_blank" icon="pi-external-link">Learn</a>
                          more about instance types and how they can meet your computing needs.
                        </span>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="vpc_id">VPC ID</Tooltip>}
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setvpc_id(e.target.value)}
                              name="vpc_id "
                              id="vpc_id "
                              value={vpc_id}
                              placeholder="VPC ID"
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
                          overlay={
                            <Tooltip id="availability_zone">
                              Availability Zone
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setavailability_zone(e.target.value)
                              }
                              name="availability_zone "
                              id="availability_zone "
                              value={availability_zone}
                              placeholder="Availability Zone"
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

                  <h6>Storage Details</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="ebs_volume_type">
                              EBS Volume Type
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setebs_volume_type(e.target.value)
                              }
                              name="ebs_volume_type "
                              id="ebs_volume_type "
                              value={ebs_volume_type}
                              placeholder="EBS Volume Type"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="ebs_volume_name">
                              EBS Volume Name
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setebs_volume_name(e.target.value)
                              }
                              name="ebs_volume_name "
                              id="ebs_volume_name "
                              value={ebs_volume_name}
                              placeholder="EBS Volume Name"
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
                          overlay={
                            <Tooltip id="ebs_volume_size">
                              EBS Volume Size
                            </Tooltip>
                          }
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setebs_volume_size(e.target.value)
                              }
                              name="ebs_volume_size "
                              id="ebs_volume_size "
                              value={ebs_volume_size}
                              placeholder="EBS Volume Size"
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

                  <h6>Key Pairs</h6>
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="key_name">Key Name</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Form.Control
                              type="text"
                              onChange={(e) => setkey_name(e.target.value)}
                              name="key_name "
                              id="key_name "
                              value={key_name}
                              placeholder="Key Name"
                              required=""
                            />
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span className="span_hint_details">
                        The key name to use for the instance
                      </span>
                    </div>
                  </Form.Group>
                  <hr
                    style={{
                      backgroundColor: "black",
                      opacity: 0.1,
                    }}
                  />

                  <h6>Security Group</h6>

                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <OverlayTrigger
                          overlay={<Tooltip id="ingress">Port Range</Tooltip>}
                          placement="left"
                        >
                          <span>
                            <Chips
                              type="text"
                              onChange={(e) => setingress(e.value)}
                              name="ingress"
                              id="ingress"
                              value={ingress}
                              placeholder="Port Range"
                              required=""
                              separator=","
                              allowDuplicate={false}
                            ></Chips>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span className="span_hint_details">
                        A security group is a set of firewall rules that control the traffic for your instance. Add port number to ingress rule that allows unrestricted access to the ports.
                        <br />*Multiple port numbers can be added in field seprated by comma (,)
                      </span>
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
              </Form>
            </div>

          </section>
        </div>
        <div className="description col-10  mt-8">
          <p>
            This module will launch one EC2 instance in provided VPC and availability zone,
            It will also create security group with multiple inbound rules provided by user and attach it to EC2,
            It will also add EBS volume storage with required size to EC2.


          </p>
        </div>
        <Dialog
          header="Cloud Connection"
          visible={showCloudConnectionPopup}
          maximizable
          modal
          style={{ width: "50vw" }}
          footer={Footer}
          onHide={() => setShowCloudConnectionPopup(false)}
        >
          <div className="p-fluid p-formgrid p-grid cac-form">
            {navBar?.cloudId === 1 && (
              <AwsCloud
                formGroup={formGroup}
                cloudConnection={cloudConnection}
              ></AwsCloud>
            )}
          </div>
        </Dialog>
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
      //     .get(Api.ip + "Vpc3")
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
