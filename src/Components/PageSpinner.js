import { useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { SquareLoader } from "react-spinners";

export default function PageSpinner() {
  const matches = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="page-spinner">
      <SquareLoader
        color={"rgb(66, 52, 82)"}
        loading={true}
        size={matches ? 32 : 60}
      />
    </div>
  );
}
