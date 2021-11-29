import React from "react";
import TierData from "../../AWS/TierData";
import Cards from "../../components/Cards";
import Header1 from "../../Header1";
const Tier3 = () => {
  return (
    <>
       <div class="clearfix">
        <div class="box3"></div>
         <div> <h4 class="box1">3 - TIER WEB APPLICATION</h4> </div>
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
              {TierData.map((val, index) => {
                return (
                  <Cards className="ucCard" key={index} imgsrc={val.imgsrc} title={val.title} to={val.to} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tier3;
