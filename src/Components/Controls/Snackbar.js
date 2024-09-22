import React, { useState, forwardRef, useImperativeHandle } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const Snackbar = forwardRef((props, ref) => {
  const { type, message } = props;
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);
    },
  }));
  return (
    <div
      className={`snackbar ${
        type === "success" ? "snackbar--success" : "snackbar--fail"
      }`}
      id={showSnackbar ? "show" : "hide"}
    >
      <div
        className={`snackbar__symbol ${
          type === "success"
            ? "snackbar__symbol--success"
            : "snackbar__symbol--fail"
        }`}
      >
        {type === "success" ? (
          <CheckCircleRoundedIcon className="color--white valign-mid" />
        ) : (
          <WarningRoundedIcon className="color--white valign-mid" />
        )}
      </div>
      <div>{message}</div>
    </div>
  );
});

export default Snackbar;
