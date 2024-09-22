import React from "react";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export default function FooterDropdown(props) {
  const { heading } = props;
  return (
    <div className="footer-dropdown">
      <div className="footer-dropdown__main-txt">{heading}</div>
      <ExpandMoreRoundedIcon fontSize="small" style={{ color: "#939CA3" }} />
      {/*TODO: Add onClick list to it*/}
    </div>
  );
}
