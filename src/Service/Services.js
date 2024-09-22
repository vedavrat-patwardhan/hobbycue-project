import axios from "axios";
import axiosInstance from "./AuthInterceptor";
const idtoken = "update it afterwards";

const setToken = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
  sessionStorage.setItem("page", true);
  window.location.reload();
};
export const joinInService = {
  joinIn(data, setErrors, setVerifyPopup) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/joinin`, data)
      .then(() => {
        setVerifyPopup(true);
      })
      .catch((err) => {
        setErrors({ email: err.response.data.message });
      });
  },
  verifyUser(data, setError) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/verify-user`, data)
      .then((res) => {
        sessionStorage.setItem("joinIn", true);
        setToken(res.data.token);
      })
      .catch((error) => {
        setError({ otp: error.response.data.message });
      });
  },
};

export const signUpService = {
  signIn(data, setError, setSpin) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/signin`, data)
      .then((res) => {
        setToken(res.data.token);
        setSpin(false);
      })
      .catch((error) => {
        const err = error.response.data.message;
        if (err === "invalid email" || err === "user not found") {
          setError({ email: err });
        } else {
          setError({ password: err });
        }
        setSpin(false);
      });
  },
  signOut(data) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/signout`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in Sign out", err);
      });
  },
};

export const passwordService = {
  forgotPass(data, setErrors, setForgetPassOtp) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/forgot-password`, data)
      .then(() => {
        setForgetPassOtp(false);
      })
      .catch((error) => {
        setErrors({ otp: error.response.data.message });
      });
  },
  verifyIdToken(id, token) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/auth/${id}/${token}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in Id Verification", err);
      });
  },
  resetPass(data) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/create-password`, data)
      .then()
      .catch((err) => {
        console.error("Error in Id Verification", err);
      });
  },
  changePass(data, error, setError, setChangePass) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/auth/change-password`, data)
      .then(() => {
        setChangePass(false);
      })
      .catch((err) => {
        if (err.response.data.message === "wrong password") {
          setError({ ...error, currentPass: err.response.data.message });
        }
      });
  },
};

export const generalProfileService = {
  create(data) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/general-profile`, data)
      .then()
      .catch((err) => {
        console.error("Error in creating general profile", err);
      });
  },
  update(data) {
    axiosInstance
      .put(`${process.env.REACT_APP_API_KEY}/profile/general-profile`, data)
      .then()
      .catch((err) => {
        console.error("Error in updating general profile", err);
      });
  },
};

