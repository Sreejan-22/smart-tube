import { Link } from "react-router-dom";
import "./Dashboard.css";

function timePosted(timeString) {
  const date = new Date(timeString);
  const now = new Date();
  const diff = now.getTime() / 1000 - date.getTime() / 1000;
  if (diff > 31536000) {
    const years = Math.floor(diff / 31536000);
    const str = years >= 2 ? "s" : "";
    return `${years} year${str} ago`;
  } else if (diff > 2592000) {
    const months = Math.floor(diff / 2592000);
    const str = months >= 2 ? "s" : "";
    return `${months} month${str} ago`;
  } else if (diff > 86400) {
    const days = Math.floor(diff / 86400);
    const str = days >= 2 ? "s" : "";
    return `${days} day${str} ago`;
  } else {
    return "today";
  }
}

function getId(url) {
  return url.split("/")[2];
}

export default function Dashboard(props) {
  const videos = props.videos;

  return (
    <div className="dashboard">
      {videos.length &&
        videos.map((video) => {
          return (
            <Link
              to={`/videos/${getId(video.videoLink)}`}
              className="video-tile-link"
              key={video["_id"]}
              style={{ textDecoration: "none" }}
            >
              <div className="video-tile">
                <img src={video.previewImage} alt="" className="video-img" />
                <div className="video-title">{video.title}</div>
                <div className="date-posted">
                  {timePosted(video.releaseDate)}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
