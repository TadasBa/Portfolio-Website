import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg';
import profileImage from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\foto1.jpg'; // Your image path

function About() {
  return (
    <div>
      <Link to="/" aria-label="Back">
        <img src={backIcon} alt="back" id="backIcon" />
        BACK
      </Link>

      <div className="about-container"> {/* Wrapper for text and image */}
        <div className="about-text">
          <h1>About Me</h1>
          <p>
            Hi, I'm Tadas, a software developer with a passion for computer science and technology. <br /><br />
            Back in 2017, when I was in 9th grade, I decided to explore the field of informatics and enrolled
            in my first programming course. It completely changed my perspective — computer science turned out to
            be far more fascinating than anything I had experienced before.
            As the course ended, I realized there was so much more to learn, which fueled my curiosity, 
            and I began diving deeper into one topic after another.<br /><br />
            Fast forward to today, I’ve worked with programming languages such as C/C++, C#, JavaScript, Python, 
            explored different programming paradigms, and learned to use various technologies.
            I've also applied this knowledge to numerous web, desktop, and mobile projects along the way. <br /><br />
            These days I am mainly focusing on my Software Engineering studies in Vilnius University.
          </p>
        </div>
        <div className="about-image">
          <img src={profileImage} alt="Tadas Baltrūnas" className="profile-image" />
        </div>
      </div>
      <h1>About This Blog</h1>
          <p>
            I started this blog to capture and share what I’ve learned, both in tech and life in general. 
            It’s a space where I will be trying to express my ideas, talk about the things I’m exploring, 
            and hopefully connect with others who are on similar paths.<br /><br />
            I aim to write about the technical aspects I work on, offering tutorials and insights, 
            while also touching on personal experiences and thoughts that might resonate beyond the screen. <br /><br />
            If you find something useful or interesting here, I truly appreciate it. <br /><br />
          </p>
    </div>
  );
}

export default About;
