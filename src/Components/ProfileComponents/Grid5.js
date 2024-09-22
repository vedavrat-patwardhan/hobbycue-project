import React, { useEffect, useRef, useState } from "react";
import trendingAdd from "../../Assets/TrendingAdd.svg";
import * as Services from "../../Service/Services";
import Controls from "../Controls/Controls";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Grid5({ setUpdate, data }) {
  const matches1 = useMediaQuery("(max-width:1080px)");
  const matches2 = useMediaQuery("(max-width:768px)");
  const [trendingHobbies, setTrendingHobbies] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const snackbarRef = useRef(null);
  const addHobby = (hobby) => {
    if (data.some((obj) => obj.hobby.toLowerCase() === hobby.toLowerCase())) {
      snackbarRef.current.show();
    } else {
      Services.hobbyService.addHobby(
        {
          hobby,
          level: "Beginner",
        },
        token
      );
      setUpdate(true);
    }
  };
  useEffect(() => {
    Services.otherServices.trendingHobbies(setTrendingHobbies);
  }, []);
  return (
    <>
      {!matches2 && (
        <div className="main-sec__trending-hobbies">
          <div className="trending-hobbies__title">Trending hobbies</div>
          <hr className="profile-page__main-sec__separator" />
          {trendingHobbies.map((element, index) => {
            return (
              <div style={{ padding: "0 1.5rem" }} key={index}>
                <div className="hobby">
                  <div className="df-ac">
                    <img
                      src={element.img}
                      alt=""
                      width={matches1 ? "24" : "48"}
                      height={matches1 ? "24" : "48"}
                      className={matches1 ? "m-r-8" : "m-r-12"}
                    />
                    <div className="hobby__name">{element.hobbyName}</div>
                  </div>
                  <img
                    src={trendingAdd}
                    alt="add"
                    width={matches1 ? "16" : "32"}
                    className="cursor-pointer"
                    onClick={() => addHobby(element.hobbyName)}
                  />
                </div>
                <hr className="profile-page__main-sec__separator" />
              </div>
            );
          })}
        </div>
      )}
      <Controls.Snackbar
        ref={snackbarRef}
        message="This hobby is already added to your profile"
        type="failure"
      />
    </>
  );
}
