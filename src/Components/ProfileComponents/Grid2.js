import React, { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import * as Services from "../../Service/Services";
import Cropper from "react-easy-crop";
import getCroppedImg from "../CropImage";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function Grid2({ matches, data, setMasking }) {
  //const token = JSON.parse(sessionStorage.getItem("token"));
  const inputElCover = useRef(null);
  const [coverPic, setCoverPic] = useState(null);
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
        setCoverPic(reader.result);
      });
    }
  };
  const uploadImg = async () => {
    const canvas = await getCroppedImg(coverPic, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    //Services.imageService.uploadProfilePhoto(canvasDataUrl, token);
    setImage(canvasDataUrl);
    setCoverPic(null);
    setMasking(false);
  };
  const coverStyle = {
    cursor: "pointer",
    border: "1px dashed #000000",
    height: matches ? "6.5rem" : "",
  };
  return (
    <div className="main-sec__cover" style={image === null ? coverStyle : {}}>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfileDp}
        style={{ display: "none" }}
        ref={inputElCover}
      />
      {coverPic ? (
        <div className="image-popup">
          <div className="cropper">
            <Cropper
              image={coverPic}
              crop={crop}
              zoom={zoom}
              aspect={3}
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
                  setCoverPic(null);
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
      ) : null}
      {image === null ? (
        <>
          <div
            role="button"
            onClick={() => {
              inputElCover.current.click();
            }}
          >
            <div className="dfc-ac">
              <div className="image-icon">
                <CloudUploadIcon fontSize="small" />
              </div>
              <div className="color--purple bg-trans m-t-8 ft-wt-600 ft-sz-14 ln-ht-20">
                Cover Photo
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            // src={`data:${data.profileImage.profilePic.contentType};base64,${baseFile}`}
            src={image}
            alt="cover"
            width="100%"
            height="100%"
            className="img-settings"
          />
          <div
            className="cover-pic-reupload df-ac-jc"
            onClick={() => {
              inputElCover.current.click();
            }}
          >
            <CameraAltIcon fontSize="small" />
          </div>
        </>
      )}
      {/*Add change img icon*/}
    </div>
  );
}
