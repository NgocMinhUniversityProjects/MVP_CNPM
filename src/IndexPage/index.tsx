// import React from 'react';
import "./index.css"
import ImageDescBox from "../Image_desc_box/index.tsx";
import Testimonials from "../Testimonials/index.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const carouselImages = [
  "/banner1.png",
  "/banner2.png",
  "/banner3.png"
];

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSlideStyle = (img: string) => ({
    backgroundImage: `url(${img})`
  });

  return (
    <div className="Image-galery">
      <div className="carousel-container">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={getSlideStyle(img)}
          />
        ))}
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IndexPage() {
  return (
    <div className="IndexPage"> 

      {/* What we are */}
      <div className="Opening-box">
        <div className="Title bold">
          Your Complete Platform for Academic Excellence and Mentorship
        </div>
        <div className="Content">
          Connect with expert tutors and passionate students across leading universities 
          including HCMUT, USSH, and UIT. Our comprehensive platform provides all the tools 
          you need to teach, learn, and grow—seamlessly integrated in one unified experience.
        </div>
      </div>

      {/* Images of students */}
      <div className="Image-galery"></div>

      {/* What we provide */}
      <div className="Desc-box">
        <ImageDescBox 
          imgClass="side1"
          title="Built for Students"
          desc="Created by students who understand your needs. Discover qualified tutors for any subject with just a few clicks."
        />
        <ImageDescBox 
          imgClass="side2"
          title="Empowering Tutors"
          desc="Comprehensive tools and dedicated support to help you succeed. Schedule sessions, share resources, and track your impact effortlessly."
        />
        <ImageDescBox 
          imgClass="side3"
          title="University Endorsed"
          desc="Officially partnered with prestigious institutions including HCMUT and USSH. All tutors are verified members of trusted academic communities."
        />
      </div>

      {/* Our partners */}
      <div className="Partners">
        <div className="text">Trusted by Leading Universities</div>
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

        <div className="title">Designed for Student Success</div>

        <div className="item-display">
          <div className="item item1">
            <div className="img"></div>
            <div className="text">Connect with Expert Tutors Across All Subjects</div>
          </div>

          <div className="item item2">
            <div className="img"></div>
            <div className="text">Flexible Learning: Online or In-Person Sessions</div>
          </div>
        </div>

        <div className="call-to-action">
          <Link className="call-to-action-text" to="/signup?role=student">Start Your Journey</Link>
        </div>

      </div>

      {/* Testimonials */}
      <div className="Testimonials">
        <div className="title">What Our Community Says</div>
        <div className="user-container">

          <Testimonials userName="Minh" comment="Outstanding platform with an intuitive, user-friendly interface." info="Freshman, HCMUT" />
          <Testimonials userName="Linh" comment="Perfect solution! One account handles both my tutoring sessions and my own studies seamlessly." info="4th Year Student, USSH"/>
          <Testimonials userName="Thảo" comment="This platform was a lifesaver during finals week. Highly recommended!" info="2nd Year Student, UIT"/>

        </div>
      </div>

      {/* Blank padding at the end */}
      <div className = "Pad-end"></div>
    </div>
  );  
}

export default IndexPage;
