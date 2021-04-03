import { useState, useEffect } from "react";
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

const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];
const ageGroups = ["Any", "7+", "12+", "16+", "18+"];

export default function Dashboard(props) {
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
        let allVideos = data.videos;

        // handling sorting by release date or view count
        let sortFactor = props.sortBy;
        if (sortFactor === "uploaded-date") {
          const videosToBeDisplayed = videos.sort((a, b) => {
            return new Date(b.releaseDate) - new Date(a.releaseDate);
          });
          setVideos(videosToBeDisplayed);
          return;
        } else if (sortFactor === "views") {
          const videosToBeDisplayed = videos.sort((a, b) => {
            return b.viewCount - a.viewCount;
          });
          setVideos(videosToBeDisplayed);
          return;
        }

        // handling filters
        const genreArr = [...props.genre];
        const ageGroupArr = [...props.ageGroup];

        const genreFilter = genres.map((item, index) => {
          return genreArr[index] ? item : "";
        });
        const ageGroupFilter = ageGroups[ageGroupArr.indexOf(1)];

        // no filters at all
        if (genreArr[0] === 1 && ageGroupArr[0] === 1) {
          setVideos(allVideos);
          // return;
        } else if (ageGroupArr[0] === 1) {
          // only genre filter
          const videosToBeDisplayed = allVideos.filter((item) => {
            return (
              item.genre === genreFilter[0] ||
              item.genre === genreFilter[1] ||
              item.genre === genreFilter[2] ||
              item.genre === genreFilter[3] ||
              item.genre === genreFilter[4]
            );
          });
          setVideos(videosToBeDisplayed);
          // return;
        } else if (genreArr[0] === 1) {
          // only age group(i.e. content rating) filter
          const videosToBeDisplayed = allVideos.filter(
            (item) => item.contentRating === ageGroupFilter
          );
          setVideos(videosToBeDisplayed);
          // return;
        } else if (genreArr[0] !== 1 && ageGroupArr[0] !== 1) {
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
          // return;
        }

        // // handling search in searchbar in the header section
        // const keyword = props.searchKeyword;
        // if (keyword.length > 0) {
        //   const videosToBeDisplayed = videos.filter((item) => {
        //     return item.title.toLowerCase().includes(keyword);
        //   });
        //   setVideos(videosToBeDisplayed);
        //   return;
        // } else {
        //   return;
        // }
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
