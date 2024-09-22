import { useEffect, useState } from "react";

export default function GetLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinated: { lat: 0, lng: 0 },
  });
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinated: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);
  return location;
}
