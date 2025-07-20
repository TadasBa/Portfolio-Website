import React from 'react';
import { useParams } from 'react-router-dom';
import 'C:\\Univerity\\Portfolio\\my-blog\\src\\project.css';
import { Link } from 'react-router-dom';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg';

const Project = ({ projectData }) => {
  const { projectId } = useParams();
  const project = projectData.find((p) => p.id === parseInt(projectId));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-details">
      <Link to="/Projects" aria-label="back">
        <img src={backIcon} alt="back" id="backIcon" />
        BACK
      </Link>
      <h1>{project.title}</h1>
      <div className="project-meta">
        <span>{project.date}</span>
        <div className="tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-content">
        {project.content}
      </div>
    </div>
  );
};

export default Project;
