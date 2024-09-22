import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function Grid3({ matches, hobbies }) {
  return (
    <div className="main-sec__left-column">
      <div className="main-sec__profile-menu">
        <div className={`menu-hover ${matches ? "" : "m-b-32"}`}>
          <PersonIcon fontSize="small" className="valign-mid m-r-12" />
          My Profile
        </div>
        <div className={`menu-hover ${matches ? "" : "m-b-32"}`}>
          <EditIcon fontSize="small" className="valign-mid m-r-12" />
          My Activity
        </div>
        <div className="menu-hover">
          <ShoppingBagIcon fontSize="small" className="valign-mid m-r-12" />
          Orders
        </div>
      </div>
      {!matches && hobbies.length !== 0 && (
        <div className="main-sec__cues">
          <div className="cues__heading">
            <span className="heading__txt">Your Cues</span>
            <button className="heading__edit">edit</button>
          </div>
          <hr className="profile-page__main-sec__separator" />
          {hobbies.map((element, index) => {
            return (
              <div style={{ padding: "0 1.5rem" }} key={index}>
                <div className="cue">
                  <div className="df-ac">
                    <img
                      src={element.img}
                      alt=""
                      width="48"
                      height="48"
                      className="m-r-12"
                    />
                    <div className="cue__name">{element.hobby}</div>
                  </div>
                </div>
                <hr className="profile-page__main-sec__separator" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
