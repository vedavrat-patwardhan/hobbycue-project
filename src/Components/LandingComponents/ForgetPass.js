import React from "react";
import Controls from "../Controls/Controls";

export default function ForgetPass({
  values,
  handleInput,
  errors,
  onSendOtp,
  onConfirmChange,
  otp,
}) {
  const [disableReset, setDisableReset] = React.useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    otp ? onSendOtp() : !disableReset && onConfirmChange();
  };
  return (
    <div className="dfc" style={{ alignItems: "center" }}>
      <span className="forget-pass">Forget Password</span>
      <form onSubmit={handleSubmit} className="width-100">
        {otp ? (
          <>
            <div className="forget-pass__info m-b-16">
              Enter the email address below to get forget password link to reset
              your hobbycue password.
            </div>
            <Controls.ErrorInput
              focus={true}
              className="error-box"
              placeholder="Email address"
              onChange={handleInput}
              name="forgetMail"
              value={values.forgetMail}
              error={errors.forgetMail}
            />
          </>
        ) : (
          <>
            <div className="forget-pass__name">OTP</div>
            <Controls.ErrorInput
              focus={true}
              className="error-box m-b-32"
              placeholder="OTP sent to your Email"
              onChange={handleInput}
              name="otp"
              value={values.otp}
              error={errors.otp}
            />
            <div className="forget-pass__name">New Password</div>
            <Controls.PasswordInput
              className="error-box "
              placeholder="Enter new password"
              onChange={handleInput}
              checkStrength={true}
              disableSave={setDisableReset}
              name="newPassword"
              value={values.newPassword}
              error={errors.newPassword}
            />
            <div className="forget-pass__name m-t-32">Confirm New Password</div>
            <Controls.PasswordInput
              className="error-box"
              placeholder="Confirm your new password"
              onChange={handleInput}
              name="confirmPassword"
              value={values.confirmPassword}
              error={errors.confirmPassword}
            />
          </>
        )}
        <button
          className={`forget-pass-btn m-t-32 ${
            !otp && disableReset ? "btn--disabled" : ""
          }`}
          type={otp ? "submit" : disableReset ? "button" : "submit"}
        >
          {otp ? "Send" : "Reset"}
        </button>
      </form>
    </div>
  );
}
