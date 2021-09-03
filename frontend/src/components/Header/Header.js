import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.css";

export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSeach(e) {
    e.preventDefault();
    props.onSearch(document.querySelector("#videoSearch").value);
  }

  return (
    <div className="header-component">
      <a
        href=""
        className="logo logo-md"
        style={{ textDecoration: "none", color: "white" }}
      >
        <span>SmartTube</span>
      </a>
      {/* "logo" element is visible for all screen widths > 765px */}
      {/* "top-part" element is visible for all screen widths < 765px */}
      <div className="top-part">
        <a
          href=""
          className="logo logo-xs"
          style={{ textDecoration: "none", color: "white" }}
        >
          <span>SmartTube</span>
        </a>
        <i className="fas fa-ellipsis-v menu-icon-xs" onClick={handleClick}></i>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              props.setModalShow(true);
            }}
          >
            Upload
          </MenuItem>
          <MenuItem onClick={handleClose}>Filters</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
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
      <button className="upload-btn" onClick={() => props.setModalShow(true)}>
        <i className="fas fa-upload upload-icon">
          <span className="upload-text">&nbsp;Upload</span>
        </i>
      </button>
    </div>
  );
}
