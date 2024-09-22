import React from "react";
import Controls from "../Controls/Controls";

export default function DeactivateAccount({
  values,
  handleInput,
  error,
  onClick,
}) {
  return (
    <div className="dfc" style={{ alignItems: "center" }}>
      <span className="forget-pass">Verify yourself</span>
      <span className="forget-pass__info m-b-16">
        For security purposes, please enter your password in order to deactivate
        your account.{" "}
      </span>
      <Controls.PasswordInput
        className="error-box"
        placeholder="Password"
        name="pass"
        value={values.pass}
        onChange={handleInput}
        error={error}
      />
      <button className="forget-pass-btn m-t-32" onClick={onClick}>
        Deactivate account
      </button>
    </div>
  );
}
