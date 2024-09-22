import React, { useRef, useState } from "react";
import { Button } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LockIcon from "@material-ui/icons/Lock";
import Popup from "../Popup";
import ForgetPass from "./ForgetPass";
import VerifyMail from "./VerifyMail";
import Controls from "../Controls/Controls";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import PageSpinner from "../PageSpinner";

export default function SignInForm() {
  const landingPageData = {
    email: "",
    forgetMail: "",
    password: "",
    rememberMe: false,
    search: "",
    invite: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };
  const { handleInput, values, setValues, validateEmail } =
    useForm(landingPageData);
  const [signIn, setSignIn] = useState(true);
  const [disableAgree, setDisableAgree] = useState(true);
  const [errors, setErrors] = useState({});
  const snackbarRef = useRef(null);
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [forgetPassPopup, setForgetPassPopup] = useState(false);
  const [forgetPassOtp, setForgetPassOtp] = useState(true);
  const [spin, setSpin] = useState(false);

  const validateSignIn = () => {
    let temp = {};
    temp.email = validateEmail(values.email)
      ? undefined
      : "Enter correct mail Id";
    temp.password = values.password ? undefined : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const signUp = () => {
    if (validateSignIn()) {
      setSpin(true);
      Services.signUpService.signIn(
        {
          email: values.email,
          password: values.password,
        },
        setErrors,
        setSpin
      );
    }
  };
  const joinIn = () => {
    if (validateSignIn()) {
      Services.joinInService.joinIn(
        {
          email: values.email,
          password: values.password,
        },
        setErrors,
        setVerifyPopup
      );
    }
  };
  const googleAuthSuccess = (e) => {
    setSpin(true);
    Services.oAuth.googleSignin({ tokenId: e.tokenId }, setSpin);
  };
  const googleAuthFailure = (e) => {
    console.log(e);
  };
  const facebookAuth = (e) => {
    setSpin(true);
    Services.oAuth.facebookSignin(
      {
        accessToken: e.accessToken,
        userID: e.userID,
      },
      setSpin
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn ? signUp() : joinIn();
  };
  const onVerify = () => {
    Services.joinInService.verifyUser(
      { email: values.email, otp: values.otp },
      setErrors
    );
  };
  const onSendOtp = () => {
    if (validateEmail(values.forgetMail)) {
      Services.passwordService.forgotPass(
        { email: values.forgetMail },
        setErrors,
        setForgetPassOtp
      );
    } else {
      setErrors({ forgetMail: "Enter correct mail Id" });
    }
  };
  const onConfirmChange = () => {
    if (values.newPassword === values.confirmPassword) {
      Services.passwordService.resetPass({
        email: values.email,
        otp: values.otp,
        password: values.newPassword,
      });
      setForgetPassPopup(false);
      snackbarRef.current.show();
      setForgetPassOtp(true);
      setValues(landingPageData);
    } else {
      setErrors({ confirmPassword: "Password doesn't match" });
    }
  };
  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <div className="form__options">
          <Button
            className={`form__login-btn ${
              signIn ? "form__login-btn--active" : ""
            }`}
            onClick={() => {
              setSignIn(true);
              setErrors({});
              setValues(landingPageData);
            }}
          >
            Sign In
          </Button>
          <Button
            className={`form__login-btn ${
              !signIn ? "form__login-btn--active" : ""
            }`}
            onClick={() => {
              setSignIn(false);
              setErrors({});
              setValues(landingPageData);
            }}
          >
            Join In
          </Button>
        </div>
        <Controls.ErrorInput
          placeholder="Email"
          value={values.email}
          name="email"
          onChange={handleInput}
          className="form__inputs"
          error={errors.email}
        />
        <Controls.PasswordInput
          placeholder="Password"
          value={values.password}
          name="password"
          checkStrength={!signIn}
          disableSave={setDisableAgree}
          onChange={handleInput}
          className="form__inputs m-t-16"
          error={errors.password}
        />
        <div
          className="form__footer"
          style={{
            justifyContent: !signIn ? "center" : "space-between",
            marginTop: signIn ? "1.5rem" : "0.75rem",
          }}
        >
          {signIn ? (
            <>
              <Controls.Checkbox
                name="rememberMe"
                uncheck={<CheckBoxOutlineBlankIcon fontSize="small" />}
                check={<CheckBoxIcon fontSize="small" />}
                value={values.rememberMe}
                onChange={handleInput}
                label={
                  <span
                    className="form__footer__btns"
                    style={{ textAlign: "left" }}
                  >
                    Remember Me
                  </span>
                }
              />
              <button
                className="form__footer__btns"
                onClick={() => {
                  setForgetPassPopup(true);
                }}
                type="button"
              >
                <LockIcon className="lock-icon" />
                Forgot password?
              </button>
            </>
          ) : (
            <div className="form__footer__btns">
              <span style={{ color: "#6D747A", lineHeight: "1.125rem" }}>
                By continuing, you agree to our{" "}
              </span>
              Terms of Service
              <span style={{ color: "#6D747A", lineHeight: "1.125rem" }}>
                {" "}
                and
              </span>{" "}
              Privacy Policy.
            </div>
          )}
        </div>
        <Button
          className={`form__submit-btn ${
            !signIn && disableAgree ? "btn--disabled" : ""
          }`}
          type={signIn ? "submit" : disableAgree ? "button" : "submit"}
        >
          {signIn ? "Continue" : "Agree and Continue"}
        </Button>
        <div className="form__separator">
          <span className="separator__txt">Or connect with</span>
        </div>
        <GoogleLogin
          clientId="795616019189-b0s94ri1i98355rjv1pg6ai588k0k87d.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button className="form__google" onClick={renderProps.onClick}>
              Continue with Google
            </Button>
          )}
          onSuccess={googleAuthSuccess}
          onFailure={googleAuthFailure}
        />
        <FacebookLogin
          appId="1614660215286765"
          callback={facebookAuth}
          render={(renderProps) => (
            <Button className="form__facebook" onClick={renderProps.onClick}>
              Continue with Facebook
            </Button>
          )}
        />
      </form>
      <Popup
        open={forgetPassPopup}
        setOpen={setForgetPassPopup}
        data={
          <ForgetPass
            values={values}
            handleInput={handleInput}
            errors={errors}
            onSendOtp={onSendOtp}
            onConfirmChange={onConfirmChange}
            otp={forgetPassOtp}
          />
        }
        clearFields={() => {
          setValues(landingPageData);
        }}
        className={`verify-mail-popup--close ${
          forgetPassOtp ? "" : "forget-pass-popup--close"
        }`}
      />
      <Popup
        open={verifyPopup}
        setOpen={setVerifyPopup}
        data={
          <VerifyMail
            values={values}
            handleInput={handleInput}
            onClick={onVerify}
            errors={errors}
          />
        }
        clearFields={() => {
          setValues(landingPageData);
        }}
        className="verify-mail-popup--close"
      />
      {spin && <PageSpinner />}
      <Controls.Snackbar
        ref={snackbarRef}
        type="success"
        message="Password changed successfully"
      />
    </div>
  );
}
