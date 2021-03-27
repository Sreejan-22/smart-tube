import "./GenrePanel.css";

export default function GenrePanel() {
  // const [show, setShow] = useState(false);
  // function handleClick(e) {
  //   e.preventDefault();
  //   const target = e.target;
  //   target.classList
  // }

  return (
    <div className="genre-panel">
      <div className="genre">
        <div className="genre-text genre-selected">All Genre</div>
        <div className="genre-text">Education</div>
        <div className="genre-text">Sports</div>
        <div className="genre-text">Comedy</div>
        <div className="genre-text">Lifestyle</div>
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
        <div className="age-group-text age-group-selected">Any age group</div>
        <div className="age-group-text specific-age">7+</div>
        <div className="age-group-text specific-age">12+</div>
        <div className="age-group-text specific-age">16+</div>
        <div className="age-group-text specific-age">18+</div>
      </div>
    </div>
  );
}
