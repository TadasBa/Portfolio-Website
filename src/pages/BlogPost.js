// src/pages/BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom';
import backIcon from 'C:\\Univerity\\Portfolio\\my-blog\\src\\img\\back.svg'; // Import the image
import { Link } from 'react-router-dom';
import 'C:\\Univerity\\Portfolio\\my-blog\\src\\blog.css';

// Define your blog posts with custom content here
const blogPosts = [
  {
    id: 1,
    title: 'Software Engineering at Vilnius University',
    date: 'June 2025',
    content: (
      <>
        In 2021, after finishing school, I enrolled in the Software Engineering program at Vilnius University. This marked a completely new chapter in my life — one that, naturally, felt both exciting and a bit overwhelming at first.<br /><br />
        Now that I’ve graduated, I wanted to take a moment to reflect on these past four years. Writing this also feels like a good way to recap my journey for myself, and maybe share a piece of it with anyone curious or possibly looking for some insight.<br /><br />
        
        During the first year, my focus was mostly on studying. The courses were quite challenging, full of new concepts I hadn’t encountered before. Besides the content itself, university was a completely different beast compared to school. The hardest part wasn’t just the material — it was learning how to learn all over again.<br /><br />
        Back in school, things felt easier. Teachers were usually helpful and genuinely passionate about teaching. University, however, was a different story. I soon realized that university lecturers are not teachers in general but specialists deeply involved in their fields. That didn’t really click for me right away. So, lectures often weren’t as engaging or passionate as school lessons, and the real responsibility to master the material fell squarely on my own shoulders. No sugarcoating — it was sink or swim.<br /><br />
        One course that stuck with me from the first year was Computer Architecture. It was one of the toughest classes for many students and had surprisingly little online material to help, so you really had to pay close attention in lectures and study the official resources carefully.<br /><br />
        On a lighter note, another memorable course was Procedural Programming. It wasn’t too difficult, but it featured one of the best lecturers at Vilnius University, Irmantas Radavičius. His lectures were modern, passionate, interesting, and genuinely useful — a rare combo that made learning a lot more enjoyable.<br /><br />
        
        The second year went by pretty fast and, honestly, wasn’t the most memorable. By then, I had already gotten the hang of studying — the “how to university” part clicked — and I started enjoying the process more. Concepts from different courses started to connect, which made it feel like the hardest part was behind me. <br /><br />
        Most of the courses were manageable (not “Netflix-and-pass” level easy, but doable with effort). A few that really stuck with me were Database Management Systems, Functional Programming, and Networking. These subjects were completely new territory for me, but once I put in the effort, they turned out to be genuinely interesting. <br /><br />
        That year, I also started exploring what else Vilnius University had to offer outside the classroom. One of the things I found was the student association, and more specifically, I became a mentor for first-year students. That included helping organize the freshman camp and volunteering during it. And believe it or not — it was amazing. Like, really amazing. Probably one of the best experiences of my entire university journey. I met a ton of new people, made great memories, and had an absurd amount of fun (yes, even while pretending to be a responsible adult in front of freshmen).<br /><br />
        
        Before I knew it, the third year rolled in. I felt confident, comfortable, and kind of like I belonged — which was a great feeling. Studies were going smoothly, and I was in my element. One standout course that year was UX/UI Design. It involved quite a bit of theory, but it was totally worth the time investment — it highlighted that we build software not for compilers but for people. <br /><br />
        Then came one of the biggest highlights of my studies: Erasmus. In the second semester of third year, I took the opportunity and spent a semester abroad at the Athens University of Economics and Business, which had its own informatics faculty. That whole experience probably deserves its own blog post, but to keep it short — it was unforgettable part of my academic journey. <br /><br />
        In Athens, I took some new and diverse courses, including Blockchain Technologies and Computer Graphics. They weren’t as intense as the courses back home in Vilnius, but the Greek lecturers surprised me — in a good way. Unlike what I had gotten used to, they acted more like traditional teachers: asking lots of questions during lectures, encouraging discussions, and explaining things more than once if needed. It felt refreshingly interactive — and nobody yelled “read the slides yourself” even once! <br /><br />

        And then... the final year. Cue the dramatic music. <br /><br />
        With it came the realization: this is it. The finish line. The first semester included our last actual lectures, and two major courses stood out — Project Management and Project Quality. They weren’t groundbreaking, but the real boss fight was the thesis coursework. <br /><br />
        Thankfully, I got lucky: I landed a topic I was genuinely interested in, a great supervisor, and I managed to write the paper on time without spiraling into too much stress. It turned out to be a high-value project that I continued as my bachelor’s thesis. <br /><br />
        The final semester flew by like a speeding deadline. All coursework was over, and I was now fully immersed in a full-time internship and writing my bachelor’s thesis. It wasn’t the easiest stretch, but I pushed through and completed it. The topic I wrote thesis on was about large language models and more specifically on code quality evaluation using large language models. I got a solid grade, and even more importantly, I felt genuinely good about my work. <br /><br />

        So that’s basically it. <br /><br />
        I didn’t go too technical on purpose — this wasn’t meant to be a course catalog or a tech deep-dive. Instead, I just wanted to share how I felt about the studies and the experience of being a software engineering student at Vilnius University. If you’re reading this and you’re on a similar path (or considering one), I hope it gave you at least a glimpse of what it might be like.
      </>
    ),
  },
  // {
  //   id: 2,
  //   title: 'Learning React Basics',
  //   date: 'October 2024',
  //   content: (
  //     <>
  //       <p>In this post, I dive into the basics of React, explaining components, state, and props.</p>
  //       <p>Content about React setup, usage, and more details here...</p>
  //     </>
  //   ),
  // },
  // // Add more blog posts as needed
];

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blog-details">
      <Link to="/blog-page" aria-label="Back"> {/* Updated route */}
        <img src={backIcon} alt="back" id="backIcon" />
        BACK
      </Link>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div className="blog-content">
        {post.content}
      </div>
    </div>
  );
};

export default BlogPost;
