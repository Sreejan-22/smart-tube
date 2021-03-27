import { useState, useEffect } from "react";
import "./Dashboard.css";

// console.log(vidData[1]);

// https://6d1168da-9431-459f-b5f8-83f0375c86a3.mock.pstmn.io/v1/videos

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("./data/db.json", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos);
      })
      .catch((err) => console.log(err));
  }, [videos]);

  return (
    <div className="dashboard container">
      <div className="row">
        {videos.length &&
          videos.map((video) => {
            return (
              <a
                href={`https://www.${video.videoLink}`}
                className="col-3 video-tile-link"
                key={video["_id"]}
              >
                <div className="video-tile">
                  <img src={video.previewImage} alt="" className="video-img" />
                  <div className="video-title">{video.title}</div>
                  <div className="date-posted">5 months ago</div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
