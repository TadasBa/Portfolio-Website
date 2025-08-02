import React from 'react';
import { Link } from 'react-router-dom';
import 'C:\\Univerity\\Portfolio\\my-blog\\src\\projects.css';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg';
import menuImg from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\menu.png'
import cameraGif from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\camera.gif'
import movementGif from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\movement.gif'
import powerUpGif from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\powerUp.gif'
import enemyGif from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\enemy.gif'
import portalGif from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\portal.gif'

const projectList = [
  {
    id: 1,
    title: '3D Platformer Game in Unity',
    date: 'January 2024',
    tags: ['Unity', 'C#', 'Game Development', '3D Platformer'],
    content: (
      <>
        <h3>The Idea</h3>
        <p>
          Although I’m not a big gamer, I did spend a fair share of my teenage years playing games. 
          Despite that, I hadn't explored game development much until university. 
          While studying at Vilnius University, I took a Java course where one of the practical assignments was to create a simple game of our choice. 
          For that project, I built a small 2D platformer with basic player movement, collision detection, and a few simple mechanics. 
          It was developed in pure Java, without any external tools, and while it was quite primitive, it sparked my interest in game development. 
          A few years later, I decided to revisit this field — this time creating a 3D platformer using Unity and C#. 
          This project involved more advanced elements such as custom game mechanics, physics, UI management, 
          and modular scripting for player interaction and scene organization. 
          My goal was to create a responsive and enjoyable game experience, with core features like movement, 
          jumping, power-ups, enemies, and level transitions.
        </p>

        <h3>Game Structure and Navigation</h3>
        <p>
          The game begins with a simple and clean main menu view, managed by a <em>MainMenu</em> script. 
          From here, players can either start the game or exit. 
          To ensure smoother UI interaction, the cursor is set to <em>Confined</em> mode. 
          When the player starts the game, the first level is loaded using Unity’s <em>SceneManager.LoadScene</em>. 
          Transitions between levels are handled through the <em>LevelTransition</em> script, which uses trigger colliders to detect when the player enters a transition zone and then loads the appropriate next scene.
        </p>

        <img src={menuImg} alt="Main Menu UI" className="custom-image" width="50%"/>

        <h3>Camera movement</h3>
        <p>
          The camera is handled by a custom <em>CameraController</em> script, which implements a third-person system 
          that orbits smoothly around the player based on mouse input. 
          Vertical rotation is controlled by a pivot point attached to the player, 
          while horizontal rotation follows the character’s Y-axis orientation. 
          To maintain a comfortable viewing angle, camera pitch is clamped between set minimum and maximum values—preventing 
          the player from looking too far up or down and avoiding disorienting motion.
        </p>

        <img src={cameraGif} alt="Smooth Camera Orbit" className="custom-image" width="50%"/>

        <p>
          Player movement is managed through the <em>PlayerController</em> script, which uses Unity’s
          built-in <em>CharacterController</em> component. 
          Basic movement is done by WASD input combined with gravity simulation. 
          When pressing the space key an upward force is applied and player jumps. 
        </p>

        <img src={movementGif} alt="Jumping Mechanic" className="custom-image" width="50%"/>


        <h3>Jump Boost Power-Up</h3>
        <p>
          The <em>JumpBoostPowerup</em> provides a temporary increase in jump height. 
          When the player enters its trigger collider, it triggers the <em>Powerup()</em> method in 
          the <em>PlayerController</em> script. This method uses a coroutine to boost the player's jump force for a few 
          seconds before automatically reverting it to normal. 
        </p>

        <img src={powerUpGif} alt="Jump Boost Power-Up" className="custom-image" width="50%"/>

        <p>
          All active power-ups are managed by a central <em>PowerUpManager</em> singleton. 
          Each power-up registers itself at runtime, making it easy to keep track of them independently. 
          When the player respawns—for example, after falling off the level—the manager reactivates any necessary power-ups 
          via the <em>RespawnPowerUps()</em> method. 
          This way it is much simpler to add new power-ups without modifying the core player logic.
        </p>

        <h3>Enemies</h3>
        <p>
          When the player collides with an enemy they are pushed back in the opposite direction of the impact. 
          This direction is calculated using a normalized vector from the enemy to the player, 
          with an added vertical component to create a slight lift. 
          While the knockback is active, normal movement is temporarily disabled, and the player's motion is controlled entirely by the knockback force.
        </p>

        <img src={enemyGif} alt="Enemy" className="custom-image" width="50%"/>

        <h3>Level Management</h3>
        <p>
          The <em>LevelManager</em> is responsible for handling scene transitions between levels. 
          The game currently consists of two levels, and progression is triggered when the player reaches a portal 
          at the end of the level. Entering the portal activates a transition sequence that loads the next scene using Unity’s 
          scene management system.
        </p>

        <img src={portalGif} alt="Portal" className="custom-image" width="50%"/>

        <h3>What I Learned</h3>
        <p>
          This project was a meaningful step forward in my understanding of game development. 
          I deepened my knowledge of Unity’s scene management, third-person camera control, physics-based character movement, 
          trigger-based interactions and coroutine timing logic. 
          I also strengthened my C# scripting skills and got better idea of how to think like a game developer
        </p>

        <h3>Future Work</h3>
        <p>
          While the game covers the main elements of a 3D platformer, there is still plenty of room for improvement.
          However, for now I am stopping at this point, but in the future I want to come back to this project and continue it. 
        </p>
        <ul>
          <li>Add a scoring system</li>
          <li>Improve level complexity and pacing</li>
          <li>Introduce health and damage mechanics</li>
          <li>Expand enemy behavior with AI</li>
          <li>Experiment with sound effects</li>
          <li>Add more levels and game completion effects</li>
        </ul>

        <h3>Explore the Project</h3>
        <p>
          You can check out the full source code and project files on GitHub:  
          <a href="https://github.com/TadasBa/3D-Game" target="_blank" rel="noopener noreferrer"> <strong>https://github.com/TadasBa/3D-Game</strong></a>
        </p>
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
          <li>Redesign layout into a single-page scrollable structure to improve UX and reduce navigation friction</li>
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
