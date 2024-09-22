import React, { useState } from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import StarsIcon from "@mui/icons-material/Stars";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "./Dropdown";
import { Button } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../Assets/Logo.svg";
import HLogo from "../Assets/HLogo.svg";
import PersonIcon from "@mui/icons-material/Person";
import Explore from "./NavCompoonents/Explore";
import HobbiesDrop from "./NavCompoonents/HobbiesDrop";

export default function Navbar(props) {
  const {
    profile,
    scrolling,
    setScrolling,
    setMasking,
    setOnMaskClick,
    setPopup,
  } = props;
  const [openExplore, setOpenExplore] = useState(false);
  const [openHobbies, setOpenHobbies] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const unMaskExplore = () => {
    setOpenExplore(false);
    setMasking(false);
  };
  const unMaskHobbies = () => {
    setOpenHobbies(false);
    setMasking(false);
  };
  const exploreClick = () => {
    setOpenExplore(!openExplore);
    setMasking(!openExplore);
    setOnMaskClick(() => unMaskExplore);
    setOpenHobbies(false);
  };
  const hobbyClick = () => {
    setOpenHobbies(!openHobbies);
    setMasking(!openHobbies);
    setOnMaskClick(() => unMaskHobbies);
    setOpenExplore(false);
  };
  const showSidebar = () => {
    setSidebar(!sidebar);
    setScrolling(!scrolling);
  };
  const matches1 = useMediaQuery("(max-width:1080px)");
  const matches2 = useMediaQuery("(max-width:768px)");
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const display = () => {
    if (matches2) {
      return (
        <div className="df-ac-jb" style={{ width: "100%" }}>
          <img
            src={HLogo}
            alt="logo"
            className="nav__img"
            onClick={scrollToTop}
          />
          <div className="df-ac-jb" style={{ width: "30%" }}>
            <SearchIcon className="color--purple" />
            <NotificationsIcon className="color--purple" />
            <MenuIcon onClick={showSidebar} className="color--purple" />
          </div>
        </div>
      );
    } else if (matches1) {
      return (
        <>
          <div className="nav__sec-1">
            <img
              src={HLogo}
              alt="logo"
              className="nav__img"
              onClick={scrollToTop}
            />
            <div className="nav__search">
              <input
                className="search__text"
                type="search"
                placeholder="Search here..."
                //onChange={handleSearch}
              />
              <div className="search__icon">
                <SearchIcon fontSize="small" />
              </div>
            </div>
          </div>
          <div className="responsive-icons">
            <Dropdown
              img={<ExploreIcon />}
              style={{ marginRight: "1rem" }}
              list={<Explore matches={matches2} />}
              matches={matches2}
              open={openExplore}
              onClick={exploreClick}
            />
            <Dropdown
              img={<StarsIcon />}
              style={{ marginRight: "1rem" }}
              list={<HobbiesDrop matches={matches2} />}
              matches={matches2}
              open={openHobbies}
              onClick={hobbyClick}
            />
            <BookmarkRoundedIcon className="color--purple" />
            <NotificationsRoundedIcon className="color--purple m-l-24 m-r-24" />
            <ShoppingBasketRoundedIcon className="color--purple" />
            {profile !== undefined ? (
              <img
                src={profile}
                className="cursor-pointer brd-r-50 m-l-16"
                alt="profile"
                width="48"
                height="48"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.reload();
                }}
              />
            ) : (
              <Button className="nav__btn" onClick={() => setPopup(true)}>
                Sign In
              </Button>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="nav__sec-1">
            <img
              src={profile === undefined ? Logo : HLogo}
              alt="logo"
              className="nav__img"
              onClick={scrollToTop}
            />
            <div className="nav__search">
              <input
                className="search__text"
                type="search"
                placeholder="Search here..."
                //onChange={handleSearch}
              />
              <div className="search__icon">
                <SearchIcon fontSize="small" />
              </div>
            </div>
          </div>
          <Dropdown
            img={<ExploreIcon />}
            style={{ marginRight: "1.5rem" }}
            txt="Explore"
            list={<Explore matches={matches2} />}
            matches={matches2}
            open={openExplore}
            onClick={exploreClick}
          />
          <Dropdown
            img={<StarsIcon />}
            style={{ marginRight: "1.5rem" }}
            txt="Hobbies"
            list={<HobbiesDrop matches={matches2} />}
            matches={matches2}
            open={openHobbies}
            onClick={hobbyClick}
          />
          <BookmarkRoundedIcon className="color--purple" />
          <NotificationsRoundedIcon
            className={`color--purple  ${
              matches1 ? "m-l-16 m-r-16" : "m-l-24 m-r-24"
            }`}
          />
          <ShoppingBasketRoundedIcon className="color--purple" />
          {profile !== undefined ? (
            <img
              src={profile}
              alt="profile"
              width="48"
              height="48"
              className="cursor-pointer brd-r-50 m-l-24"
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
            />
          ) : (
            <Button className="nav__btn" onClick={() => setPopup(true)}>
              Sign In
            </Button>
          )}
        </>
      );
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="nav__Items">{display()}</div>
      </div>
      {matches2 && (
        <>
          <nav className={sidebar ? "nav-menu nav-menu--active" : "nav-menu"}>
            <div className="menu-sec-1">
              {profile !== undefined ? (
                <img
                  src={profile}
                  alt="profile"
                  width="40"
                  height="40"
                  className="cursor-pointer brd-r-50 m-l-24"
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                />
              ) : (
                <PersonIcon
                  className="color--purple"
                  style={{
                    background: "#EBEDF0",
                    padding: "0.75rem",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                />
              )}
              <div className="df-ac">
                <BookmarkRoundedIcon className="color--purple" />
                <ShoppingBasketRoundedIcon className="color--purple m-l-16" />
                <CloseIcon
                  onClick={showSidebar}
                  className="m-l-16 color--grey-darker"
                />
              </div>
            </div>
            <hr className="menu-separator" />
            <Dropdown
              img={<ExploreIcon />}
              txt="Explore"
              style={{ padding: "1rem" }}
              list={<Explore matches={matches2} />}
              matches={matches2}
              open={openExplore}
              onClick={exploreClick}
            />
            <hr className="menu-separator" />
            <Dropdown
              img={<StarsIcon />}
              txt="Hobbies"
              style={{ padding: "1rem" }}
              list={<HobbiesDrop matches={matches2} />}
              matches={matches2}
              open={openHobbies}
              onClick={hobbyClick}
            />
          </nav>
          {sidebar && (
            <div
              className="overlay"
              onClick={() => {
                showSidebar();
              }}
            />
          )}
        </>
      )}
    </>
  );
}
