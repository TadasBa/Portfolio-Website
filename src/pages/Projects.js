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
    title: 'Blog Creation using GitHub Pages',
    date: 'August 2024',
    tags: ['React', 'GitHub Pages'],
    content: (
      <>
        <p>This project involves creating a blog using React and hosting it on GitHub Pages.</p>
        <img src="path/to/blog_image.jpg" alt="Blog project" className="custom-image" />
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