export const paymentService = {
  addCard(data) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/card`, data)
      .then()
      .catch((err) => {
        console.error("Error in creating new card", err);
      });
  },
  updateCard(data) {
    axiosInstance
      .put(`${process.env.REACT_APP_API_KEY}/profile/card`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in updating card", err);
      });
  },
  setPrimaryCard(data, token) {
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}/profile/card/set-primary-card`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in seting primary card", err);
      });
  },
  delete(data, token) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/card`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        data
      )
      .then()
      .catch((err) => {
        console.error("Error in while deleting the card : " + err);
      });
  },
};

export const oAuth = {
  googleSignin(data, setSpin) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/google-signin`, data)
      .then((res) => {
        setToken(res.data.token);
        setSpin(false);
      })
      .catch((err) => {
        console.error("Error in fetching data from google", err);
        setSpin(false);
      });
  },
  googleConnect(data) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/google-connect`, data)
      .then()
      .catch((err) => {
        console.error("Error in fetching data from google", err);
      });
  },
  googleDisconnect(token) {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/profile/google-disconnect`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in disconnecting google", err);
      });
  },
  facebookSignin(data, setSpin) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/auth/facebook-signin`, data)
      .then((res) => {
        setToken(res.data.token);
        setSpin(false);
      })
      .catch((err) => {
        console.error("Error in fetching data from facebook", err);
        setSpin(false);
      });
  },
  facebookConnect(data, token) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/facebook-connect`, data)
      .then()
      .catch((err) => {
        console.error("Error in fetching data from facebook", err);
      });
  },
  facebookDisconnect(token) {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/profile/facebook-disconnect`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in disconnecting facebook", err);
      });
  },
};

export const profileService = {
  myProfile(token, setProfileData, setProfileCompletion) {
    axiosInstance
      .get(`${process.env.REACT_APP_API_KEY}/profile/me`)
      .then((res) => {
        const data = res.data;
        let count = 0;
        if (data.general !== null) {
          if (data.general.fullName !== "") {
            count += 1;
          }
          if (data.general.profileUrl !== "") {
            count += 1;
          }
          if (data.general.about !== "") {
            count += 1;
          }
        }
        if (data.hobbies !== null && data.hobbies.hobbies.length > 0) {
          count += 1;
        }
        if (data.address !== null && data.address.address.length > 0) {
          count += 1;
        }
        setProfileCompletion(count * 20);
        setProfileData(data);
      })
      .catch((err) => {
        console.error("Error in getting profile data", err);
      });
  },
  othersProfile(userName) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/profile/${userName}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in getting profile data", err);
      });
  },
};

export const hobbyService = {
  getHobby(setHobbies) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/profile/get-test-hobbies`)
      .then((res) => {
        setHobbies(res.data.hobbies);
      })
      .catch((err) => {
        console.error("Error in updating hobby", err);
      });
  },
  addHobby(data, token) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/hobby`, data)
      .then()
      .catch((err) => {
        console.error("Error in adding hobby", err);
      });
  },
  updateHobby(data, token) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/hobby`, data)
      .then()
      .catch((err) => {
        console.error("Error in updating hobby", err);
      });
  },
  deleteHobbyId(id, token) {
    axiosInstance
      .delete(`${process.env.REACT_APP_API_KEY}/profile/hobby/${id}`)
      .then()
      .catch((err) => {
        console.error("Error in deleting hobby by id", err);
      });
  },
  deleteHobbyUserId(data, userId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/hobby/${userId}`,
        {
          headers: {
            authorization: `Bearer ${idtoken}`,
          },
        },
        { data }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in deleting hobby by userId", err);
      });
  },
};

export const addressService = {
  addAddress(data) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/address`, data)
      .then()
      .catch((err) => {
        console.error("Error in adding Address", err);
      });
  },
  updateAddress(data) {
    axiosInstance
      .post(`${process.env.REACT_APP_API_KEY}/profile/address`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in updating Address", err);
      });
  },
  deleteAddressId(id) {
    axiosInstance
      .delete(`${process.env.REACT_APP_API_KEY}/profile/address/${id}`)
      .then()
      .catch((err) => {
        console.error("Error in deleting Address by id", err);
      });
  },
  deleteAddressUserId(data, userId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/address/${userId}`,
        {
          headers: {
            authorization: `Bearer ${idtoken}`,
          },
        },
        { data }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in deleting Address by userId", err);
      });
  },
  setPrimaryAddress(data, token) {
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}/profile/address/set-primary-address`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in seting primary Address", err);
      });
  },
};

export const imageService = {
  uploadProfilePhoto(data, token) {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/profile/upload-profile-picture`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in uploading profile photo", err);
      });
  },
  deleteProfilePhoto(data) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/delete-profile-picture`,
        {
          headers: {
            authorization: `Bearer ${idtoken}`,
          },
        },
        { data }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in deleting profile photo", err);
      });
  },
  uploadCoverPhoto(data, token) {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/profile/upload-cover-picture`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then()
      .catch((err) => {
        console.error("Error in uploading cover photo", err);
      });
  },
  deleteCoverPhoto(data) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/delete-cover-picture`,
        {
          headers: {
            authorization: `Bearer ${idtoken}`,
          },
        },
        { data }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error("Error in deleting cover photo", err);
      });
  },
};

export const otherServices = {
  visibilitySettings(data, token) {
    axiosInstance
      .put(`${process.env.REACT_APP_API_KEY}/profile/setting`, data)
      .then()
      .catch((err) => {
        console.error("Error visibility settings", err);
      });
  },
  trendingHobbies(setTrendingHobbies) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/profile/trending-hobbies`)
      .then((res) => {
        res.data.hobbies !== undefined && setTrendingHobbies(res.data.hobbies);
      })
      .catch((err) => {
        console.error("Error in Id Verification", err);
      });
  },
  deactivateAccount(data, token, setDeactivatePopup) {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/profile/deactivate-account`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDeactivatePopup(false);
      })
      .catch((err) => {
        console.error("Error visibility settings", err);
      });
  },
  deleteAccount(data, token, setDeletePopup, setError) {
    axios
      .delete(
        `${process.env.REACT_APP_API_KEY}/profile/delete-account`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        data
      )
      .then((res) => {
        setDeletePopup(false);
      })
      .catch((error) => {
        const err = error.response.data.message;
        console.error(err);
      });
  },
  getLocation(lat, lng, setCurrentLocation) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((res) => {
        setCurrentLocation(res.data);
      })
      .catch((err) => {
        console.error("Error in getting location", err);
      });
  },
};
