// import React from 'react';
import "./index.css"
import ImageDescBox from "../Image_desc_box";

function IndexPage() {
  return (
    <div className="IndexPage"> 

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

      <div className="Image-galery"></div>

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

      <div className="Partners">
        <div className="text"> Our partners </div>
        <div className="image-slide-show">
          <div className="img img1"></div>
          <div className="img img2"></div>
          <div className="img img3"></div>
        </div>
      </div>


      <div className = "Pad-end"></div>

    </div>
  );  
}

export default IndexPage;
