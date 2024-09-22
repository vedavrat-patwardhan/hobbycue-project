import React from "react";
import Controls from "../Controls/Controls";

export default function ChangePassPopup({
  error,
  handleInput,
  values,
  disableSave,
}) {
  return (
    <div className="pv-16-ph-24">
      <div className="main-profile__heading">Current Password</div>
      <Controls.PasswordInput
        focus={true}
        placeholder="Enter current password"
        value={values.currentPass}
        name="currentPass"
        onChange={handleInput}
        className="error-box m-t-4"
        error={error.currentPass}
      />
      <div className="main-profile__heading m-t-32">New Password</div>
      <Controls.PasswordInput
        placeholder="Enter new password"
        value={values.newPass}
        name="newPass"
        onChange={handleInput}
        checkStrength={true}
        disableSave={disableSave}
        className="error-box m-t-4"
        error={error.newPass}
      />
      <div className="main-profile__heading m-t-32">Confirm New Password</div>
      <Controls.PasswordInput
        placeholder="Confirm your new password"
        value={values.confirmNewPass}
        name="confirmNewPass"
        onChange={handleInput}
        className="error-box m-t-4"
        error={error.confirmNewPass}
      />
    </div>
  );
}
