import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import GenrePanel from "./components/Genre Panel/GenrePanel";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [currentGenre, setGenre] = useState([1, 0, 0, 0, 0]);
  const [currentAgeGroup, setAgeGroup] = useState([1, 0, 0, 0, 0]);

  function handleFilterByGenre(data) {
    setGenre(data);
  }

  function handleFilterByAge(data) {
    setAgeGroup(data);
  }

  return (
    <>
      <Header />
      <GenrePanel
        genre={currentGenre}
        ageGroup={currentAgeGroup}
        onGenreChange={handleFilterByGenre}
        onAgeGroupChange={handleFilterByAge}
      />
      <Dashboard genre={currentGenre} ageGroup={currentAgeGroup} />
    </>
  );
}

export default App;
