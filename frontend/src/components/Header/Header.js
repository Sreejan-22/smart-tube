import "./Header.css";

/*

style="height:60%; display: flex; justify-content: center; align-items: center; margin-top:2rem; margin-bottom: 2rem"
 */

export default function Header(props) {
  function handleSeach(e) {
    e.preventDefault();
    props.onSearch(document.querySelector("#videoSearch").value);
  }
  return (
    <div className="header-component">
      <a href="" className="logo" style={{ textDecoration: "none" }}>
        <span className="logo-x">X</span>
        <span className="logo-flix">Flix</span>
      </a>
      <form className="searchbar">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          id="videoSearch"
        />
        <button className="search-btn" type="submit" onClick={handleSeach}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <button className="upload-btn">
        <i className="fas fa-upload upload-icon">
          <span className="upload-text">&nbsp;Upload</span>
        </i>
      </button>
    </div>
  );
}
