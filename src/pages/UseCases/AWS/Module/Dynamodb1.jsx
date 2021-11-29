import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header1 from "../../../../Header1";
import { Review } from "../../../../components/Review/Review";
import { ConnectionInfo } from "../../../../components/common/connectionInfo";
import { ToasterContext } from "../../../../components/common/Context";
import { STANDARD_CONTROL_CATEGORIES } from "../../../../components/constants/constant";
import settings from "../../../../settings.json";
import { Dropdown } from "primereact/dropdown";
const { ip } = settings;


export default function Dynamodb1() {

    const [showCloudConnectionPopup, setShowCloudConnectionPopup] = useState(false);
    const [accountId, setaccountId] = useState(null);
    const [aws_region, setaws_region] = useState("");
    const [aws_access_key, setaws_access_key] = useState(null);
    const [aws_secret_key, setaws_secret_key] = useState(null);

    const [name, setname] = useState("");
    const [partition_key, setpartition_key] = useState("");
    const [sort_key, setsort_key] = useState("");
    const [sort_key_type, setsort_key_type] = useState("")
    const [partition_key_type, setpartition_key_type] = useState("")
    const [formState, setformState] = useState(0);
    const [output, setoutput] = useState("");
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

    const DataType = [
        { label: 'String', value: 'S' },
        { label: 'Boolean', value: 'B' },
        { label: 'Number', value: 'N' },
    ];

    const configList = {
        "providerName": "AWS",
        "usecaseType": "Module",
        "usecaseName": "Dynamodb1",


        "parameter": {
            "aws_access_key": aws_access_key,
            "aws_secret_key": aws_secret_key,
            "aws_region": aws_region,
            "name": name,
            "partition_key": partition_key,
            "sort_key": sort_key,
            "sort_key_type": sort_key_type,
            "partition_key_type": partition_key_type,

        }
    };

    const configList1 = {


        "Aws Region": aws_region,
        "Name": name,
        "Partition Key": partition_key,
        "Sort Key": sort_key,
        "Sort Key Type": sort_key_type,
        "Partition Key Type": partition_key_type,


    };


    const clearInputField = () => {
        setaws_region("")
        setname("")
        setpartition_key("")
        setsort_key("")
        setsort_key_type("")
        setpartition_key_type("")

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
                aws_access_key,
                aws_secret_key,
                name,
                partition_key,
                sort_key,
                sort_key_type,
                partition_key_type,
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
                        <div> <h4 class="box1">DynamoDB</h4> </div>

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
                                <h6>Region Details</h6>

                                <Form.Group>
                                    <div className="row mt-2">
                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="aws_region">Region</Tooltip>} placement="left">
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
                                <hr style={{ backgroundColor: "black", opacity: .1 }} />



                                <h6>Table Details</h6>


                                <Form.Group>
                                    <div className="row mt-2">
                                        <span className="span_hint_details">
                                            This will be used to identify your table.
                                        </span>

                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="name">Table Name</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setname(e.target.value)}
                                                        name="name"
                                                        id="name"
                                                        value={name}
                                                        placeholder="Table Name"
                                                        required=""
                                                    /></span>
                                            </OverlayTrigger>

                                        </div>

                                        <span className="span_hint_details">Between 3 and 255 characters, containing only letters, numbers, underscores (_), hyphens (-), and periods (.).</span>


                                    </div>
                                </Form.Group>
                                <hr style={{ backgroundColor: "black", opacity: .1 }} />

                                <h6>Partition Key Details</h6>
                                <Form.Group>
                                    <div className="row mt-2">

                                        <span className="span_hint_details">The partition key is part of the table's primary key. It is a hash value that is used to retrieve items from your table and allocate data across hosts for scalability and availability.</span>

                                        <div className="col-6 col-6-xsmall">
                                            <OverlayTrigger overlay={<Tooltip id="partition_key">Partition Key</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setpartition_key(e.target.value)}
                                                        name="partition_key "
                                                        id="partition_key "
                                                        value={partition_key}
                                                        placeholder="Partition Key"
                                                        required=""
                                                    /></span></OverlayTrigger>
                                            <span className="span_hint_details">1 to 255 characters and case sensitive.
                                            </span>
                                        </div>


                                        <div className="col-6 col-6-xsmall">


                                            <span>
                                                <Dropdown value={sort_key_type} options={DataType} onChange={(e) => setsort_key_type(e.value)} placeholder="Select Data-Type" />
                                            </span>
                                        </div>

                                    </div>
                                </Form.Group>
                                <hr style={{ backgroundColor: "black", opacity: .1 }} />

                                <h6>Sort Key Details</h6>

                                <Form.Group>
                                    <div className="row mt-2">


                                        <div className="col-6 col-6-xsmall">
                                            <span className="span_hint_details">
                                                You can use a sort key as the second part of a table's primary key. The sort key allows you to sort or search among all items sharing the same partition key.
                                            </span>
                                            <OverlayTrigger overlay={<Tooltip id="sort_Key">Sort Key</Tooltip>} placement="left">
                                                <span>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => setsort_key(e.target.value)}
                                                        name="sort_key"
                                                        id="sort_key"
                                                        value={sort_key}
                                                        placeholder="Sort Key"
                                                        required=""
                                                    /></span></OverlayTrigger>
                                            <span className="span_hint_details">
                                                1 to 255 characters and case sensitive.
                                            </span>
                                        </div>



                                        <div className="col-6 col-6-xsmall">

                                            <span>
                                                <Dropdown value={partition_key_type} options={DataType} onChange={(e) => setpartition_key_type(e.value)} placeholder="Select Data-Type" />
                                            </span>
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
                    <p>This module will create simple DynamoDB Table from the provided Partition Key and Sort Key with the desired capacity.

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
            function rec() {
                axios
                    .get(Api.ip + "Vpc1")
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
