import React, { useEffect, useRef } from "react";

export default function ErrorInput(props) {
  const { error, placeholder, value, name, onChange, className, focus } = props;
  const focusRef = useRef(null);
  useEffect(() => {
    if (focus) {
      focusRef.current.focus();
    }
  }, [focus]);
  return (
    <div className="dfc width-100">
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        ref={focusRef}
        onChange={onChange}
        className={`color--black ${className} ${
          error === undefined ? "" : "error-border"
        }`}
      />
      {error !== undefined && <span className="error-field">{error}</span>}
    </div>
  );
}
