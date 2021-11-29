import React from "react";
import DatalakeData from "../../AWS/DatalakeData";
import Cards from "../../components/Cards";
import Header1 from "../../Header1";
const Datalake = () => {
  return (
    <>
      <div class="clearfix">
        <div class="box3"></div>
         <div> <h4 class="box1">DATALAKE</h4> </div>
         <Header1 />
        </div>
        <hr
          style={{

            backgroundColor: "black",
            opacity: .1

          }}

        />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="row gy-4 my-4">
              {DatalakeData.map((val, index) => {
                return (
                  <Cards key={index} imgsrc={val.imgsrc} title={val.title} to={val.to} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Datalake;
