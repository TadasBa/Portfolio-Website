import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg';
import 'C:\\Univerity\\Portfolio\\my-blog\\src\\blog.css';

function Blog() {
  const posts = [
    { id: 1, title: 'My First Blog Post', date: 'September 2024' },
    { id: 2, title: 'Learning React Basics', date: 'October 2024' },
    // Add more posts as needed
  ];

  return (
    <div>
      <Link to="/" aria-label="Back">
        <img src={backIcon} alt="back" id="backIcon" />
        BACK
      </Link>
      <h1>Blog</h1>
      <div className="blog-list">
        {posts.map(post => (
          <Link to={`/blog-page/${post.id}`} key={post.id} className="blog-link"> {/* Updated route */}
            <div className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
