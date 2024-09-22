import React, { useEffect, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import validator from "validator";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const {
    error,
    placeholder,
    value,
    name,
    onChange,
    className,
    checkStrength,
    disableSave,
    focus,
  } = props;
  const focusRef = useRef(null);
  useEffect(() => {
    if (focus) {
      focusRef.current.focus();
    }
  }, [focus]);
  const [focused, setFocused] = useState(false);
  const [passStrength, setPassStrength] = useState(0);
  const [strength, setStrength] = useState("");
  const [length, setLength] = useState(false);
  const checkPassStrength = (data) => {
    data.length >= 8 ? setLength(true) : setLength(false);
    data.length > 0
      ? setStrength(
          validator.isStrongPassword(data, {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: true,
            pointsPerUnique: 0,
            pointsPerRepeat: 0,
            pointsForContainingLower: "L",
            pointsForContainingUpper: "U",
            pointsForContainingNumber: "N",
            pointsForContainingSymbol: "S",
          })
        )
      : setStrength("");
    if (
      validator.isStrongPassword(data, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
    ) {
      setPassStrength(2);
      disableSave(false);
    } else if (
      data.length >= 8 &&
      validator.isStrongPassword(data, {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: true,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 1,
        pointsForContainingUpper: 1,
        pointsForContainingNumber: 1,
        pointsForContainingSymbol: 1,
      }) === 3
    ) {
      setPassStrength(1);
      disableSave(false);
    } else {
      setPassStrength(0);
      disableSave(true);
    }
  };
  const showConditions = () => {
    return (
      <div className="pass-conditions">
        <div className={length ? "valid" : "invalid"}>
          At least 8 character in length.
        </div>
        <div className={strength.includes("L") ? "valid" : "invalid"}>
          Lower case letters (a-z)
        </div>
        <div className={strength.includes("U") ? "valid" : "invalid"}>
          Upper case letters (A-Z)
        </div>
        <div className={strength.includes("N") ? "valid" : "invalid"}>
          Numbers (0-9)
        </div>
        <div className={strength.includes("S") ? "valid" : "invalid"}>
          Special characters (@,#,$)
        </div>
      </div>
    );
  };
  useEffect(() => {
    checkStrength && checkPassStrength(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const passLevel = ["Too weak", "Could be strong", "Strong password"];
  const showPassStrength = () => {
    return (
      <div className="df-ac-jb">
        <div className="df-ac">
          <div
            className={`pass-strenght ${
              passStrength > 0 ? "week--active" : "weak"
            }`}
          />
          <div
            className={`pass-strenght ${passStrength >= 1 ? "average" : ""}`}
          />
          <div
            className={`pass-strenght ${passStrength === 2 ? "strong" : ""}`}
          />
        </div>
        <div className="pass-level">{passLevel[passStrength]}</div>
      </div>
    );
  };

  return (
    <div className="dfc width-100">
      <div
        className={`df-ac-jb ${className}`}
        style={{ border: error === undefined ? "" : "1px solid #C0504D" }}
      >
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          ref={focusRef}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="pass-input"
        />
        {show ? (
          <Visibility
            fontSize="small"
            onClick={() => setShow(false)}
            className="cursor-pointer"
          />
        ) : (
          <VisibilityOff
            fontSize="small"
            onClick={() => setShow(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      {error !== undefined && <span className="error-field">{error}</span>}
      {checkStrength && showPassStrength()}
      {checkStrength && focused && showConditions()}
    </div>
  );
}
