import React from "react";
import { Button } from "@material-ui/core";
import footerHobby from "../../Assets/Footer-Hobby.svg";

export default function Sec4({ setPopup }) {
  return (
    <div className="main-sec-4__color">
      <div className="landing-page__main-sec-4">
        <div>
          <div className="main-sec-4__heading">
            Your <span style={{ color: "#8064A2" }}>Hobby,</span> Your
            <span style={{ color: "#0096C8" }}> Community...</span>
          </div>
          <Button
            className="main-sec-4__btn"
            onClick={() => {
              setPopup(true);
            }}
          >
            Get started
          </Button>
        </div>
        <img src={footerHobby} alt="Hobbies" width="100%" />
      </div>
    </div>
  );
}
