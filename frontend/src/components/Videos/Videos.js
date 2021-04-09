import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Videos.css";
import timePosted from "../../utils/timePosted";

const videoId = window.location.pathname.split("/")[2];

function Videos() {
  const [loading, setLoading] = useState(false);
  // const videos = useRef([]);
  const allVideos = useRef([]);
  const currentVideo = useRef({});

  useEffect(() => {
    setLoading(true);
    fetch("/data/db.json", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        allVideos.current = data.videos;
      })
      .then(() => {
        currentVideo.current = allVideos.current.find((item) => {
          return item.videoLink === `youtube.com/embed/${videoId}`;
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(allVideos.current);

  // console.log(videos);
  // setTimeout(() => {
  //   console.log(videos.current);
  // }, 1500);
  // console.log(currentVideo.current);
  // <i class="fas fa-thumbs-up"></i>
  // <i class="far fa-thumbs-up"></i>
  // <i class="fas fa-thumbs-down"></i>
  // <i class="far fa-thumbs-down"></i>
  return (
    <>
      {loading ? (
        <h3 style={{ color: "white", textAlign: "center" }}>Loading...</h3>
      ) : (
        <>
          <div className="header-section">
            <Link to="/" className="logo" style={{ textDecoration: "none" }}>
              <span className="logo-x">X</span>
              <span className="logo-flix">Flix</span>
            </Link>
          </div>
          <div className="video-section">
            <div className="video">
              <iframe
                src={`https://youtube.com/embed/${videoId}`}
                height="600"
                width="600"
                frameBorder="0"
                className="iframe-parent"
              ></iframe>
            </div>
            <div className="video-description">
              <div>
                <div className="videos-title">{currentVideo.current.title}</div>
                <div className="rating-and-time-posted">
                  {currentVideo.current.contentRating} &#x2022;{" "}
                  {timePosted(currentVideo.current.releaseDate)}
                </div>
              </div>
              <div>
                <div className="like-button">
                  <i className="fas fa-thumbs-up thumbs-up"></i>
                  {/* <span>{currentVideo.current.votes.upVotes}</span> */}
                </div>
                <div className="dislike-button">
                  <i className="fas fa-thumbs-down thumbs-down"></i>
                  {/* <span>{currentVideo.current.votes.downVotes}</span> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Videos;
