import React from 'react';
import { Link } from 'react-router-dom';
import 'C:\\Univerity\\Portfolio\\my-blog\\src\\projects.css';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg';

const projectList = [
  {
    id: 1,
    title: '3D Platformer Game in Unity',
    date: 'January 2024',
    tags: ['Unity', 'C#'],
    content: (
      <>
        <p>This is a 3D platformer game I developed using Unity and C#.</p>
        <img src="path/to/image1.jpg" alt="Unity project" className="custom-image" />
        <h3>Gameplay Mechanics</h3>
        <p>Details about the gameplay mechanics...</p>
        <img src="path/to/image2.jpg" alt="Gameplay" className="custom-image" />
      </>
    ),
  },
  {
    id: 2,
    title: 'POP3 Server with SQLite Database',
    date: 'March 2024',
    tags: ['JavaScript', 'SQLite'],
    content: (
      <>
        <p>In this project, I built a POP3 server integrated with an SQLite database...</p>
        <img src="path/to/pop3_image.jpg" alt="POP3 Server" className="custom-image" />
      </>
    ),
  },
  {
    id: 3,
    title: 'Mobile App PANTRY',
    date: 'June 2024',
    tags: ['React', 'Node.js'],
    content: (
      <>
        <p>PANTRY is a mobile app built with React and Node.js to help users manage their pantry items.</p>
        <img src="path/to/pantry_image.jpg" alt="PANTRY App" className="custom-image" />
      </>
    ),
  },
  {
    id: 4,
    title: 'Portfolio Blog Website on GitHub Pages',
    date: 'September 2024',
    tags: ['React', 'GitHub Pages', 'CSS'],
    content: (
      <>
      <h3>The Idea</h3>
        <p>
          This project began with a simple goal: to create a space where I could present and reflect on my projects,
          and also challenge my frontend development skills by creating a website without relying on templates or no-code tools.
          Rather than using portfolio generators or blog platforms, I wanted to build something from scratch to learn and gain full control.
        </p>
  
        <h3>Technologies Used</h3>
        <ul>
          <li><strong>React:</strong> I used React for its flexibility and component-driven architecture. I built everything from scratch — no UI libraries or generators.</li>
          <li><strong>Pure CSS:</strong> To challenge myself, I avoided frameworks like Tailwind or Bootstrap. This helped me solidify my layout and styling fundamentals.</li>
          <li><strong>React Router:</strong> Navigation between sections (like projects, about, and home) is handled through route definitions.</li>
          <li><strong>GitHub Pages:</strong> I deployed the project using GitHub Pages for simple and free static hosting.</li>
        </ul>
  
        <h3>What I Learned</h3>
        <p>
        This was my first time working with React, so I had to learn its fundamentals.
        I also discovered GitHub Pages during this project, which was completely new to me, and I had to learn how to configure it for static site deployment.
        Another key area of growth was CSS: until now, I had only used it in university assignments and small experiments, 
        but this project pushed me to apply my knowledge in a real-world context.
        </p>
  
        <h3>Looking Ahead</h3>
        <ul>
          <li>Add dark mode for better user experience</li>
          <li>Implement project and blog post sorting, filtering, or categorization to improve navigation</li>
          <li>Redesign the post and project management system to make it more scalable easy to use</li>
          <li>Experiment with connecting the blog to a simple API (e.g., mock backend or headless CMS) to practice full-stack concepts</li>
        </ul>

      </>
    ),
  },  
  {
    id: 5,
    title: 'Mobile App Wireframing with Figma',
    date: 'October 2024',
    tags: ['Figma', 'UX/UI'],
    content: (
      <>
        <p>I created wireframes for a mobile app using Figma, focusing on UX/UI design principles.</p>
        <img src="path/to/wireframe_image.jpg" alt="Figma project" className="custom-image" />
      </>
    ),
  },
];

const Projects = () => {
  return (
    <div className="projects-container">
      <header>
        <Link to="/" aria-label="Back">
          <img src={backIcon} alt="back" id="backIcon" />
          BACK
        </Link>
        <h1>My Projects</h1>
      </header>
      <div className="project-list">
        {projectList.map((project) => (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className="project-link"
          >
            <div className="project-card">
              <h2>{project.title}</h2>
              <p>{project.date}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Projects, projectList }; // Export projectList
