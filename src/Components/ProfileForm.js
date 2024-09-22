import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Popup from "./Popup";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProfileForm(props) {
  const {
    open,
    setOpen,
    title,
    data,
    handleClick,
    onClose,
    acceptTxt,
    changed,
    disableSave,
    scrollDown,
    setScrollDown,
  } = props;
  const matches = useMediaQuery("(max-width:768px)");
  const [savePopup, setSavePopup] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    setScrollDown(false);
  };
  const handleClose = () => {
    onClose !== undefined && onClose();
    setOpen(false);
  };
  const handleCross = () => {
    changed ? setSavePopup(true) : handleClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick() && handleClose();
  };
  useEffect(() => {
    scrollDown && scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollDown]);
  return (
    <div>
      <Dialog
        fullScreen={matches}
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        onBackdropClick={() => {
          setOpen(true);
          handleCross();
        }}
      >
        <div className="profile-form">
          <div className="profile-form__heading">
            <span className="profile-form__title">{title}</span>
            <CloseRoundedIcon
              className="color--grey-darker cursor-pointer"
              onClick={handleCross}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>{data}</div>
            <div className="pv-16-ph-24">
              <button
                className={`main-profile__accept-btn ${
                  disableSave ? "btn--disabled" : ""
                }`}
                type={disableSave ? "button" : "submit"}
              >
                {acceptTxt === undefined ? "Save" : acceptTxt}
              </button>
              <button
                className="main-profile__cancel-btn"
                onClick={handleClose}
                type="button"
                ref={messagesEndRef}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
      <Popup
        open={savePopup}
        setOpen={setSavePopup}
        data={
          <div>
            <h4>Would you like to save before exit?</h4>
            <div className="df-ac-je">
              <button
                className="main-profile__accept-btn"
                onClick={() => {
                  setSavePopup(false);
                  handleClick() && handleClose();
                }}
              >
                Yes
              </button>
              <button
                className="main-profile__cancel-btn"
                style={{ width: "6.25rem" }}
                onClick={() => {
                  setSavePopup(false);
                  handleClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        }
        className="save-confirm-close"
      />
    </div>
  );
}
