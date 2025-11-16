// import React from 'react';
import "./index.css"
import ImageDescBox from "../Image_desc_box/index.tsx";
import Testimonials from "../Testimonials/index.tsx";
import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <div className="IndexPage"> 

      {/* What we are */}
      <div className="Opening-box">
        <div className="Title bold">
          One stop place for connecting with and finding mentorship!
        </div>
        <div className="Content">
          We offer an easy solution to connect tutors and students across various schools, 
          including partners and users from HCMUT, USSH, UIT, etc. 
          Whether you are a tutor or a student, we offer tools to connect, 
          teach and learn with one all-in-one account.
        </div>
      </div>

      {/* Images of students */}
      <div className="Image-galery"></div>

      {/* What we provide */}
      <div className="Desc-box">
        <ImageDescBox 
          imgClass="side1"
          title="From the need of students"
          desc="Made by students, for students. We made it easy to find tutors for your favorite subjects!"
        />
        <ImageDescBox 
          imgClass="side2"
          title="To the need of tutors"
          desc="We care about the tutors on our site, providing useful tools and just-in-time supports if there are any troubles."
        />
        <ImageDescBox 
          imgClass="side3"
          title="Officially supported by schools"
          desc="We have official supports from schools such as HCMUT or USSH. Many of our tutors are from trusted schools."
        />
      </div>

      {/* Our partners */}
      <div className="Partners">
        <div className="text"> Our partners </div>
        <div className="image-slide-show">
          <div className="img img1"></div>
          <div className="img img2"></div>
          <div className="img img3"></div>
          <div className="img img4"></div>

          <div className="img img1"></div>
          <div className="img img2"></div>
          <div className="img img3"></div>
          <div className="img img4"></div>
        </div>
      </div>

      {/* App's features */}
      <div className="Features">

        <div className="title">For students:</div>

        <div className="item-display">
          <div className="item item1">
            <div className="img"></div>
            <div className="text">Find tutors for your favourite subjects</div>
          </div>

          <div className="item item2">
            <div className="img"></div>
            <div className="text">Study online or offline with scheduled time</div>
          </div>
        </div>

        <div className="call-to-action">
          <Link to="/signup?role=student"> Get started! </Link>
        </div>

      </div>

      {/* Testimonials */}
      <div className="Testimonials">
        <div className="title">Read some testimonials from our users</div>
        <div className="user-container">

          <Testimonials userName="Minh" comment="Fantastic user experience." info="Freshman at HCMUT" />
          <Testimonials userName="Linh" comment="Excellent user experience, I only need one account for both for studying and for teaching" info="4rd year student at USSH"/>
          <Testimonials userName="Thảo" comment="Great site, saved me before the finals" info="2rd year student at UIT"/>

        </div>
      </div>

      {/* Blank padding at the end */}
      <div className = "Pad-end"></div>
    </div>
  );  
}

export default IndexPage;
