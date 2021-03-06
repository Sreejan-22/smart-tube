import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Header from "../Header/Header";
import GenrePanel from "../Genre Panel/GenrePanel";
import Dashboard from "../Dashboard/Dashboard";
import UploadModal from "../Modals/UploadModal";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const allVideos = useRef([]);
  const tempVideos = useRef([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://my-videos-api.herokuapp.com/videos")
      .then((res) => res.json())
      .then((data) => {
        allVideos.current = data;
        tempVideos.current = data;
        setVideos(data);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  function onSort(sortFactor) {
    const currentVideos = [...videos];
    if (sortFactor === "uploaded-date") {
      const videosToBeDisplayed = currentVideos.sort((a, b) => {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
      tempVideos.current = tempVideos.current.sort((a, b) => {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
      setVideos(videosToBeDisplayed);
      // return;
    } else if (sortFactor === "views") {
      const videosToBeDisplayed = currentVideos.sort((a, b) => {
        return b.viewCount - a.viewCount;
      });
      tempVideos.current = tempVideos.current.sort((a, b) => {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
      setVideos(videosToBeDisplayed);
      // return;
    }
  }

  const genres = ["All Genre", "Education", "Sports", "Comedy", "Lifestyle"];
  const ageGroups = ["Any", "7+", "12+", "16+", "18+"];
  const currentGenre = useRef([1, 0, 0, 0, 0]);
  const currentAgeGroup = useRef([1, 0, 0, 0, 0]);

  function handleFilter(genre, ageGroup) {
    const genreArr = [...genre];
    const ageGroupArr = [...ageGroup];

    const genreFilter = genres.map((item, index) => {
      return genreArr[index] ? item : "";
    });
    const ageGroupFilter = ageGroups[ageGroupArr.indexOf(1)];

    // no filters at all
    if (genreArr[0] === 1 && ageGroupArr[0] === 1) {
      setVideos(tempVideos.current);
    } else if (ageGroupArr[0] === 1) {
      // only genre filter
      const videosToBeDisplayed = tempVideos.current.filter((item) => {
        return (
          item.genre === genreFilter[0] ||
          item.genre === genreFilter[1] ||
          item.genre === genreFilter[2] ||
          item.genre === genreFilter[3] ||
          item.genre === genreFilter[4]
        );
      });
      setVideos(videosToBeDisplayed);
    } else if (genreArr[0] === 1) {
      // only age group(i.e. content rating) filter
      const videosToBeDisplayed = tempVideos.current.filter(
        (item) => item.contentRating === ageGroupFilter
      );
      setVideos(videosToBeDisplayed);
    } else if (genreArr[0] !== 1 && ageGroupArr[0] !== 1) {
      // both genre and age group(i.e. content rating) filters present
      const videosToBeDisplayed = tempVideos.current.filter((item) => {
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
    }
  }

  function handleFilterByGenre(data) {
    currentGenre.current = data;
    handleFilter(currentGenre.current, currentAgeGroup.current);
  }

  function handleFilterByAge(data) {
    currentAgeGroup.current = data;
    handleFilter(currentGenre.current, currentAgeGroup.current);
  }

  function onSearch(keyword) {
    if (keyword.length > 0) {
      const videosToBeDisplayed = allVideos.current.filter((item) => {
        return item.title.toLowerCase().includes(keyword);
      });
      tempVideos.current = videosToBeDisplayed;
      setVideos(videosToBeDisplayed);
    }
  }

  function handleSubmit(e) {}

  return (
    <div className="home">
      <Header
        onSearch={onSearch}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
      <GenrePanel
        genre={currentGenre.current}
        ageGroup={currentAgeGroup.current}
        onGenreChange={handleFilterByGenre}
        onAgeGroupChange={handleFilterByAge}
        onSort={onSort}
        showFiltersModal={showFiltersModal}
        setShowFiltersModal={setShowFiltersModal}
      />
      <Dashboard videos={videos} loading={loading} />
      <UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Home;
