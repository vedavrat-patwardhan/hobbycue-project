import React from "react";
import Controls from "../Controls/Controls";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AddCardPopup({ values, handleInput, error }) {
  const matches = useMediaQuery("(max-width:768px)");
  const getMonths = () => {
    let months = [];
    for (let index = 1; index < 13; index++) {
      months.push(index);
    }
    return months;
  };
  const getYears = () => {
    let years = [];
    for (let index = new Date().getFullYear(); index < 2100; index++) {
      years.push(index);
    }
    return years;
  };

  return (
    <div className="pv-16-ph-24">
      <div className={matches ? "dfc" : "df-ac"}>
        <div className={matches ? "width-100" : "width-50 m-r-24"}>
          <div className="main-profile__heading">Card Number</div>
          <Controls.ErrorInput
            focus={true}
            className="error-box m-t-4"
            placeholder="Enter card number"
            name="cardNumber"
            value={values.cardNumber}
            onChange={handleInput}
            error={error.cardNumber}
          />
        </div>
        <div>
          <div className={`main-profile__heading ${matches ? "m-t-24" : ""}`}>
            Expiry Date
          </div>
          <div className="df-ac">
            <select
              name="expiryMonth"
              className="payment-dropdown m-r-8 m-t-4"
              defaultValue="1"
              onChange={handleInput}
            >
              {getMonths().map((month) => {
                return (
                  <option value={month} key={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            <select
              name="expiryYear"
              className="payment-dropdown m-t-4"
              defaultValue="1"
              onChange={handleInput}
            >
              {getYears().map((year) => {
                return (
                  <option value={year} key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="main-profile__heading m-t-32">Name On Card</div>
      <Controls.ErrorInput
        className="error-box m-t-4"
        placeholder="Enter name"
        name="nameOnCard"
        value={values.nameOnCard}
        onChange={handleInput}
        error={error.nameOnCard}
      />
    </div>
  );
}
