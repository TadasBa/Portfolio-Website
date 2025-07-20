import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { Projects, projectList } from './pages/Projects';
import Project from './pages/Project';
import githubIcon from './img/github.svg';
import emailIcon from './img/email.svg';
import linkedinIcon from './img/linkedin.svg';

function App() {
  const location = useLocation(); // Get the current location
  const isHomePage = location.pathname === '/';

  return (
    <div className="page-wrapper">
      {/* Conditionally render header only on the home page */}
      {isHomePage && (
        <header className="header">
          <div className="main-headers">       
            <h1>TADAS BALTRŪNAS</h1>            
            <h4>SOFTWARE DEVELOPER PASSIONATE ABOUT CONTINUOUS LEARNING IN TECH</h4>
            <nav className="navigation-panel">
              <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/blog-page">BLOG</Link></li>
                <li><Link to="/projects">PROJECTS</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      )}

      <main className="content-container">
            <div className="content">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog-page" element={<Blog />} />
                <Route path="/blog-page/:postId" element={<BlogPost />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<Project projectData={projectList} />} />
              </Routes>
            </div>        
      </main>

      {/* Conditionally render footer only on the home page */}
      {isHomePage && (
        <footer className="footer">
          <div className="social-icons">
            <a href="https://github.com/TadasBa" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" id="githubIcon"/>
            </a>
            <a href="mailto:tadas@baltrunas.lt" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <img src={emailIcon} alt="Email" />
            </a>
            <a href="https://www.linkedin.com/in/tadasba/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>          
        </footer>
      )}
    </div>
  );
}

const WrappedApp = () => (
  <Router basename="/Blog">
    <App />
  </Router>
);

export default WrappedApp;
