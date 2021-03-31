// import { useState } from "react";
import "./GenrePanel.css";

export default function GenrePanel(props) {
  let genre = [...props.genre];
  let ageGroup = [...props.ageGroup];

  function handleClickAllGenre(e) {
    e.preventDefault();
    props.onGenreChange([1, 0, 0, 0, 0]);
  }

  function handleClickOneGenre(e) {
    e.preventDefault();
    const target = e.target;
    const index = parseInt(target.id[0]);
    genre[index] = Number(!genre[index]);

    // check whether after clicking the button all specific genres are unselected
    let flag = false;
    for (let i = 1; i < genre.length; i++) {
      flag = flag || genre[i];
    }
    if (flag) {
      genre[0] = 0;
      props.onGenreChange(genre);
    } else {
      props.onGenreChange([1, 0, 0, 0, 0]);
    }
  }

  function handleClickAllAges(e) {
    e.preventDefault();
    props.onAgeGroupChange([1, 0, 0, 0, 0]);
  }

  function handleClickOneAge(e) {
    e.preventDefault();
    const target = e.target;
    const index = parseInt(target.id[0]);
    const val = ageGroup[index];
    if (val === 0) {
      ageGroup = [0, 0, 0, 0, 0];
      ageGroup[index] = 1;
    } else {
      ageGroup = [1, 0, 0, 0, 0];
    }
    props.onAgeGroupChange(ageGroup);
  }

  return (
    <div className="genre-panel">
      <div className="genre">
        <div
          className={`genre-text all-genre-option ${
            props.genre[0] ? "genre-selected" : ""
          }`}
          onClick={handleClickAllGenre}
          id="0g"
        >
          All Genre
        </div>
        <div
          className={`genre-text one-genre ${
            props.genre[1] ? "genre-selected" : ""
          }`}
          id="1g"
          onClick={handleClickOneGenre}
        >
          Education
        </div>
        <div
          className={`genre-text one-genre ${
            props.genre[2] ? "genre-selected" : ""
          }`}
          id="2g"
          onClick={handleClickOneGenre}
        >
          Sports
        </div>
        <div
          className={`genre-text one-genre ${
            props.genre[3] ? "genre-selected" : ""
          }`}
          id="3g"
          onClick={handleClickOneGenre}
        >
          Comedy
        </div>
        <div
          className={`genre-text one-genre ${
            props.genre[4] ? "genre-selected" : ""
          }`}
          id="4g"
          onClick={handleClickOneGenre}
        >
          Lifestyle
        </div>
        <div className="genre-text genre-selected sort-dropdown">
          <i className="fas fa-long-arrow-alt-up"></i>
          <i className="fas fa-long-arrow-alt-down"></i>
          <span style={{ paddingLeft: "8px" }}>
            Sort By:{" "}
            <select name="options" id="sort-by" defaultValue="uploaded-date">
              <option value="views" className="sort-by-option">
                Views
              </option>
              <option value="uploaded-date" className="sort-by-option">
                Uploaded Date
              </option>
            </select>
          </span>
        </div>
      </div>
      <div className="age-group">
        <div
          className={`age-group-text any-age ${
            ageGroup[0] ? "age-group-selected" : ""
          }`}
          id="0a"
          onClick={handleClickAllAges}
        >
          Any age group
        </div>
        <div
          className={`age-group-text specific-age ${
            ageGroup[1] ? "age-group-selected" : ""
          }`}
          id="1a"
          onClick={handleClickOneAge}
        >
          7+
        </div>
        <div
          className={`age-group-text specific-age ${
            ageGroup[2] ? "age-group-selected" : ""
          }`}
          id="2a"
          onClick={handleClickOneAge}
        >
          12+
        </div>
        <div
          className={`age-group-text specific-age  ${
            ageGroup[3] ? "age-group-selected" : ""
          }`}
          id="3a"
          onClick={handleClickOneAge}
        >
          16+
        </div>
        <div
          className={`age-group-text specific-age  ${
            ageGroup[4] ? "age-group-selected" : ""
          }`}
          id="4a"
          onClick={handleClickOneAge}
        >
          18+
        </div>
      </div>
    </div>
  );
}
