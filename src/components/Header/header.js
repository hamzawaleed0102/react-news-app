import React from "react";
import style from "./header.css";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import SideNav from "./SideNav/sideNav";
const Header = props => {
  const navBars = () => (
    <div className={style.bars}>
      <FontAwesome
        onClick={props.onOpenNav}
        name="bars"
        style={{ color: "#dfdfdf", padding: "10px", cursor: "pointer" }}
      />
    </div>
  );

  const logo = () => (
    <Link to="/" className={style.logo}>
      <img alt="nba logo" src="/images/nba_logo.png" />
    </Link>
  );

  return (
    <header>
      <SideNav {...props} />
      <header className={style.header}>
        <div className={style.headerOpt}>
          {navBars()}
          {logo()}
        </div>
      </header>
    </header>
  );
};

export default Header;
