import React, { useEffect, useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import ProfileForm from "../ProfileForm";
import EditPopup from "./EditPopup";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";

export default function General({
  mobile,
  data,
  joinInStatus,
  setSelection,
  profileCompletion,
  setProfileCompletion,
  setUpdate,
}) {
  const [scrollDown, setScrollDown] = useState(false);
  const [edit, setEdit] = useState(false);
  const editValue = {
    fullName: "",
    displayName: "",
    profileUrl: "",
    about: "",
    gender: "male",
    yearOfBirth: "",
    websiteUrl: "https://",
    socialNetworks: [],
  };
  const [initialVal, setInitialVal] = useState(editValue);
  const { handleInput, handleUrl, values, setValues, validateURL } =
    useForm(editValue);
  const [error, setError] = useState({});
  const validateGeneral = () => {
    let temp = {};
    temp.fullName = values.fullName ? undefined : "This field is required.";
    temp.displayName = values.displayName
      ? undefined
      : "This field is required.";
    temp.profileUrl = values.profileUrl ? undefined : "This field is required.";
    temp.about = values.about ? undefined : "This field is required.";
    temp.websiteUrl = values.websiteUrl
      ? validateURL(values.websiteUrl)
        ? undefined
        : "Invalid URL"
      : undefined;
    setError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const [socialNetwork, setSocialNetwork] = useState([
    { name: "", link: "", selected: undefined, open: false },
  ]);
  const updateValues = () => {
    let networkValues = [];
    socialNetwork.forEach((data) => {
      let flag = true;
      networkValues.length !== 0 &&
        networkValues.forEach((value) => {
          if (value.siteName === data.name) {
            flag = false;
            value.siteUrl.push(data.link);
          }
        });
      if (flag) {
        networkValues.push({ siteName: data.name, siteUrl: [data.link] });
      }
    });
    setValues({
      ...values,
      socialNetworks: networkValues,
    });
    setInitialVal({
      ...values,
      socialNetworks: networkValues,
    });
    data === null
      ? Services.generalProfileService.create(
          {
            ...values,
            socialNetworks: networkValues,
          },
          JSON.parse(sessionStorage.getItem("token"))
        )
      : Services.generalProfileService.update(
          {
            ...values,
            socialNetworks: networkValues,
          },
          JSON.parse(sessionStorage.getItem("token"))
        );
  };
  const saveProfile = () => {
    if (validateGeneral()) {
      updateValues();
      if (joinInStatus) {
        setProfileCompletion((parseInt(profileCompletion) + 60).toString());
        setSelection("Hobbies");
      }
      setUpdate(true);
      return true;
    }
    return false;
  };
  const networkDisplay = {
    Facebook: (
      <span className="color--grey-darkest">
        <FacebookRoundedIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
      </span>
    ),
    Twitter: (
      <span className="color--grey-darkest">
        <TwitterIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
      </span>
    ),
    Instagram: (
      <span className="color--grey-darkest">
        <InstagramIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
      </span>
    ),
    Other: (
      <CircleIcon className="social-icons m-r-8 valign-mid" fontSize="small" />
    ),
  };

  useEffect(() => {
    if (data !== null) {
      setValues(data);
      setInitialVal(data);
    }
    if (joinInStatus) {
      setEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <div className="df-as-jb">
        <div className="dfc">
          <span className="main-profile__heading main-profile__heading--required">
            Full Name
          </span>
          <span className="main-profile__content">{values.fullName}</span>
        </div>
        <button className="main-profile__btn" onClick={() => setEdit(true)}>
          <EditIcon
            fontSize="small"
            className="color--purple valign-mid m-r-8"
          />
          Edit Profile
        </button>
      </div>
      <span
        className={`main-profile__heading main-profile__heading--required ${
          mobile ? "m-t-24" : "m-t-32"
        }`}
      >
        Display Name
      </span>
      <span className={`main-profile__content ${mobile ? "m-b-24" : "m-b-32"}`}>
        {values.displayName}
      </span>
      <span className="main-profile__heading main-profile__heading--required">
        Profile URL
      </span>
      <a
        className="main-profile__content m-b-32 color--purple"
        href={"https://hobbycue.com/member/" + values.profileUrl}
        rel="noreferrer"
        target="_blank"
      >
        <span style={{ overflowWrap: "break-word" }}>
          {"https://hobbycue.com/member/" + values.profileUrl}
        </span>
      </a>
      <span className="main-profile__heading main-profile__heading--required">
        About
      </span>
      <span className={`main-profile__content ${mobile ? "m-b-24" : "m-b-32"}`}>
        {values.about}
      </span>
      <div className="df-ac">
        <div className="dfc" style={{ marginRight: "7.5rem" }}>
          <span className="main-profile__heading ">Gender</span>
          <span
            className={`main-profile__content ${mobile ? "m-b-24" : "m-b-32"}`}
          >
            {values.gender}
          </span>
        </div>
        <div className="dfc">
          <span className="main-profile__heading ">Year Of Birth</span>
          <span
            className={`main-profile__content ${mobile ? "m-b-24" : "m-b-32"}`}
          >
            {values.yearOfBirth}
          </span>
        </div>
      </div>
      <span className="main-profile__heading ">Website URL</span>
      <a
        className="main-profile__content m-b-32 color--purple"
        href={
          values.websiteUrl && values.websiteUrl.includes("http")
            ? values.websiteUrl
            : "http://" + values.websiteUrl
        }
        rel="noreferrer"
        target="_blank"
      >
        <span style={{ overflowWrap: "anywhere" }}>{values.websiteUrl}</span>
      </a>
      <span className={`main-profile__heading ${mobile ? "m-b-8" : "m-b-12"}`}>
        Social Networks
      </span>
      {values.socialNetworks.map((element) => {
        return (
          <div className="df-as m-b-16" key={element.siteName}>
            <div className="dfc">
              {element.siteUrl.map((link, index) => {
                return (
                  <div className="m-b-16" key={index}>
                    {networkDisplay[element.siteName]}
                    <a
                      className="main-profile__content color--purple"
                      href={link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span style={{ overflowWrap: "anywhere" }}>{link}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <ProfileForm
        title={joinInStatus ? "Let's Setup Your User Profile" : "Edit Profile"}
        open={edit}
        setOpen={setEdit}
        scrollDown={scrollDown}
        setScrollDown={setScrollDown}
        data={
          <EditPopup
            handleInput={handleInput}
            handleUrl={handleUrl}
            values={values}
            setValues={setValues}
            error={error}
            socialNetwork={socialNetwork}
            setSocialNetwork={setSocialNetwork}
            setScrollDown={setScrollDown}
          />
        }
        changed={JSON.stringify(values) !== JSON.stringify(initialVal)}
        handleClick={saveProfile}
        onClose={() => setValues(data)}
      />
    </>
  );
}
