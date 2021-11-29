import React, { useState, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"
import profile from "../../../../profile.json"
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
import Header1 from "../../../../Header1";
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Review } from "../../../../components/Review/Review";
import {Password} from 'primereact/password';
import { Divider } from 'primereact/divider';
import '../Module/windowsvm.css';
export default function WindowsVm() {

  // Account details
  const[admin_username, setadmin_username] = useState("");
  const[admin_password, setadmin_password] = useState("");
  const[resource_group_name, setresource_group_name] = useState("");
  const[nic_name, setnic_name] = useState("");
  const[subnet_name, setsubnet_name] = useState("");
  const[vnet_name, setvnet_name] = useState("");
  const[vm_name, setvm_name] = useState("");
  const[vm_size, setvm_size] = useState("");
  const[location, setlocation] = useState("");

  const[subscriptionid, setsubscriptionid] = useState(profile.subscriptionid);
  const[client_id,setclient_id] = useState(profile.client_id);
  const[client_secret, setclient_secret] = useState(profile.client_secret);
  const[tenant_id,settenant_id] = useState(profile.tenant_id);
  const [formState, setformState] = useState(0)
  const [output, setoutput] = useState("");
  // const  {exec} = require("child_process");
  const messages = useRef(null);

  const configList = {
    "providerName":"AZURE",
    "usecaseType":"Module",
    "usecaseName":"WindowsVm",
    "parameter":{
        "subscriptionid": subscriptionid,
        "client_id": client_id,
        "client_secret": client_secret,
        "tenant_id": tenant_id,
        "admin_username": admin_username,
        "admin_password": admin_password,
        "resource_group_name": resource_group_name,
        "nic_name": nic_name,
        "subnet_name": subnet_name,
        "vnet_name": vnet_name,
        "vm_name": vm_name,
        "vm_size": vm_size,
        "location": location,
    }
   };

  const configList1 = {
    "Admin Username": admin_username,
    "Admin Password": admin_password,
    "Resource Group Name": resource_group_name,
    "Netowk Interface Name": nic_name,
    "Subnet Name": subnet_name,
    "Vnet Name": vnet_name,
    "VM Name": vm_name,
    "VM Size": vm_size,
    "Location": location,
   };

  const clearInputField = () => {
    
    admin_username("");
    admin_password("");
    resource_group_name("");
    nic_name("");
    subnet_name("");
    vnet_name("");
    vm_name("");
    vm_size("");
    location("");
   };
  const reviewList = (e) => {
    e.preventDefault();
    const values = [
      subscriptionid,
      client_id,
      client_secret,
      tenant_id,
      admin_username,
      admin_password,
      resource_group_name,
      nic_name,
      subnet_name,
      vnet_name,
      vm_name,
      vm_size,
      location,
  ];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });
    
        
    
    
    if (allFieldsFilled) {
      setformState(1);
    }
    else if (
        !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/.test(
            admin_password
        ) 
    ){
        messages.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
    } else {
      alert("fill all the fields");
    }
  };

  const setformIndex = (e) => {
    setformState(e)
  }

  const header = <h6>Pick a password</h6>;
  const footer = (
      <React.Fragment>
          <Divider />
          <p className="p-mt-2">Suggestions</p>
          <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>At least one special</li>
              <li>Minimum 8 characters</li>
          </ul>
      </React.Fragment>
  );

 
  

  if (formState === 0) {
    return (
      <>
      <div>
        



        <div class="clearfix">
          <div class="box3"></div>
         <div> <h4 class="box1">Module - Windows VM with Existing VNET</h4> </div>
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

           <Card style={{padding: '10px', margin: '10px', width: 'auto', boxShadow: '0 8px 12px 0 rgba(0,0,0,0.2)'}}> 
           
           <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="admin_username" >Username</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setadmin_username(e.target.value)}
                      name="admin_username"
                      id="admin_username"
                      value={admin_username}
                      placeholder="Username"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="admin_password" >Password</Tooltip> } placement="right">
                    <span>
                    <Password placeholder="Password"  onChange={setadmin_password} header={header} footer={footer}  />
                    {/* <Form.Control
                      type="password"
                      onChange={(e) => setadmin_password(e.target.value)}
                      name="admin_password"
                      id="admin_password"
                      value={admin_password}
                      placeholder="Password"
                      required=""
                    /> */}
                    </span></OverlayTrigger>
                    
                  </div>
                  </div>
              </Form.Group>
              <Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="resource_group_name" >Existing Resource Group Name</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setresource_group_name(e.target.value)}
                      name="resource_group_name"
                      id="resource_group_name"
                      value={resource_group_name}
                      placeholder="Existing Resource Group Name"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="nic_name" >Network Interface Name</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setnic_name(e.target.value)}
                      name="nic_name"
                      id="nic_name"
                      value={nic_name}
                      placeholder="Network Interface Name"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group><Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="subnet_name" >Subnet Name</Tooltip> } placement="left">
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
                  <OverlayTrigger overlay={<Tooltip id="vnet_name" >VNET Name</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setvnet_name(e.target.value)}
                      name="vnet_name"
                      id="vnet_name"
                      value={vnet_name}
                      placeholder="VNET Name"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group><Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="vm_name" >VM Name</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setvm_name(e.target.value)}
                      name="vm_name"
                      id="vm_name"
                      value={vm_name}
                      placeholder="VM Name"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  <div className="col-6 col-6-xsmall">
                  <OverlayTrigger overlay={<Tooltip id="vm_size" >VM Size</Tooltip> } placement="right">
                    <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setvm_size(e.target.value)}
                      name="vm_size"
                      id="vm_size"
                      value={vm_size}
                      placeholder="VM Size"
                      required=""
                    /></span></OverlayTrigger>
                  </div>
                  </div>
              </Form.Group><Form.Group>
                <div className="row mt-2">               
                <div className="col-6 col-6-xsmall">
                <OverlayTrigger overlay={<Tooltip id="location" >Location</Tooltip> } placement="left">
                  <span>
                    <Form.Control
                      type="text"
                      onChange={(e) => setlocation(e.target.value)}
                      name="location"
                      id="location"
                      value={location}
                      placeholder="Location"
                      required=""
                    />
                    </span></OverlayTrigger>
                  </div>
                  
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
          </Form></div>




        </section>
        </div>
        <div className="description col-10 mt-8">
        <p>&#10148; This template will create one Windows Virtual Machine in an existing resource group as per user requirements. 
        <br/> &#10148; Next, it will create network interface with existing private subnet association. 
        <br/> &#10148; It will also create OS disk attached to the virtual machine.
        <br/> &#10148; It will also create dynamic private IP address for the virtual machine.
          
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
          .get(Api.ip+"runUseCase")
          .then((response) => setoutput(response.data));
        setTimeout(rec, 3000);
      }
      rec();
      

      return (
        <>
         <Output output={output}/>
        </>
      );
    }
  }
}
