import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Card } from "react-bootstrap";
import Output from "../../../../components/Output";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Chips } from 'primereact/chips';
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import lodash from 'lodash';
import { Dropdown } from "primereact/dropdown";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import axios from "axios";
import { ToasterContext } from "../../../../components/common/Context";
import settings from "../../../../settings.json";
const { ip } = settings;
export default function Vpc3() {

  // Account details

  const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
  const [aws_region, setaws_region] = useState("");
  const [aws_access_key, setaws_access_key] = useState(null);
  const [aws_secret_key, setaws_secret_key] = useState(null);
  const [accountId, setaccountId] = useState(null)
  const [dropDownOptions, setDropDownOptions] = useState({});
  // VPC details
  const [vpc_cidr_block, setvpc_cidr_block] = useState("");


  // Subnets and its components Details
  const [public_subnet_cidr_block, setpublic_subnet_cidr_block] = useState([]);
  const [private_subnet_cidr_block, setprivate_subnet_cidr_block] = useState([]);
  const [availability_zone, setavailability_zone] = useState([]);
  const [eip_count, seteip_count] = useState("");
  const [ruleCount, setruleCount] = useState(0)
  const [ingress, setingress] = useState([{ rule_no: "", port_no: "" }])
  const [formState, setformState] = useState(0);



  const [output, setoutput] = useState("");

  const configList = {
    "providerName": "AWS",
    "usecaseType": "Module",
    "usecaseName": "vpc3",


    "parameter": {
      "aws_region": aws_region,
      "aws_access_key": aws_access_key,
      "aws_secret_key": aws_secret_key,

      "vpc_cidr_block": vpc_cidr_block,
      "public_subnet_cidr_block": public_subnet_cidr_block,
      "private_subnet_cidr_block": private_subnet_cidr_block,
      "availability_zone": availability_zone,
      "eip_count": parseInt(eip_count),
      //   "ingress": ingress,
      "ingress": ingress
    }
  };



  const toReview=(data)=>{
    data.map((key,value)=>{return `${key}:${value}`})
  }

  const configList1 = {
    "AWS Region": aws_region,
    "VPC CIDR Block": vpc_cidr_block,
    "Public Subnet CIDR Block": public_subnet_cidr_block,
    "Private Subnet CIDR Block": private_subnet_cidr_block,
    "Availability Zone": availability_zone,
    "EIP count": eip_count,
    "ingress": ingress

    // "ingress": ingress


  };


  const clearInputField = () => {
    setaws_region("");
    setvpc_cidr_block("");
    setpublic_subnet_cidr_block("");
    setprivate_subnet_cidr_block("");
    setavailability_zone("");
    seteip_count("");
    setingress([{ rule_no: "", port_no: "" }])
    // setingress("");

  };



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


  let addRules = (e, lable, index) => {
    const cloned = lodash.cloneDeep(ingress);
    cloned[index][lable] = parseInt(e.target.value)
    setingress(cloned);
  }



  const renderRuleForm = (inputField, index) => {



    return (<>

      <Form.Group>

        <div className="row mt-2">

          <div className="col-5 col-5-xsmall">
            <OverlayTrigger overlay={<Tooltip id="rule_no">Rule No</Tooltip>} placement="left">
              <span>
                <Form.Control
                  type="number"
                  onChange={(e) => addRules(e, "rule_no", index)}
                  name="rule_no"
                  id="rule_no"
                  value={inputField.rule_no}
                  placeholder="rule_no"
                  required=""
                /></span></OverlayTrigger>
          </div>

          <div className="col-5 col-5-xsmall">
            <OverlayTrigger overlay={<Tooltip id="port_no">Port Number</Tooltip>} placement="left">
              <span>
                <Form.Control
                  type="number"
                  onChange={(e) => addRules(e, "port_no", index)}
                  name="port_no"
                  id="port_no"
                  value={inputField.port_no}
                  placeholder="port_no"
                  required=""
                /></span></OverlayTrigger>
          </div>
          <div className="col-2 col-2-xsmall">
            <Button
              style={{ marginRight: "16px" }}
              onClick={(e) => removePortFields(e, index)}
              variant="danger"
            >
              Remove
            </Button>
          </div>
        </div>
      </Form.Group>

    </>)
  }

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

    configList.parameter.ingress = ingress
    console.log(configList);
    if (aws_access_key) {
      const values = [
        aws_region,
        aws_access_key,
        aws_secret_key,
        vpc_cidr_block,
        public_subnet_cidr_block,
        private_subnet_cidr_block,
        availability_zone,
        eip_count,
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
      setConnectionPopup(true);
    }
  }


  const setformIndex = (e) => {
    setformState(e)
  }



  const addPortFields = (e) => {
    e.preventDefault()
    const values = [...ingress];
    values.push({ rule_no: "", port_no: "" })
    setingress(values);
  }
  const removePortFields = (e, index) => {
    e.preventDefault()
    const values = [...ingress];
    values.splice(index, 1);
    setingress(values);
  }


  if (formState === 0) {
    return (
      <>
        <div>

          <div class="clearfix">
            <div class="box3"></div>
            <div> <h4 class="box1">VPC With NAT Gateway And NACL</h4> </div>

            <Header1 />
          </div>
          <hr
            style={{

              backgroundColor: "black",
              opacity: .1

            }}

          />

          <section className="col-10 mx-auto">

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
                      <OverlayTrigger overlay={<Tooltip id="vpc_cidr_block">VPC CIDR Block</Tooltip>} placement="left">
                        <span>
                          <Form.Control
                            type="text"
                            onChange={(e) => setvpc_cidr_block(e.target.value)}
                            name="vpc_cidr_block "
                            id="vpc_cidr_block "
                            value={vpc_cidr_block}
                            placeholder="VPC CIDR Block"
                            required=""
                          /></span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>
                <span className="span_hint_details">You must specify an IPv4 address range for your VPC.
                    Specify the IPv4 address range as a Classless Inter-Domain Routing
                    (CIDR) block; for example, 10.0.0.0/16. A CIDR block size must be
                    between a /16 netmask and /28 netmask</span>

                <hr style={{ backgroundColor: "black", opacity: .1 }} />

                <h6>Subnet Details</h6>
                <div className="span_hint_details">Specify the CIDR blocks and Availability Zone for the subnet.</div>
                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="public_subnet_cidr_block">Public Subnet CIDR Block</Tooltip>} placement="left">
                        <span>
                          <Chips
                            type="text"
                            onChange={(e) => setpublic_subnet_cidr_block(e.value)}
                            name="public_subnet_cidr_block "
                            id="public_subnet_cidr_block "
                            value={public_subnet_cidr_block}
                            placeholder="Public Subnet CIDR Block"
                            required=""
                            separator=","
                            allowDuplicate={false}
                          >
                          </Chips>
                        </span></OverlayTrigger>
                    </div>
                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="private_subnet_cidr_block">Private Subnet CIDR Block</Tooltip>} placement="right">
                        <span>
                          <Chips
                            type="text"
                            onChange={(e) => setprivate_subnet_cidr_block(e.value)}
                            name="private_subnet_cidr_block"
                            id="private_subnet_cidr_block"
                            value={private_subnet_cidr_block}
                            placeholder="Private Subnet CIDR Block"
                            required=""
                            separator=","
                            allowDuplicate={false}
                          >
                          </Chips>
                        </span></OverlayTrigger>
                    </div>

                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="row mt-2">

                    <div className="col-6 col-6-xsmall">
                      <OverlayTrigger overlay={<Tooltip id="availability_zone">Availability Zone</Tooltip>} placement="left">
                        <span>
                          <Chips
                            type="text"
                            onChange={(e) => setavailability_zone(e.value)}
                            name="availability_zone"
                            id="availability_zone"
                            value={availability_zone}
                            placeholder="Availability Zone"
                            required=""
                            separator=","
                            allowDuplicate={false}
                          >
                          </Chips>
                        </span></OverlayTrigger>
                    </div>



                  </div>
                  <div className="span_hint_details">Hint : Above subnet details fields are comma seperated values</div>
                </Form.Group>
                <hr style={{ backgroundColor: "black", opacity: .1 }} />
                <h6>Elastic IP</h6>
                <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="eip_count">EIP Count</Tooltip>} placement="right">
                    <span>
                      <Form.Control
                        type="number"
                        onChange={(e) => seteip_count(e.target.value)}
                        name="eip_count "
                        id="eip_count "
                        value={eip_count}
                        placeholder="EIP Count"
                        min='0'
                        required=""
                      /></span></OverlayTrigger>
                </div>
                <Form.Group>
                <div className="span_hint_details">An Elastic IP is designed for dynamic cloud computing</div>
                </Form.Group>
                <hr style={{ backgroundColor: "black", opacity: .1 }} />

                <Form.Group>
                  <h6>Inbound rules</h6>
                  <div className="span_hint_details">Inbound rules control the incoming traffic that's allowed to reach the VPC.</div>
                  
                  <div className="row mt-2">
                    <div className="col-3 col-3-xsmall">
                      <Button
                        style={{ marginRight: "16px" }}
                        onClick={addPortFields}
                        className="Primary"
                      >
                        Add Rules
                      </Button>
                    </div>

                  </div>
                  {
                    ingress.map((inputField, index) => {
                      return renderRuleForm(inputField, index);
                    })
                  }
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
            This template will create one VPC with Public and Private Subnets as per user requirements,
            It will create Public Route Table with Public Subnets Association and Private Route Table with Private Subnet Association,
            It will also create Internet Gateway and add Internet Gateway as Route in Public Route Table,
            It will also create Elastic IP Addresses and  NAT Gateway and add NAT Gateway as route in Private Route Table,
            It will also create NACL and associates public subnets to it and adds inbound rules as per user requirements.
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
