import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Videos.css";
import timePosted from "../../utils/timePosted";

function Videos() {
  const [loading, setLoading] = useState(false);
  const allVideos = useRef([]);
  const currentVideo = useRef({});
  const videosToBeDisplayed = useRef([]);
  const videoId = window.location.pathname.split("/")[2];

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
        return (allVideos.current = data.videos);
      })
      .then((videos) => {
        currentVideo.current = videos.find((item) => {
          return item.videoLink === `youtube.com/embed/${videoId}`;
        });
      })
      .then(() => {
        const temp = [...allVideos.current];
        const index = temp.indexOf(currentVideo.current);
        if (index > -1) {
          temp.splice(index, 1);
        }
        videosToBeDisplayed.current = temp;
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  // <i class="fas fa-thumbs-up"></i>
  // <i class="far fa-thumbs-up"></i>
  // <i class="fas fa-thumbs-down"></i>
  // <i class="far fa-thumbs-down"></i>

  return (
    <div className="full">
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
                frameBorder="0"
                className="iframe-parent"
              ></iframe>
            </div>
            <div className="video-description">
              <div className="video-title-wrapper">
                <div className="videos-title">{currentVideo.current.title}</div>
                <div className="rating-and-time-posted">
                  {currentVideo.current.contentRating} &#x2022;{" "}
                  {timePosted(currentVideo.current.releaseDate)}
                </div>
              </div>
              <div className="votes">
                <div className="like-button">
                  <i className="fas fa-thumbs-up thumbs-up"></i>
                  <span className="upvote">
                    {/* {currentVideo.current.votes.upVotes} */}
                    &nbsp;12k
                  </span>
                </div>
                <div className="dislike-button">
                  <i className="fas fa-thumbs-down thumbs-down"></i>
                  <span className="downvote">
                    {/* {currentVideo.current.votes.downVotes} */}
                    &nbsp;347
                  </span>
                </div>
              </div>
            </div>
            <div className="other-videos"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Videos;
