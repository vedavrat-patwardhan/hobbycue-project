import React, { useEffect, useRef, useState } from "react";
import Controls from "../Controls/Controls";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import GetLocation from "../GetLocation";
import * as Services from "../../Service/Services";

export default function AddressPopup({
  values,
  setValues,
  handleInput,
  index,
  error,
}) {
  const location = GetLocation();
  const snackbarRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    if (currentLocation && currentLocation.results.length > 0) {
      const locationArr =
        currentLocation.results[0].formatted_address.split(",");
      const street = locationArr.slice(0, locationArr.length - 3).join(",");
      if (index === undefined) {
        setValues({
          ...values,
          country: locationArr[locationArr.length - 1],
          state: locationArr[locationArr.length - 2].split(" ")[1],
          pincode: locationArr[locationArr.length - 2].split(" ")[2],
          city: locationArr[locationArr.length - 3],
          streetAddress: street,
        });
      } else {
        const valueUpdate = [
          "country",
          ["state", "pincode"],
          "city",
          "streetAddress",
        ];
        valueUpdate.forEach((name, index) => {
          if (index === 1) {
            handleInput({
              target: {
                name: name[0],
                value: locationArr[locationArr.length - 2].split(" ")[1],
              },
            });
            handleInput({
              target: {
                name: name[1],
                value: locationArr[locationArr.length - 2].split(" ")[2],
              },
            });
          } else if (index === 3) {
            handleInput({
              target: {
                name: name,
                value: street,
              },
            });
          } else {
            handleInput({
              target: {
                name,
                value: locationArr[locationArr.length - (index + 1)],
              },
            });
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation]);
  return (
    <div className="pv-16-ph-24">
      <div className="main-profile__heading">Street Address</div>
      <Controls.ErrorInput
        className="error-box m-t-4"
        placeholder="Enter address or click on GPS icon to the right"
        name="streetAddress"
        value={values.streetAddress}
        onChange={handleInput}
      />
      <GpsFixedIcon
        className="color--purple location-icon"
        onClick={() => {
          if (location.error) {
            snackbarRef.current.show();
          } else {
            Services.otherServices.getLocation(
              location.coordinated.lat,
              location.coordinated.lng,
              setCurrentLocation
            );
          }
        }}
      />
      <div className="df-ac m-t-32">
        <div className="width-50 m-r-24">
          <div className="main-profile__heading">Society</div>
          <Controls.ErrorInput
            className="error-box m-t-4"
            placeholder="Enter society name"
            name="society"
            value={values.society}
            onChange={handleInput}
            error={error.society}
          />
        </div>
        <div className="width-50">
          <div className="main-profile__heading">Locality</div>
          <Controls.ErrorInput
            className="error-box m-t-4 "
            placeholder="Enter locality"
            name="locality"
            value={values.locality}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="df-ac m-t-32">
        <div className="width-50 m-r-24">
          <div className="main-profile__heading main-profile__heading--required">
            City
          </div>
          <Controls.ErrorInput
            className="error-box m-t-4"
            placeholder="Enter city name"
            name="city"
            value={values.city}
            onChange={handleInput}
            error={error.city}
          />
        </div>
        <div className="width-50">
          <div className="main-profile__heading">Pin Code</div>
          <Controls.ErrorInput
            className="error-box m-t-4 "
            placeholder="Enter pin code"
            name="pincode"
            value={values.pincode}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="df-ac m-t-32">
        <div className="width-50 m-r-24">
          <div className="main-profile__heading main-profile__heading--required">
            State
          </div>
          <Controls.ErrorInput
            className="error-box m-t-4"
            placeholder="Enter state name"
            name="state"
            value={values.state}
            onChange={handleInput}
            error={error.state}
          />
        </div>
        <div className="width-50">
          <div className="main-profile__heading main-profile__heading--required">
            Country
          </div>
          <Controls.ErrorInput
            className="error-box m-t-4"
            placeholder="Enter country name"
            name="country"
            value={values.country}
            onChange={handleInput}
            error={error.country}
          />
        </div>
      </div>
      <Controls.Snackbar
        ref={snackbarRef}
        type="fail"
        message={location.error && location.error.message}
      />
    </div>
  );
}
