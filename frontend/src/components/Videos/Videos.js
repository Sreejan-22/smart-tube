import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Videos.css";
import timePosted from "../../utils/timePosted";

function getId(url) {
  return url.split("/")[2];
}

function Videos() {
  const [loading, setLoading] = useState(false);
  const allVideos = useRef([]);
  const currentVideo = useRef({});
  const videosToBeDisplayed = useRef([]);
  const videoId = window.location.pathname.split("/")[2];

  useEffect(() => {
    setLoading(true);
    fetch("https://my-videos-api.herokuapp.com/videos")
      .then((res) => res.json())
      .then((data) => {
        return (allVideos.current = data);
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
  }, [videoId]);

  // <i className="far fa-thumbs-up"></i>
  // <i className="far fa-thumbs-down"></i>

  return (
    <div className="full">
      {loading ? (
        <h3 style={{ color: "white", textAlign: "center" }}>Loading...</h3>
      ) : (
        <>
          <div className="header-section">
            <Link
              to="/"
              className="logo"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span>SmartTube</span>
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
            <hr className="separator" />
            <div className="other-videos" style={{ padding: 0 }}>
              {videosToBeDisplayed.current.length &&
                videosToBeDisplayed.current.map((video) => {
                  return (
                    <>
                      <Link
                        to={`/videos/${getId(video.videoLink)}`}
                        className="video-tile-link"
                        key={video["_id"]}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="video-tile">
                          <img
                            src={video.previewImage}
                            alt=""
                            className="video-img"
                          />
                          <div className="video-title">{video.title}</div>
                          <div className="date-posted">
                            {timePosted(video.releaseDate)}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Videos;
