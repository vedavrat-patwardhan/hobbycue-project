import React from "react";
import ReactPlayer from "react-player";
import Dp from "../../Assets/Dp.svg";
import Quote from "../../Assets/Quote.svg";
import { Avatar } from "@material-ui/core";

export default function Sec3() {
  return (
    <div className="main-sec-3__color">
      <div className="landing-page__main-sec-3">
        <div className="main-sec-3__testimonial">
          <div className="testimonial__heading">
            <img src={Quote} alt="" />
            <span className="testimonial__heading__txt">Testimonials</span>
          </div>
          <div className="testimonial__context">
            In a fast growing and ever changing city like Bangalore, it
            sometimes becomes very difficult to find or connect with like minded
            people. Websites like hobbycue.com is a great service which helps me
            get in touch with, communicate, connect, and exchange ideas with
            other dancers. It also provides the extra benefit of finding
            products and services that I can avail, which I can be assured is
            going to be of great quality as it comes recommended by people of
            the hobbycue community. To have discussions, to get visibility, and
            to be able to safely explore various hobbies and activities in my
            city, all under one roof, is an excellent idea and I highly
            recommend it.
          </div>
          <div className="testimonial__data">
            <div className="testimoial__data__player">
              <ReactPlayer
                url="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
                width="100%"
                height="100%"
                playing={false}
                controls={true}
              />
            </div>
            <div className="testimonial__data__profile">
              <Avatar
                alt="Display Profile"
                src={Dp}
                className="testimonial__dp"
              />
              <div className="dp-name">
                <div className="dp__heading">Shubha Nagarajan</div>
                <div className="dp__sub-heading">Classical Dancer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
