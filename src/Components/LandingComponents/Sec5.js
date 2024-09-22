import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TelegramIcon from "@material-ui/icons/Telegram";
import MailIcon from "@material-ui/icons/Mail";
import FooterDropdown from "../FooterDropdown";

export default function Sec5({ matches, setPopup }) {
  const iconSize = matches ? "small" : "medium";

  return (
    <div className="footer__color">
      <div className="landing-page__footer">
        <div className="footer__links">
          {matches ? (
            <>
              <FooterDropdown heading={"Hobbycue"} />
              <FooterDropdown heading={"How Do I"} />
              <FooterDropdown heading={"Quick Links"} />
            </>
          ) : (
            <>
              <div>
                <div className="link__heading">Hobbycue</div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  About Us
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Our Services
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Work with Us
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  FAQ
                </div>
                <div className="link__content">Contact Us</div>
              </div>
              <div>
                <div className="link__heading">How Do I</div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Sign Up
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Add a Listing
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Claim Listing
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Post a Query
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Add a Blog Post
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Other Queries
                </div>
              </div>
              <div>
                <div className="link__heading">Quick Links</div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Listings
                </div>
                <div className="link__content">Blog Posts</div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Shop / Store
                </div>
                <div
                  className="link__content"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Community
                </div>
              </div>
            </>
          )}
          <div>
            <div className="link__heading">Social Media</div>
            <div className="link__social-media">
              <FacebookRoundedIcon className="social-icons m-r-24" />
              <TwitterIcon
                className="social-icons m-r-24"
                fontSize={iconSize}
              />
              <InstagramIcon
                className="social-icons m-r-24"
                fontSize={iconSize}
              />
              <PinterestIcon
                className="social-icons m-r-24"
                fontSize={iconSize}
              />
              <YouTubeIcon
                className="social-icons m-r-24"
                fontSize={iconSize}
              />
              <TelegramIcon
                className="social-icons m-r-24"
                fontSize={iconSize}
              />
              <MailIcon className="social-icons m-r-24" fontSize={iconSize} />
            </div>
            <div className="link__heading">Invite Friends</div>
            <div className="link__invite">
              <input
                className="invite__mail"
                type="email"
                placeholder="Email ID"
                //onChange={handleSearch}
              />
              <div className="invite__btn">Invite</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright-background">
        <div className="footer__copyright">© Purple Cues Private Limited</div>
      </div>
    </div>
  );
}
