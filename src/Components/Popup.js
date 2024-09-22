import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Popup(props) {
  const { open, setOpen, data, className, clearFields } = props;

  const handleClose = () => {
    setOpen(false);
    clearFields !== undefined && clearFields();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <CloseRoundedIcon className={className} onClick={handleClose} />
        <div className="popup-window">{data}</div>
      </Dialog>
    </div>
  );
}
