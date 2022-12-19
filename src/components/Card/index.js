import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import "./style.css";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";

const Card = (props) => {
  console.log("props", props);
  return (
    <MDBCard>
      <MDBCardImage src={props.show?.image?.medium} fluid alt="..." />
      <MDBCardBody className="p-1 text-dark">
        <div>
          <Rating
            initialValue={props.show?.rating?.average || 0}
            size={20}
            readonly
          />
        </div>
        <div className="text-wrap" style={{ fontSize: "0.9rem" }}>
          This is the tile of the TV show which is very long isn't it
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
