import React, { useState } from "react";
import Controls from "../Controls/Controls";
import AddressAndPayment from "./AddressAndPayment";
import DataAndOthers from "./DataAndOthers";
import General from "./General";
import Hobbies from "./Hobbies";
import LoginAndSecurity from "./LoginAndSecurity";
import VisibilityAndNotification from "./VisibilityAndNotification";

export default function Grid4({
  matches,
  data,
  profileCompletion,
  setProfileCompletion,
  setUpdate,
}) {
  const joinInStatus = JSON.parse(sessionStorage.getItem("joinIn"));
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState("General");
  const currentPane = () => {
    switch (selection) {
      case "General":
        return (
          <General
            mobile={matches}
            data={data.general}
            joinInStatus={joinInStatus}
            setSelection={setSelection}
            profileCompletion={profileCompletion}
            setProfileCompletion={setProfileCompletion}
            setUpdate={setUpdate}
          />
        );
      case "Hobbies":
        return (
          <Hobbies
            mobile={matches}
            addressesData={data.address === null ? null : data.address.address}
            hobbiesData={data.hobbies === null ? null : data.hobbies.hobbies}
            joinInStatus={joinInStatus}
            profileCompletion={profileCompletion}
            setProfileCompletion={setProfileCompletion}
            setUpdate={setUpdate}
          />
        );
      case "Visibility & Notification":
        return (
          <VisibilityAndNotification
            mobile={matches}
            data={data.profileSetting}
            setUpdate={setUpdate}
            mention={data.general.displayName}
          />
        );
      case "Login & Security":
        return (
          <LoginAndSecurity
            mobile={matches}
            data={data.user}
            setUpdate={setUpdate}
          />
        );
      case "Data & Others":
        return <DataAndOthers mobile={matches} setUpdate={setUpdate} />;
      case "Address & Payment":
        return (
          <AddressAndPayment
            mobile={matches}
            addressesData={data.address === null ? null : data.address.address}
            cardData={data.card === null ? null : data.card.cardDetails}
            setUpdate={setUpdate}
          />
        );
      default:
        console.error("Error in switch case of profile section");
        break;
    }
  };
  return (
    <div className="main-sec__middle-column">
      <div className="main-sec__main-profile__heading">
        <span
          className={
            selection === "General" ? "heading heading--active" : "heading "
          }
          onClick={() => {
            setSelection("General");
            setOpen(false);
          }}
        >
          General
        </span>
        <span
          className={
            selection === "Hobbies" ? "heading heading--active" : "heading "
          }
          onClick={() => {
            setSelection("Hobbies");
            setOpen(false);
          }}
        >
          Hobbies
        </span>
        <Controls.Options
          open={open}
          setOpen={setOpen}
          title="Account"
          titleClass={
            selection !== "General" && selection !== "Hobbies"
              ? "heading heading--active je"
              : "heading je"
          }
          listClass={open ? "account-drop__list" : "account-drop__list--hide"}
          data={[
            <button
              className="list-item p-a-12"
              onClick={() => {
                setSelection("Login & Security");
                setOpen(!open);
              }}
            >
              Login & Security
            </button>,
            <button
              className="list-item p-a-12"
              onClick={() => {
                setSelection("Visibility & Notification");
                setOpen(!open);
              }}
            >
              Visibility & Notification
            </button>,
            <button
              className="list-item p-a-12"
              onClick={() => {
                setSelection("Address & Payment");
                setOpen(!open);
              }}
            >
              Address & Payment
            </button>,
            <button
              className="list-item p-a-12"
              onClick={() => {
                setSelection("Data & Others");
                setOpen(!open);
              }}
            >
              Data & Others
            </button>,
          ]}
        />
      </div>
      <div className="main-sec__main-profile">{currentPane()}</div>
    </div>
  );
}
