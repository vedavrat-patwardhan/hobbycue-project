import React from "react";
import Controls from "../Controls/Controls";

export default function VerifyMail({ handleInput, values, onClick, errors }) {
  return (
    <div className="dfc" style={{ alignItems: "center" }}>
      <span className="forget-pass">Verify your email</span>
      <span className="forget-pass__info m-b-16">
        We've sent a verification code to{" "}
        <span style={{ color: "#000" }}>{values.email}</span> Please check your
        e-mail and enter that code below to proceed.
      </span>
      <Controls.ErrorInput
        className="error-box"
        placeholder="Verification code"
        onChange={handleInput}
        name="otp"
        value={values.otp}
        error={errors.otp}
      />
      <button className="forget-pass-btn m-t-32" onClick={onClick}>
        Verify Email
      </button>
    </div>
  );
}
