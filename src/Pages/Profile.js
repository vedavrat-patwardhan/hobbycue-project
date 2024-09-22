import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import photoNone from "../Assets/PhotoNone.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Services from "../Service/Services";
import Grid1 from "../Components/ProfileComponents/Grid1";
import Grid2 from "../Components/ProfileComponents/Grid2";
import Grid3 from "../Components/ProfileComponents/Grid3";
import Grid4 from "../Components/ProfileComponents/Grid4";
import Grid5 from "../Components/ProfileComponents/Grid5";

export default function Profile() {
  const matches2 = useMediaQuery("(max-width:768px)");
  const matches1 = useMediaQuery("(max-width:1080px)");
  const [scrolling, setScrolling] = useState(true);
  const [masking, setMasking] = useState(false);
  const [update, setUpdate] = useState(false);
  const [onMaskClick, setOnMaskClick] = useState(null);
  const [profileData, setProfileData] = useState({
    user: {
      email: "",
      verified: true,
      accountActivated: true,
    },
    address: null,
    hobbies: {
      hobbies: [],
    },
    card: null,
    general: null,
    profileImage: {
      coverPic: null,
      profilePic: null,
    },
    profileSetting: {
      viewPosts: "Everyone",
      viewMentions: "Everyone",
      mention: false,
      repliesToPost: false,
      repliesToCommnet: false,
      acceptRequestToJoinHobbyCue: false,
      invitesToJoinAGroup: false,
      promotesToGroupAdmin: false,
      blocksFromGroup: false,
      user: "616f9c9ca853e847bc52bf91",
    },
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState("0");

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("token")) !== null) {
      Services.profileService.myProfile(
        JSON.parse(sessionStorage.getItem("token")),
        setProfileData,
        setProfileCompletion
      );
    }
    if (update) {
      setUpdate(false);
    }
  }, [update]);
  useEffect(() => {
    if (profileData.user.google !== undefined) {
      profileData.user.google !== null &&
        setImageUrl(profileData.user.google.picture);
    }
    if (profileData.user.facebook !== undefined) {
      profileData.user.facebook !== null &&
        setImageUrl(profileData.user.facebook.picture.data.url);
    }
  }, [profileData.user.facebook, profileData.user.google]);
  return (
    <div className={`profile-page ${!scrolling ? "disable-scroll" : ""}`}>
      <Navbar
        profile={imageUrl === null ? photoNone : imageUrl}
        scrolling={scrolling}
        setScrolling={setScrolling}
        setMasking={setMasking}
        setOnMaskClick={setOnMaskClick}
      />
      {masking && <div className="bg-mask" onClick={onMaskClick} />}
      <div className="profile-page__main-sec">
        {matches2 ? (
          <>
            <Grid2
              matches={matches2}
              data={profileData}
              setMasking={setMasking}
            />
            <Grid1
              setMasking={setMasking}
              matches={matches2}
              matches1={matches1}
              profileCompletion={profileCompletion}
              data={profileData}
            />
          </>
        ) : (
          <>
            <Grid1
              setMasking={setMasking}
              matches={matches2}
              data={profileData}
              matches1={matches1}
              profileCompletion={profileCompletion}
            />
            <Grid2
              setMasking={setMasking}
              matches={matches2}
              data={profileData}
            />
          </>
        )}
        <Grid3
          matches={matches2}
          hobbies={
            profileData.hobbies === null ? [] : profileData.hobbies.hobbies
          }
        />
        <Grid4
          matches={matches2}
          data={profileData}
          profileCompletion={profileCompletion}
          setProfileCompletion={setProfileCompletion}
          setUpdate={setUpdate}
        />
        <Grid5 setUpdate={setUpdate} data={profileData.hobbies.hobbies} />
      </div>
    </div>
  );
}
