import React, { useEffect, useRef, useState } from "react";
import Controls from "../Controls/Controls";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function EditPopup(props) {
  const matches = useMediaQuery("(max-width:768px)");
  const errorRef = useRef(null);
  const [autoFocus, setAutoFocus] = useState([false]);
  const {
    handleInput,
    handleUrl,
    values,
    setValues,
    error,
    socialNetwork,
    setSocialNetwork,
    setScrollDown,
  } = props;
  const [genderData, setGenderData] = useState({
    male: true,
    female: false,
  });
  const handleGenederChange = (e) => {
    const { name, value } = e.target;
    if (name === "male") {
      setGenderData({
        male: value,
        female: !value,
      });
      setValues({
        ...values,
        gender: value ? "male" : "female",
      });
    } else {
      setGenderData({
        female: value,
        male: !value,
      });
      setValues({
        ...values,
        gender: !value ? "male" : "female",
      });
    }
  };

  const handleNetwork = (e, index) => {
    let updateNetwork = [...socialNetwork];
    let value = e.target.value;
    value = value.replace(/\s+/g, "-").toLowerCase();
    updateNetwork[index] = {
      ...socialNetwork[index],
      link: value,
    };
    setSocialNetwork([...updateNetwork]);
  };
  const setDropdown = (state, index) => {
    let updateNetwork = [...socialNetwork];
    updateNetwork[index] = {
      ...socialNetwork[index],
      open: state,
    };
    setSocialNetwork([...updateNetwork]);
  };
  const networkDisplay = {
    Facebook: (
      <span className="color--grey-darkest">
        <FacebookRoundedIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
        {!matches && "Facebook"}
      </span>
    ),
    Twitter: (
      <span className="color--grey-darkest">
        <TwitterIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
        {!matches && "Twitter"}
      </span>
    ),
    Instagram: (
      <span className="color--grey-darkest">
        <InstagramIcon
          className="social-icons m-r-8 valign-mid"
          fontSize="small"
        />
        {!matches && "Instagram"}
      </span>
    ),
    Other: <span className="color--grey-darkest">Other</span>,
  };
  const networkLinks = {
    Facebook: "https://www.facebook.com/",
    Twitter: "https://twitter.com/",
    Instagram: "https://www.instagram.com/",
    Other: "",
  };
  const handleNetworkName = (name, index) => {
    let updateNetwork = [...socialNetwork];
    updateNetwork[index] = {
      ...socialNetwork[index],
      name: name,
      selected: networkDisplay[name],
      open: false,
      link: networkLinks[name],
    };
    setSocialNetwork([...updateNetwork]);
    let updateAutoFocus = [...autoFocus];
    updateAutoFocus[index] = true;
    setAutoFocus([...updateAutoFocus]);
  };
  const setSocial = (network) => {
    const socialData = [];
    network.forEach((element) => {
      element.siteUrl.forEach((value) => {
        socialData.push({
          name: element.siteName,
          link: value,
          selected: networkDisplay[element.siteName],
          open: false,
        });
      });
    });
    setSocialNetwork([...socialData]);
  };
  const [displayAuto, setDisplayAuto] = useState(true);
  const [profileAuto, setProfileAuto] = useState(true);
  const autoFill = (e) => {
    const { name, value } = e.target;
    if (displayAuto && profileAuto) {
      setValues({
        ...values,
        [name]: value,
        displayName: value.split(" ")[0],
        profileUrl: value.replace(/\s+/g, "-").toLowerCase(),
      });
    } else if (displayAuto && !profileAuto) {
      setValues({
        ...values,
        [name]: value,
        displayName: value.split(" ")[0],
      });
    } else if (!displayAuto && profileAuto) {
      setValues({
        ...values,
        [name]: value,
        profileUrl: value.replace(/\s+/g, "-").toLowerCase(),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    setSocial(values.socialNetworks);
    values.gender !== undefined &&
      handleGenederChange({
        target: {
          name: values.gender,
          value: true,
        },
      });
    if (!Object.values(error).every((x) => x === undefined)) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, values.socialNetworks]);
  useEffect(() => {
    if (values.displayName !== "") {
      setDisplayAuto(false);
    }
    if (values.profileUrl !== "") {
      setProfileAuto(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="edit-profile-popup">
      <span
        className="main-profile__heading main-profile__heading--required"
        ref={errorRef}
      >
        Full Name
      </span>
      <Controls.ErrorInput
        className="error-box m-t-4"
        placeholder="Full name"
        focus={true}
        name="fullName"
        value={values.fullName}
        onChange={autoFill}
        error={error.fullName}
      />
      <div className="main-profile__heading main-profile__heading--required m-t-32">
        Display Name
      </div>
      <Controls.ErrorInput
        className="error-box m-t-4"
        placeholder="Name"
        name="displayName"
        value={values.displayName}
        onChange={handleInput}
        error={error.displayName}
      />
      <div className="main-profile__heading main-profile__heading--required m-t-32">
        Profile URL
      </div>
      <div className={matches ? "dfc m-t-4" : "df-ac m-t-4"}>
        <span
          className={`main-profile__heading ${matches ? "m-b-4" : "m-r-8"}`}
          style={{ fontWeight: 600 }}
        >
          https://hobbycue.com/member/
        </span>
        <Controls.ErrorInput
          className="error-box"
          placeholder="profile-url"
          name="profileUrl"
          value={values.profileUrl}
          onChange={handleUrl}
          error={error.profileUrl}
        />
      </div>
      <div className="main-profile__heading main-profile__heading--required m-t-32">
        About
      </div>
      <textarea
        style={{ border: error.about === undefined ? "" : "1px solid #C0504D" }}
        className={`edit-profile-popup__textarea color--black ${
          error.about === undefined ? "" : "error-border"
        }`}
        placeholder="Description"
        name="about"
        value={values.about}
        onChange={handleInput}
      />
      <span className="error-field">{error.about}</span>
      <div className="df-ac">
        <div style={{ width: "50%", marginRight: "1.5rem" }}>
          <div className="main-profile__heading m-t-32">Year Of Birth</div>
          <input
            type="number"
            className="error-box m-t-4"
            placeholder="Year"
            name="yearOfBirth"
            min={new Date().getFullYear() - 103}
            max={new Date().getFullYear() - 13}
            value={values.yearOfBirth}
            onChange={handleInput}
          />
        </div>
        <div>
          <div className="main-profile__heading m-t-32">Gender</div>
          <div className="df-ac">
            <Controls.Checkbox
              name="male"
              uncheck={<RadioButtonUncheckedIcon className="ft-sz-16" />}
              check={<RadioButtonCheckedIcon className="ft-sz-16" />}
              value={genderData.male}
              onChange={handleGenederChange}
              label={<span className={matches ? "ft-sz-12" : ""}>Male</span>}
            />
            <Controls.Checkbox
              name="female"
              uncheck={<RadioButtonUncheckedIcon className="ft-sz-16" />}
              check={<RadioButtonCheckedIcon className="ft-sz-16" />}
              value={genderData.female}
              onChange={handleGenederChange}
              label={<span className={matches ? "ft-sz-12" : ""}>Female</span>}
            />
          </div>
        </div>
      </div>
      <div className="main-profile__heading m-t-32">Website URL</div>
      <Controls.ErrorInput
        className="error-box m-t-4"
        placeholder="URL"
        name="websiteUrl"
        value={values.websiteUrl}
        onChange={handleUrl}
        error={error.websiteUrl}
      />
      <div className="df-ac-jb m-t-32">
        <div className="main-profile__heading">Social Networks</div>
        <button
          type="button"
          className="main-profile__btn"
          onClick={() => {
            setAutoFocus(Array(socialNetwork.length + 1).fill(false));
            setSocialNetwork([
              ...socialNetwork,
              { name: "", link: "", selected: undefined, open: false },
            ]);
            setScrollDown(true);
          }}
        >
          + Add new
        </button>
      </div>
      {socialNetwork.map((network, index) => {
        return (
          <div className="df-ac-jb m-t-24" key={index}>
            <Controls.Options
              onClick={() => {
                setScrollDown(true);
              }}
              open={network.open}
              setOpen={setDropdown}
              index={index}
              title="Select Social Network"
              showSelected={networkDisplay[network.name]}
              titleClass="social-media__dropdown m-r-12"
              listClass={
                network.open ? "social-drop__list" : "social-drop__list--hide"
              }
              data={[
                <button
                  type="button"
                  className="list-item p-a-12"
                  onClick={() => {
                    handleNetworkName("Facebook", index);
                  }}
                >
                  Facebook
                </button>,
                <button
                  type="button"
                  className="list-item p-a-12"
                  onClick={() => {
                    handleNetworkName("Twitter", index);
                  }}
                >
                  Twitter
                </button>,
                <button
                  type="button"
                  className="list-item p-a-12"
                  onClick={() => {
                    handleNetworkName("Instagram", index);
                  }}
                >
                  Instagram
                </button>,
                <button
                  type="button"
                  className="list-item p-a-12"
                  onClick={() => {
                    handleNetworkName("Other", index);
                  }}
                >
                  Other
                </button>,
              ]}
            />
            <Controls.ErrorInput
              className="error-box m-t-4"
              placeholder="https://www.example.com/"
              name="link"
              value={network.link}
              focus={autoFocus[index]}
              onChange={(e) => {
                handleNetwork(e, index);
              }}
            />
            <DeleteIcon
              className="m-l-16 cursor-pointer color--grey-light"
              onClick={() => {
                let newVal = [...socialNetwork];
                newVal.splice(index, 1);
                setSocialNetwork([...newVal]);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
