import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React from "react";

export default function Dropdown(props) {
  const { img, txt, style, list, matches, open, onClick } = props;
  return (
    <div
      className={matches ? "" : "df-ac-jb cursor-pointer"}
      style={style}
      onClick={onClick}
    >
      <div className={`df-ac ${matches && open ? "m-b-16" : ""}`}>
        <div className="dropdown__img">{img}</div>
        {txt !== undefined && (
          <span className="dropdown__txt" style={{ margin: "0 0.5rem" }}>
            {txt}
          </span>
        )}
        {open ? (
          <ExpandLessIcon fontSize="small" className="color--grey-dark" />
        ) : (
          <ExpandMoreRoundedIcon
            fontSize="small"
            className="color--grey-dark"
          />
        )}
      </div>
      {open && list}
    </div>
  );
}
