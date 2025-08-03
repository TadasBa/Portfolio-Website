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
          Hey, I’m Tadas — a software developer with a deep curiosity for all things tech (and an occasionally unhealthy relationship with debugging at 2 AM). <br></br>
          It all started back in 9th grade (2017), when I took my first programming course and instantly got hooked. What began as a curiosity quickly became a passion — the more I learned, the more I wanted to know.<br></br>
          Fast forward to today: I’ve worked with languages like C/C++, C#, JavaScript, and Python, built projects across web, desktop, and mobile, and explored everything from computer architecture to UI/UX design. I recently graduated from Vilnius University with a degree in Software Engineering, and yes, I even survived writing a bachelor’s thesis on AI and code quality — surprisingly, with all my sanity intact (or at least I hope so). <br></br>
          When I’m not coding, you’ll probably find me learning something new, doing sports, or just enjoying some time offline <br></br>
          </p>
        </div>
        <div className="about-image">
          <img src={profileImage} alt="Tadas Baltrūnas" className="profile-image" />
        </div>
      </div>
      <h1>About This Blog</h1>
          <p>
          This blog is my digital notebook — a place to share what I’m building, learning, and occasionally overthinking. You’ll find a mix of tech tutorials, personal experiences, and thoughts from my journey as a developer.<br></br>
          If something here makes you think, helps you solve a bug, or just gives you a chuckle — that’s a win in my book.<br></br>
          Thanks for stopping by!<br></br>
          </p>
    </div>
  );
}

export default About;
