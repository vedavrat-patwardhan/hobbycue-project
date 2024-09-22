import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

export default function Checkbox(props) {
  const { name, label, value, onChange, check, uncheck, onClick } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        style={{ margin: 0 }}
        control={
          <MuiCheckbox
            name={name}
            icon={uncheck}
            checkedIcon={check}
            className="color--purple"
            checked={value}
            onChange={(e) =>
              onClick === undefined
                ? onChange(convertToDefEventPara(name, e.target.checked))
                : onClick()
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
