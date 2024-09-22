import React from "react";
import Groups from "../../Assets/Groups.svg";
import Event from "../../Assets/Event.svg";
import Location from "../../Assets/Location.svg";
import shoppingBasket from "../../Assets/Shopping-Basket.svg";
import IntroCard from "../IntroCard";
import Add from "../../Assets/Add.svg";

export default function Sec2({ setPopup }) {
  return (
    <>
      <div className="main-sec-1__color">
        <div className="landing-page__main-sec-1">
          <IntroCard
            icon={Groups}
            titleTxt="People"
            para="Find a teacher, coach, or expert for your hobby interest in your locality.  Find a partner, teammate, accompanist or collaborator."
            btnTxt="Connect"
            onClick={() => setPopup(true)}
          />
          <IntroCard
            icon={Location}
            titleTxt="Place"
            para="Find a class, school, playground, auditorium, studio, shop or an event venue.  Book a slot at venues that allow booking through hobbycue."
            btnTxt="Meet up"
            onClick={() => setPopup(true)}
          />
          <IntroCard
            icon={shoppingBasket}
            titleTxt="Product"
            para="Find equipment or supplies required for your hobby.  Buy, rent or borrow from shops, online stores or from community members."
            btnTxt="Get it"
            onClick={() => setPopup(true)}
          />
          <IntroCard
            icon={Event}
            titleTxt="Program"
            para="Find events, meetups and workshops related to your hobby.  Register or buy tickets online."
            btnTxt="Attend"
            onClick={() => setPopup(true)}
          />
        </div>
      </div>
      <div className="main-sec-2__color">
        <div className="landing-page__main-sec-2">
          <IntroCard
            style={{ background: "#fff" }}
            icon={Add}
            titleTxt="Add your own"
            para="Are you a teacher or expert?  Do you sell or rent out equipment, venue or event tickets?  Or, you know someone who should be on hobbycue?  Go ahead and Add your Own page"
            btnTxt="Add new"
            onClick={() => setPopup(true)}
          />
        </div>
      </div>
    </>
  );
}
