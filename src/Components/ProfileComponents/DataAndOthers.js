import React, { useRef, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Controls from "../Controls/Controls";
import Popup from "../Popup";
import DeleteAccountPopup from "./DeleteAccountPopup";
import DeactivateAccountPopup from "./DeactivateAccountPopup";
import * as Services from "../../Service/Services";
import { useForm } from "../useForm";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DataAndOthers({ mobile }) {
  const matches = useMediaQuery("(max-width:768px)");
  const token = JSON.parse(sessionStorage.getItem("token"));
  const snackbarRef = useRef(null);
  const [terms, setTerms] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deactivatePopup, setDeactivatePopup] = useState(false);
  const [error, setError] = useState(undefined);
  const accountPass = { pass: "" };
  const { values, setValues, handleInput } = useForm(accountPass);
  const onDelete = () => {
    Services.otherServices.deleteAccount(
      { password: values.pass },
      token,
      setDeletePopup,
      setError
    );
  };
  const onDactivate = () => {
    Services.otherServices.deactivateAccount(
      { password: values.pass },
      token,
      setDeactivatePopup,
      setError
    );
  };
  return (
    <>
      <span className={`main-profile__heading ${mobile ? "m-b-12" : "m-b-24"}`}>
        Export Personal Data
      </span>
      <span className="main-profile__simple-txt m-b-16">
        If you want to make a request, please click on the button below:
      </span>
      <button
        className={`main-profile__cancel-btn ${matches ? "width-100" : ""}`}
        onClick={() => {
          snackbarRef.current.show();
        }}
      >
        Request personal data export
      </button>
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-t-16 m-b-16" : "m-b-24 m-t-24"
        }`}
      />
      <span className={`main-profile__heading ${mobile ? "m-b-12" : "m-b-24"}`}>
        Deactivate Account
      </span>
      <span className="main-profile__simple-txt m-b-16">
        You won’t be able to use your account.
      </span>
      <button
        className={`main-profile__cancel-btn ${matches ? "width-100" : ""}`}
        onClick={() => {
          setDeactivatePopup(true);
        }}
      >
        Deactivate account
      </button>
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-t-16 m-b-16" : "m-b-24 m-t-24"
        }`}
      />
      <span className={`main-profile__heading ${mobile ? "m-b-12" : "m-b-24"}`}>
        Delete Account
      </span>
      <span className="main-profile__simple-txt m-b-16">
        Deleting your account will delete all of the content you have created.
        It will be completely irrecoverable.
      </span>
      <Controls.Checkbox
        name="primaryAddress"
        uncheck={<CheckBoxOutlineBlankIcon fontSize="small" />}
        check={<CheckBoxIcon fontSize="small" />}
        value={terms}
        onClick={() => setTerms(!terms)}
        label={<span className="ft-sz-12">I understand the consequences.</span>}
      />
      <button
        className={`main-profile__cancel-btn m-t-16 ${
          matches ? "width-100" : ""
        } ${terms ? "" : "btn--disabled"}`}
        onClick={() => {
          terms && setDeletePopup(true);
        }}
      >
        Delete account
      </button>
      <Popup
        open={deletePopup}
        setOpen={setDeletePopup}
        data={
          <DeleteAccountPopup
            values={values}
            handleInput={handleInput}
            error={error}
            onClick={onDelete}
          />
        }
        clearFields={() => {
          setValues({ pass: "" });
        }}
        className="verify-mail-popup--close"
      />
      <Popup
        open={deactivatePopup}
        setOpen={setDeactivatePopup}
        data={
          <DeactivateAccountPopup
            values={values}
            handleInput={handleInput}
            error={error}
            onClick={onDactivate}
          />
        }
        clearFields={() => {
          setValues({ pass: "" });
        }}
        className="verify-mail-popup--close"
      />
      <Controls.Snackbar
        ref={snackbarRef}
        message="Request sent successfully."
        type="success"
      />
    </>
  );
}
