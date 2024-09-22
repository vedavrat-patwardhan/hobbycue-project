import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sec1 from "../Components/LandingComponents/Sec1";
import Sec2 from "../Components/LandingComponents/Sec2";
import Sec3 from "../Components/LandingComponents/Sec3";
import Sec4 from "../Components/LandingComponents/Sec4";
import Sec5 from "../Components/LandingComponents/Sec5";
import Popup from "../Components/Popup";
import SignInForm from "../Components/LandingComponents/SignInForm";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function LandingPage() {
  const matches = useMediaQuery("(max-width:768px)");
  const [scrolling, setScrolling] = useState(true);
  const [masking, setMasking] = useState(false);
  const [onMaskClick, setOnMaskClick] = useState(null);
  const [popup, setPopup] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    window.scrollY > 100 ? setShowScroll(true) : setShowScroll(false);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setShowScroll(true) : setShowScroll(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`landing-page ${!scrolling ? "disable-scroll" : ""}`}>
      <Navbar
        scrolling={scrolling}
        setScrolling={setScrolling}
        setMasking={setMasking}
        setOnMaskClick={setOnMaskClick}
        setPopup={setPopup}
      />
      {masking && <div className="bg-mask" onClick={onMaskClick} />}
      <Sec1 matches={matches} />
      <Sec2 setPopup={setPopup} />
      <Sec3 />
      <Sec4 setPopup={setPopup} />
      <Sec5 matches={matches} setPopup={setPopup} />
      <Popup
        open={popup}
        setOpen={setPopup}
        data={<SignInForm matches={true} />}
        className="sign-in-popup__close"
      />
      {showScroll && (
        <div
          className="scroll-up df-ac-jc"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <ExpandLessIcon fontSize="small" />
        </div>
      )}
    </div>
  );
}
