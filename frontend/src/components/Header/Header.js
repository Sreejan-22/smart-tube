import "./Header.css";

export default function Header(props) {
  function handleSeach(e) {
    props.onSearch(e.target.value);
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
          onChange={handleSeach}
        />
        <button className="search-btn" type="button">
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
