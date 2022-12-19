import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBSpinner, MDBRow, MDBCol } from "mdb-react-ui-kit";

import Card from "../Card";
import { client } from "../../api/axios";
import ReactPaginate from "react-paginate";
import "./style.css";

const itemsPerPage = 12;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const getEpisodeList = async () => {
    setLoading(true);
    try {
      const res = await client.get("/schedule");
      setEpisodes(res.data);
      setTotalCount(res.data.length);
      setPageCount(Math.ceil(res.data.length / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEpisodeList();
  }, []);

  return (
    <div>
      <MDBRow className="px-5 header-container">
        <p className="fw-bold pt-3 fs-2 my-1">TV Bland</p>
        <div className="pt-4 pb-5 text-secondary">
          <div className="fs-4">
            <div>TV Show and web series database.</div>
            Created personalised schedules, Episode guides, cast, crew and
            character information.
          </div>
        </div>
      </MDBRow>
      {loading ? (
        <MDBSpinner role="status" className="text-center">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      ) : (
        <>
          <MDBRow className="px-5 main-container">
            <p className="fs-4">Last Added Shows</p>
            {episodes.slice(itemOffset, itemOffset + itemsPerPage).map((e) => (
              <MDBCol md="2" sm="6" key={e.id}>
                <div key={e.id}>
                  <Link to={e.show.id.toString()}>
                    <Card show={e.show} />
                  </Link>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow>
            <MDBCol className="d-flex justify-content-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            </MDBCol>
          </MDBRow>
        </>
      )}
      <div className="footbar"></div>
    </div>
  );
};

export default Home;
