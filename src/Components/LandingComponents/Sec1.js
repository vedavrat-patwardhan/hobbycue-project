import React from "react";
import headingHobby from "../../Assets/Heading-Hobby.svg";
import SignInForm from "./SignInForm";

export default function Sec1({ matches }) {
  return (
    <div className="head-sec__color">
      <div className="landing-page__head-sec">
        <div className="head-sec__section-1">
          <div>
            <div className="head-sec-1__heading">
              Explore your <span style={{ color: "#0096C8" }}>hobby</span> or{" "}
              <span style={{ color: "#8064A2" }}>passion</span>
            </div>
            <div className="head-sec-1__para">
              {matches ? (
                <div>
                  Sign-in to interact with a community of fellow hobbyists and
                  an eco-system of experts, teachers, suppliers, classes,
                  workshops, and places to practice, participate or perform.
                </div>
              ) : (
                <div>
                  Sign-in to interact with a community of fellow hobbyists and
                  an eco-system of experts, teachers, suppliers, classes,
                  workshops, and places to practice, participate or perform.
                  Your hobby may be about visual or performing arts, sports,
                  games, gardening, model making, cooking, indoor or outdoor
                  activities…
                  <br />
                  <br />
                  If you are an expert or a seller, you can Add your Listing and
                  promote yourself, your students, products, services or events.
                  Hop on your hobbyhorse and enjoy the ride.
                </div>
              )}
            </div>
          </div>
          {!matches && <img src={headingHobby} alt="Hobbies" width="100%" />}
        </div>
        <div style={{ width: matches ? "100%" : "34%" }}>
          <SignInForm />
        </div>
        {matches && <img src={headingHobby} alt="Hobbies" width="100%" />}
      </div>
    </div>
  );
}
