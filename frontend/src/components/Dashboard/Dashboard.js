import { useState, useEffect } from "react";
import "./Dashboard.css";

// console.log(vidData[1]);

// https://6d1168da-9431-459f-b5f8-83f0375c86a3.mock.pstmn.io/v1/videos

const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];
const ageGroups = ["Any", "7+", "12+", "16+", "18+"];

export default function Dashboard(props) {
  const [videos, setVideos] = useState([]);

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

  useEffect(() => {
    fetch("./data/db.json", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let allVideos = data.videos;

        // handling search in searchbar in the header section
        const keyword = props.searchKeyword;
        if (keyword.length > 0) {
          const videosToBeDisplayed = allVideos.filter((item) => {
            return item.title.toLowerCase().includes(keyword);
          });
          setVideos(videosToBeDisplayed);
          return;
        }

        // handling filters
        const genreArr = [...props.genre];
        const ageGroupArr = [...props.ageGroup];
        // no filters at all
        if (genreArr[0] === 1 && ageGroupArr[0] === 1) {
          setVideos(allVideos);
          return;
        }

        // only genre filter
        const genreFilter = genres.map((item, index) => {
          return genreArr[index] ? item : "";
        });
        if (ageGroupArr[0] === 1) {
          const videosToBeDisplayed = allVideos.filter((item) => {
            return (
              item.genre ===
              (genreFilter[0] ||
                genreFilter[1] ||
                genreFilter[2] ||
                genreFilter[3] ||
                genreFilter[4])
            );
          });
          setVideos(videosToBeDisplayed);
          return;
        }

        // only age group(i.e. content rating) filter
        const ageGroupFilter = ageGroups[ageGroupArr.indexOf(1)];
        if (genreArr[0] === 1) {
          const videosToBeDisplayed = allVideos.filter(
            (item) => item.contentRating === ageGroupFilter
          );
          setVideos(videosToBeDisplayed);
          return;
        }

        // both genre and age group(i.e. content rating) filters present
        const videosToBeDisplayed = allVideos.filter((item) => {
          return (
            (item.genre === genreFilter[0] ||
              item.genre === genreFilter[1] ||
              item.genre === genreFilter[2] ||
              item.genre === genreFilter[3] ||
              item.genre === genreFilter[4]) &&
            item.contentRating === ageGroupFilter
          );
        });
        setVideos(videosToBeDisplayed);
      })
      .catch((err) => console.log(err));
  }, [videos, props.genre, props.ageGroup, props.searchKeyword]);

  return (
    <div className="dashboard">
      {videos.length &&
        videos.map((video) => {
          return (
            <a
              href={`https://www.${video.videoLink}`}
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
            </a>
          );
        })}
    </div>
  );
}
