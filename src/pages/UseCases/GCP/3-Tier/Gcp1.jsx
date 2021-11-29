import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import Review_header from "../../../../components/Review_header";
import Output from "../../../../components/Output";
import Api from "../../../../settings.json"

import graph from "../../../../images/ap2.jpg";
import Header from "../../../../Header";
export default function Gcp1() {
  const [project_id, setproject_id] = useState("");
  const [region, setregion] = useState("");
  const [env_name, setenv_name] = useState("");
  const [public_cidr, setpublic_cidr] = useState("");
  const [private_cidr, setprivate_cidr] = useState("");


  const [output, setoutput] = useState("");
  const [flag, setflag] = useState(true);
  const [flag1, setflag1] = useState(true);

  // const  {exec} = require("child_process");

  const configList = {
    "project_id ": project_id,
    "region": region,
    "env_name": env_name,
    "public_cidr": public_cidr,
    "private_cidr": private_cidr,

  };

  const clearInputField = () => {
    setproject_id("");
    setregion("");
    setenv_name("");
    setpublic_cidr("");
    setprivate_cidr("");


  };
  const reviewList = (e) => {
    e.preventDefault();
    const values = [
      project_id,
      region,
      env_name,
      public_cidr,
      private_cidr,


    ];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      setflag(false);
    } else {
      alert("fill all the fields");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
   

    axios({
      method: "post",
      header: { "Content-Type": "application/json" },
      url: Api.ip+"gcp1",
      data: configList,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    clearInputField();
    setflag1(false);
  };

  const onBack = (e) => {
    setflag(true);
  };
  var sno = 0;

  if (flag === true) {
    return (
      <>
        <div>
          <Header />



          <hr
            style={{

              backgroundColor: "black",
              opacity: .1

            }}

          />
          <h4 className="text-center">Google Cloud VPC</h4>
          <hr
            style={{

              backgroundColor: "black",
              opacity: .1

            }}

          />





          <section className="col-10 mx-auto">
             

            <Form className="main-form ">

              <Card style={{ border: 'none' }}>  <Card style={{ padding: '10px', margin: '10px', width: 'auto' }}>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <Form.Control
                        type="text"
                        name="project_id "
                        id="project_id "
                        value={project_id}
                        onChange={(e) => setproject_id(e.target.value)}
                        placeholder="Project ID"
                        required=""
                      />
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <Form.Control
                        type="text"
                        onChange={(e) => setregion(e.target.value)}
                        name="region"
                        id="region"
                        value={region}
                        placeholder="Region"
                        required=""
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="row mt-2">
                    <div className="col-6 col-6-xsmall">
                      <Form.Control
                        type="text"
                        onChange={(e) => setenv_name(e.target.value)}
                        name="env_name"
                        id="env_name"
                        value={env_name}
                        placeholder="Environment Name"
                        required=""
                      />
                    </div>

                    <div className="col-6 col-6-xsmall">
                      <Form.Control
                        type="text"
                        onChange={(e) => setpublic_cidr(e.target.value)}
                        name="public_cidr"
                        id="public_cidr"
                        value={public_cidr}
                        placeholder="Public CIDR"
                        required=""
                      />
                    </div>

                  </div>
                </Form.Group>
              

                
                  
                  <Form.Group>
                    <div className="row mt-2">
                      <div className="col-6 col-6-xsmall">
                        <Form.Control
                          type="text"
                          onChange={(e) => setprivate_cidr(e.target.value)}
                          name="private_cidr"
                          id="private_cidr"
                          value={private_cidr}
                          placeholder="Private CIDR"
                          required=""
                        />
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
                </Card></Card>
            </Form>
       </section>
        </div>
 <div className="description col-10 mt-8">
         
            <p>&#10148; Creation of new Virtual Private Cloud (VPC) Network
              
            
            </p>
        </div> 
        
      </>
    );
  } else {
    if (flag1 === true)
      return (
        <>

          <Review_header />
          <div className="Review">
            {Object.entries(configList).map(([key, value]) => {
              sno += 1;
              return (
                <div key={sno}>
                  {key} : {value}
                </div>
              );
            })}
          </div>
          <div className="Review-button">
            <Button
              type="submit"
              style={{ marginRight: "16px" }}
              onClick={onSubmit}
              className="primary"
            >
              Create
            </Button>
            <Button
              variant="primary"
              style={{ marginRight: "16px" }}
              onClick={onBack}
            >
              Back
            </Button>
          </div>

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
          .get(Api.ip+"gcp1")
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
