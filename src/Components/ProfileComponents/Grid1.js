import React, { useEffect, useRef, useState } from "react";
import Progressbar from "../Progressbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import * as Services from "../../Service/Services";
import Cropper from "react-easy-crop";
import getCroppedImg from "../CropImage";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function Grid1({
  matches,
  data,
  matches1,
  profileCompletion,
  setMasking,
}) {
  //const token = JSON.parse(sessionStorage.getItem("token"));
  const [imageUrl, setImageUrl] = useState(null);
  const inputElProfile = useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const handleProfileDp = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setMasking(true);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setProfilePic(reader.result);
      });
    }
  };
  const uploadImg = async () => {
    const canvas = await getCroppedImg(profilePic, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    //Services.imageService.uploadProfilePhoto(canvasDataUrl, token);
    setImage(canvasDataUrl);
    setProfilePic(null);
    setMasking(false);
  };
  useEffect(() => {
    if (data.user.google) {
      setImageUrl(data.user.google.picture);
    }
    if (data.user.facebook) {
      setImageUrl(data.user.facebook.picture.data.url);
    }
  }, [data.user.facebook, data.user.google]);
  return (
    <div className="main-sec__profile-logo">
      <input
        type="file"
        accept="image/*"
        onChange={handleProfileDp}
        style={{ display: "none" }}
        ref={inputElProfile}
      />
      {profilePic && (
        <div className="image-popup">
          <div className="cropper">
            <Cropper
              image={profilePic}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="upload">
            <div className="df-ac-je width-50">
              <button onClick={uploadImg} className="main-profile__accept-btn">
                Upload
              </button>
              <button
                onClick={() => {
                  setMasking(false);
                  setProfilePic(null);
                }}
                className="main-profile__cancel-btn"
              >
                Cancel
              </button>
            </div>
            <div className="main-profile__heading p-a-12">
              Use your mouse scroll wheel or two fingers on the touchscreen or
              touchpad to zoom, and drag to reposition.
            </div>
          </div>
        </div>
      )}
      {image === null && imageUrl === null ? (
        <>
          <div
            className="add-image cursor-pointer"
            role="button"
            onClick={() => {
              inputElProfile.current.click();
            }}
          >
            <div className="image-icon">
              <CloudUploadIcon
                style={{ fontSize: matches ? "0.875rem" : "1.125rem" }}
              />
            </div>
            <div
              className={`color--purple bg-trans ft-wt-600 ln-ht-20 ${
                matches ? "ft-sz-8" : "ft-sz-14 m-t-8"
              }`}
            >
              Profile Photo
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            // src={`data:${data.profileImage.profilePic.contentType};base64,${baseFile}`}
            src={imageUrl === null ? image : imageUrl}
            alt="profile"
            className={`brd-r-50 ${matches1 ? "m-r-8" : ""}`}
            width={matches1 ? "80" : "160"}
            height={matches1 ? "80" : "160"}
          />
          <div
            className="profile-pic-reupload df-ac-jc"
            onClick={() => {
              inputElProfile.current.click();
            }}
          >
            <CameraAltIcon
              style={{ fontSize: matches1 ? "1rem" : "1.25rem" }}
            />
          </div>
        </>
      )}
      <div className="dfc-ac">
        <div className="profile__name">
          {data.general === null ? "" : data.general.displayName}
        </div>
        <div className="profile__completion">
          Your profile is
          <span className="complete"> {profileCompletion}% competed!</span>
        </div>
        <Progressbar progress={profileCompletion} height={10} />
      </div>
    </div>
  );
}
