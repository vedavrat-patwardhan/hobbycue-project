import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Google from "../../Assets/Google.svg";
import Facebook from "../../Assets/Facebook.svg";
import ProfileForm from "../ProfileForm";
import ChangePassPopup from "./ChangePassPopup";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default function LoginAndSecurity({ mobile, data, setUpdate }) {
  const [mail, setMail] = useState("");
  const [changePassDisable, setChangePassDisable] = useState(true);
  const changePassData = {
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  };
  const { values, handleInput } = useForm(changePassData);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [changePass, setChangePass] = useState(false);
  const [error, setError] = useState({});
  const validatePass = () => {
    let temp = {};
    temp.currentPass = values.currentPass
      ? undefined
      : "This field is required.";
    temp.confirmNewPass =
      values.confirmNewPass === values.newPass
        ? undefined
        : "Password doesn't match";
    setError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const savePass = () => {
    if (validatePass()) {
      Services.passwordService.changePass(
        { oldPassword: values.currentPass, newPassword: values.newPass },
        error,
        setError,
        setChangePass
      );
    }
  };
  const pairingGoogle = () => {
    Services.oAuth.googleDisconnect(token);
    setUpdate(true);
  };
  const googleAuthSuccess = (e) => {
    Services.oAuth.googleConnect({ tokenId: e.tokenId }, token);
    setUpdate(true);
  };
  const googleAuthFailure = (e) => {
    console.log(e);
  };
  const facebookAuth = (e) => {
    Services.oAuth.facebookConnect(
      {
        accessToken: e.accessToken,
        userID: e.userID,
      },
      token
    );
    setUpdate(true);
  };
  const pairingFacebook = () => {
    Services.oAuth.facebookConnect(token);
    setUpdate(true);
  };
  useEffect(() => {
    if (data !== null) {
      setMail(data.email);
    }
  }, [data]);
  return (
    <>
      <span className="main-profile__heading">Email Login</span>
      <span
        className={`main-profile__simple-txt ${
          mobile ? "m-t-12 m-b-8" : "m-t-24 m-b-16"
        }`}
      >
        {mail}
      </span>
      <button
        className="main-profile__btn"
        style={{ alignSelf: "start" }}
        onClick={() => {
          setChangePass(true);
        }}
      >
        <EditIcon
          style={{ fontSize: "1rem", padding: 0 }}
          className="valign-mid m-r-8"
        />
        Change Password
      </button>
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-b-16 m-t-16" : "m-b-24 m-t-32"
        }`}
      />
      <span className="main-profile__heading m-b-24">Social Media Login</span>
      <div className="df-ac-jb m-b-24">
        <div className="df-ac">
          <img
            src={data.google === null ? Google : data.google.picture}
            alt=""
            className="m-r-8 brd-r-50"
            width="32"
            height="32"
          />
          <span className="main-profile__simple-txt">
            {data.google === null ? "Connect with Google" : data.google.name}
          </span>
        </div>
        <GoogleLogin
          clientId="795616019189-b0s94ri1i98355rjv1pg6ai588k0k87d.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="main-profile__cancel-btn"
              onClick={
                data.google === null ? renderProps.onClick : pairingGoogle
              }
            >
              {data.google === null ? "Connect" : "Disconnect"}
            </button>
          )}
          onSuccess={googleAuthSuccess}
          onFailure={googleAuthFailure}
        />
      </div>
      <div className="df-ac-jb">
        <div className="df-ac">
          <img
            src={
              data.facebook === null ? Facebook : data.facebook.picture.data.url
            }
            alt=""
            className="m-r-8 brd-r-50"
            width="32"
            height="32"
          />
          <span className="main-profile__simple-txt">
            {data.facebook === null
              ? "Connect with Facebook"
              : data.facebook.name}
          </span>
        </div>
        <FacebookLogin
          appId="1614660215286765"
          callback={facebookAuth}
          render={(renderProps) => (
            <button
              className="main-profile__cancel-btn"
              onClick={
                data.facebook === null ? renderProps.onClick : pairingFacebook
              }
            >
              {data.facebook === null ? "Connect" : "Disconnect"}
            </button>
          )}
        />
      </div>
      <ProfileForm
        title="Change Password"
        open={changePass}
        setOpen={setChangePass}
        data={
          <ChangePassPopup
            error={error}
            handleInput={handleInput}
            values={values}
            disableSave={setChangePassDisable}
          />
        }
        disableSave={changePassDisable}
        handleClick={savePass}
      />
    </>
  );
}
