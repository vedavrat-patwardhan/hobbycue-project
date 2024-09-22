import { Button, Typography } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

export default function IntroCard(props) {
  const matches = useMediaQuery("(max-width:768px)");
  const { style, icon, titleTxt, para, btnTxt, onClick } = props;
  return (
    <div className="intro-card" style={style}>
      <div className="intro-card__title">
        <img
          src={icon}
          alt="icon"
          width={matches ? "26.67" : "40"}
          height="40"
        />
        <Typography className="title__txt">{titleTxt}</Typography>
      </div>
      <div className="intro-card__context">{para}</div>
      <Button className="intro-card__button" onClick={onClick}>
        {btnTxt}
      </Button>
    </div>
  );
}
