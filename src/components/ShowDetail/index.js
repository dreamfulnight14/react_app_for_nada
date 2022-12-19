import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../api/axios";
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Rating } from "react-simple-star-rating";

import "./style.css";

const ShowDetail = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({});
  const summaryRef = useRef(null);

  const { id } = useParams();

  const getShow = async () => {
    setLoading(true);
    try {
      const res = await client.get(`/shows/${id}`);
      setShow(res.data);
      console.log("res1", res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    summaryRef.current.innerHTML = show.summary;
  }, [show]);

  return (
    <div>
      <MDBRow style={{ backgroundColor: "#ebebeb" }} className="px-5">
        <p className="fw-bold fs-3 my-5">TV Bland</p>
        <MDBCol md={4} className="mt-3">
          <img
            src={show.image?.original}
            // src="https://static.tvmaze.com/uploads/images/original_untouched/380/950925.jpg"
            className="img-fluid"
            alt="..."
          />
        </MDBCol>
        <MDBCol md={8} className="mt-3">
          <div className="fs-6">
            <Rating initialValue={show.rating?.average} size={20} readonly />
            {show.rating?.average == null
              ? " 0/5"
              : ` ${show.rating.average}/5`}
          </div>
          <div className="head-text-container mt-2">
            Created personalised schedules, Episode guides, cast, crew and
            character information.
          </div>
          <p className="fs-6 mt-3" ref={summaryRef} />
        </MDBCol>
      </MDBRow>
      <MDBRow className="main-container">
        <MDBCol md={6}>
          <h4 className="my-5">Show Info</h4>
          <MDBListGroup style={{ minWidth: "22rem" }} light>
            <MDBListGroupItem className="d-flex  align-items-center">
              <MDBCol md={6}>Streamed on</MDBCol>
              <MDBCol md={6} className="text-secondary">
                Cras justo odio
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex  align-items-center">
              <MDBCol md={6}>Schedule</MDBCol>
              <MDBCol md={6} className="text-secondary">
                {show.schedule?.days.reduce((s, a) => s + " " + a, "")}
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={6}>Status</MDBCol>
              <MDBCol md={6} className="text-secondary">
                {show.status}
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={6}>Genres</MDBCol>
              <MDBCol md={6} className="text-secondary">
                {show.genres?.reduce((s, a) => s + " " + a, "")}
              </MDBCol>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
        <MDBCol md={6}>
          <h4 className="my-5">Starring</h4>
          <MDBListGroup style={{ minWidth: "22rem" }} light>
            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={8}>
                <MDBIcon fas icon="user-circle" size="lg" className="me-3" />
                Victoria Alcock
              </MDBCol>
              <MDBCol md={4} className="text-secondary">
                Carol
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={8}>
                <MDBIcon fas icon="user-circle" size="lg" className="me-3" />
                Hugo Chegwin
              </MDBCol>
              <MDBCol md={4} className="text-secondary">
                Beats
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={8}>
                <MDBIcon fas icon="user-circle" size="lg" className="me-3" />
                Allan Mustafa
              </MDBCol>
              <MDBCol md={4} className="text-secondary">
                Grindah
              </MDBCol>
            </MDBListGroupItem>

            <MDBListGroupItem className="d-flex align-items-center">
              <MDBCol md={8}>
                <MDBIcon fas icon="user-circle" size="lg" className="me-3" />
                Daniel Sylvester Woolford
              </MDBCol>
              <MDBCol md={4} className="text-secondary">
                Decoy
              </MDBCol>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
      <div className="footbar mt-5"></div>
    </div>
  );
};

export default ShowDetail;
