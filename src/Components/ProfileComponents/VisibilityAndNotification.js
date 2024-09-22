import React, { useEffect, useState } from "react";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Controls from "../Controls/Controls";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";

export default function VisibilityAndNotification({
  mobile,
  data,
  setUpdate,
  mention,
}) {
  const [openPost, setOpenPost] = useState(false);
  const [openMentions, setOpenMentions] = useState(false);
  const profileSetting = {
    viewPosts: "Everyone",
    viewMentions: "Everyone",
    mention: true,
    repliesToPost: true,
    repliesToComment: true,
    acceptRequestToJoinHobbyCue: true,
    invitesToJoinAGroup: true,
    promotesToGroupAdmin: true,
    blocksFromGroup: true,
  };
  const { values, setValues, handleInput } = useForm(profileSetting);
  const notify = [
    {
      option: `Mentions me using @${mention
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
      name: "mention",
      state: values.mention,
    },
    {
      option: "Replies to my post",
      name: "repliesToPost",
      state: values.repliesToPost,
    },
    {
      option: "Replies to my comment",
      name: "repliesToComment",
      state: values.repliesToComment,
    },
    {
      option: "Accepts my request to join hobbycue",
      name: "acceptRequestToJoinHobbyCue",
      state: values.acceptRequestToJoinHobbyCue,
    },
    {
      option: "Invites me to join a group",
      name: "invitesToJoinAGroup",
      state: values.invitesToJoinAGroup,
    },
    {
      option: "Promotes me to a group admin",
      name: "promotesToGroupAdmin",
      state: values.promotesToGroupAdmin,
    },
    {
      option: "Blocks me from a group",
      name: "blocksFromGroup",
      state: values.blocksFromGroup,
    },
  ];
  const handleDrop = (name, value) => {
    let newVal = values;
    newVal[name] = value;
    Services.otherServices.visibilitySettings(
      newVal,
      JSON.parse(sessionStorage.getItem("token"))
    );
    setValues({ ...values, [name]: value });
    setUpdate(true);
  };
  const handleCheckbox = (e) => {
    const { name, value } = e.target;
    let newVal = values;
    newVal[name] = value;
    Services.otherServices.visibilitySettings(
      newVal,
      JSON.parse(sessionStorage.getItem("token"))
    );
    handleInput(e);
    setUpdate(true);
  };
  useEffect(() => {
    if (data !== null) {
      setValues(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      <span className="main-profile__heading">Who can view</span>
      <div className={mobile ? "dfc" : "df-ac-jb"}>
        <span
          className={`main-profile__simple-txt ${
            mobile ? "m-t-16 m-b-8" : "m-t-24 m-b-24"
          }`}
        >
          View my posts
        </span>
        <Controls.Options
          open={openPost}
          setOpen={setOpenPost}
          showSelected={values.viewPosts}
          titleClass="visibility-drop"
          listClass={
            openPost ? "visibility-droplist" : "new-hobby-droplist--hide"
          }
          data={[
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenPost(false);
                handleDrop("viewPosts", "Everyone");
              }}
            >
              Everyone
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenPost(false);
                handleDrop("viewPosts", "My city");
              }}
            >
              My city
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenPost(false);
                handleDrop("viewPosts", "My hobby group");
              }}
            >
              My hobby group
            </button>,
          ]}
        />
      </div>
      <div className={mobile ? "dfc" : "df-ac-jb"}>
        <span
          className={`main-profile__simple-txt ${mobile ? "m-t-24 m-b-8" : ""}`}
        >
          View my mentions
        </span>
        <Controls.Options
          open={openMentions}
          setOpen={setOpenMentions}
          showSelected={values.viewMentions}
          titleClass="visibility-drop"
          listClass={
            openMentions ? "visibility-droplist" : "new-hobby-droplist--hide"
          }
          data={[
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenMentions(false);
                handleDrop("viewMentions", "Everyone");
              }}
            >
              Everyone
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenMentions(false);
                handleDrop("viewMentions", "My city");
              }}
            >
              My city
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setOpenMentions(false);
                handleDrop("viewMentions", "My hobby group");
              }}
            >
              My hobby group
            </button>,
          ]}
        />
      </div>
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-t-16 m-b-16" : "m-t-24 m-b-24"
        }`}
      />
      <span className="main-profile__heading">Notify me when someone</span>
      {notify.map((element, index) => {
        return (
          <div className="df-ac-jb" key={index}>
            <span className="main-profile__simple-txt">{element.option}</span>
            <Controls.Checkbox
              name={element.name}
              label={<span style={{ margin: 0 }} />}
              uncheck={
                <ToggleOffIcon
                  fontSize="large"
                  className="color--grey-darker"
                />
              }
              check={
                <ToggleOnIcon fontSize="large" className="color--purple" />
              }
              value={values[element.name]}
              onChange={handleCheckbox}
            />
          </div>
        );
      })}
    </>
  );
}
