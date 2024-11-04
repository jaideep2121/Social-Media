import React, { useState } from 'react'
import "./protfolio.css"
import NavLogo from "../Componentss/images/NavLogo.jpg"
import Dot from "../Componentss/images/dots.png"
import cube from "../Componentss/images/cube.png"
import circle from "../Componentss/images/circle.png"
import zigzags from "../Componentss/images/zigzags.png"
import plus from "../Componentss/images/plus.png"
import mancity from "../Componentss/images/mancity.jpg"
import html from "../Componentss/images/HTML.png"
import css from "../Componentss/images/CSS.png"
import js from "../Componentss/images/Javascript.svg"
import express from "../Componentss/images//Express.png"
import nextjs from "../Componentss/images/NextJsCircle.png"
import tailwind from "../Componentss/images/Tailwind.png"
import node from "../Componentss/images/NodeJs.svg"
import mongodb from "../Componentss/images/MongoDB.svg"
import react from "../Componentss/images/React.png"
import vercel from "../Componentss/images//Vercel.svg"
import redux from "../Componentss/images/Redux.svg"
import k8 from "../Componentss/images/k8s.svg"
import docker from "../Componentss/images/Docker.svg"
import bash from "../Componentss/images/Bash.svg"
import github from "../Componentss/images/Github.svg"
import { toast } from 'sonner'
import axios from 'axios';







const Portfolio = () => {

  const[loading,setloadinng]=useState(false);
  const[input,setinput]=useState({
    name:"",email:"",subject:"",message:""
  });

  function chnagehandler(e){
setinput({
  ...input,
  [e.target.name]:e.target.value
})
  }

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setloadinng(true);
        
        const res = await axios.post('http://localhost:4000/api/v1/user/contact', input, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log(res);
       
        if (res.data.success) {
      
           
            toast.success(res.data.message);
            setinput({
                name: "",
                email: "",
                subject:"",
               message:"",
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("Error please try again");
    } finally{
      setloadinng(false);
    }
      
}

  
  return (
   <div>
        <div id="wrapper">

<div class="container">
    <div class="navbar">
        
        <div class="logo-container">
            <img src={NavLogo} class="logo"></img>
            <div class="logo-text">AIDEEP SACHDEVA</div>
        </div>
        
        <div class="nav-items">
            <div><a href="#projects">Projects</a></div>
            <div><a href="#skills">Skills</a></div>
            <div><a href="#contactme">Contact Me</a></div>
        </div>

    </div>

    <div class="hero-section">

        <div class="faded-text">JAI</div>

        <div class="hero-section-left">
            <div class="hero-section-heading">Hi! Jaideep</div>
            
            <div class="hero-section-heading hero-section-sub-heading">
                I am a <span >Software developer</span>
            </div>

            <div class="hero-section-description">
                I’m a software developer and here is my portfolio website. Here you’ll
                learn about my journey as a software developer.
            </div>
            
            <div class="btn-pink" id="btn">Hire me</div>

        </div>

        <div class="hero-section-right">
            <div class="absolute icons icon-dots">
                <img src={Dot} alt="" />
              </div>
              <div class="absolute icons icon-cube">
                <img src={cube} alt="" />
              </div>
              <div class="absolute icons icon-circle">
                <img src={circle} alt="" />
              </div>
              <div class="absolute icons icon-zigzag">
                <img src={zigzags} alt="" />
              </div>
              <div class="absolute icons icon-plus">
                <img src={plus} alt="" />
              </div>
              <div class="user-image">
                <img src={mancity} alt="" />
              </div>
        </div>

    </div>
</div>

<div class="project-section" id="projects">
    <h2 class="page-header">Projects</h2>

    <div class="project-container">
        <div class="project-card" id="project1">
            <div class="project-number project-number-right">01</div>
            <div class="project-content project-content-left">

                <div class="project-skills-container">
                    <img class="project-skill" src={html} alt="" />
                    <img class="project-skill" src={css} alt="" />
                    <img class="project-skill" src={js} alt="" />
                    <img class="project-skill" src={express} alt="" />
                    <img class="project-skill" src={nextjs} alt="" />
                    <img class="project-skill" src={tailwind} alt="" />
                    <img class="project-skill" src={node} alt="" />
                    <img class="project-skill" src={mongodb} alt="" />
                    <img class="project-skill" src={react} alt="" />
                    <img class="project-skill" src={vercel} alt="" />
                </div>

                <h2 class="project-heading">Tint & Orange</h2>

                <p class="project-subHeading">Its is a car modification copany 
                    which provide you sheets to protect your car from scratch
                </p>
                <div class="btn-grp">
                    <button class="btn-pink btn-project">Read More</button>
                    <a href="">
                    <i title="GitHubLink" class="fa-brands fa-github icon"></i>
                    </a>
                    <a href="">
                    <i title="Live Link" class="fa-solid fa-link icon"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="project-card" id="project2">
            <div class="project-number project-number-left">02</div>
            <div class="project-content project-content-right">

                <div class="project-skills-container">
                    <img class="project-skill" src={html} alt="" />
                    <img class="project-skill" src={css} alt="" />
                    <img class="project-skill" src={js} alt="" />
                    <img class="project-skill" src={express} alt="" />
                    <img class="project-skill" src={nextjs} alt="" />
                    <img class="project-skill" src={tailwind} alt="" />
                 
                </div>

                <h2 class="project-heading">Tint & Orange</h2>

                <p class="project-subHeading">Its is a car modification copany 
                    which provide you sheets to protect your car from scratch
                </p>
                <div class="btn-grp">
                    <button class="btn-pink btn-project">Read More</button>
                    <a href="">
                    <i title="GitHubLink" class="fa-brands fa-github icon"></i>
                    </a>
                    <a href="">
                    <i title="Live Link" class="fa-solid fa-link icon"></i>
                    </a>
                </div>
            </div>
        </div>
                <div class="project-card" id="project3">
            <div class="project-number project-number-right">03</div>
            <div class="project-content project-content-left">

                <div class="project-skills-container">
                    <img class="project-skill" src={html} alt="" />
                    <img class="project-skill" src={css} alt="" />
                    <img class="project-skill" src={js} alt="" />
                    <img class="project-skill" src={express} alt="" />
                    <img class="project-skill" src={nextjs} alt="" />
                    
                </div>

                <h2 class="project-heading">Tint & Orange</h2>

                <p class="project-subHeading">Its is a car modification copany 
                    which provide you sheets to protect your car from scratch
                </p>
                <div class="btn-grp">
                    <button class="btn-pink btn-project">Read More</button>
                    <a href="">
                    <i title="GitHubLink" class="fa-brands fa-github icon"></i>
                    </a>
                    <a href="">
                    <i title="Live Link" class="fa-solid fa-link icon"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-card" id="project4">
            <div class="project-number project-number-left">04</div>
            <div class="project-content project-content-right">

                <div class="project-skills-container">
                    <img class="project-skill" src={html} alt="" />
                    <img class="project-skill" src={css} alt="" />
                    <img class="project-skill" src={js} alt="" />
                    <img class="project-skill" src={express} alt="" />
                    <img class="project-skill" src={nextjs} alt="" />
                    <img class="project-skill" src={tailwind} alt="" />
                 
                </div>

                <h2 class="project-heading">Tint & Orange</h2>

                <p class="project-subHeading">Its is a car modification copany 
                    which provide you sheets to protect your car from scratch
                </p>
                <div class="btn-grp">
                    <button class="btn-pink btn-project">Read More</button>
                    <a href="">
                    <i title="GitHubLink" class="fa-brands fa-github icon"></i>
                    </a>
                    <a href="">
                    <i title="Live Link" class="fa-solid fa-link icon"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

</div>

<div id="skills" class="container skills-container ">
  <div class="skill-fade-text">Skills</div>

  <div class="skill-container-left">
    <h2 class="skill-heading">
      <span class="caps">M</span>e and
      <br />
      MyTech Stack
    </h2>

    <div class="skill-subHeading">
      <p>
      The full stack developer definition is “someone who can work on both the back-end and front-end of systems.” This means that they can develop fully fledged platforms (with databases, servers and clients) which don’t need other applications to function.
      </p>
      <p>
      The Full Stack Engineer job description includes using a range of different technologies and languages (such as Java, JavaScript, HTML, PHP, C#) to develop applications. Full Stack Developers approach software holistically since they cater to both user experience and functionality.
      </p>
      <p>
      Knowledge of multiple front-end languages and libraries (e.g. HTML/ CSS, JavaScript, XML, jQuery)
      Knowledge of multiple back-end languages (e.g. C#, Java, Python) and JavaScript frameworks (e.g. Angular, React, Node.js)
      </p>
    </div>
  </div>

  <div class="skill-container-right">
    <img src="blob vector.png" class="blob-style" alt="" />

    <img class="project-skill" src={html} alt="" />
                    <img class="project-skill" src={css} alt="" />
                    <img class="project-skill" src={js} alt="" />
                    <img class="project-skill" src={express} alt="" />
                    <img src={vercel} alt="" class="skills-logo" />
    <img src={github} alt="" class="skills-logo" />
                    <img class="project-skill" src={nextjs} alt="" />
                    <img class="project-skill" src={tailwind} alt="" />
                    <img src={redux} alt="" class="skills-logo" />
                    <img src={mongodb} alt="" class="skills-logo" />
                    <img class="project-skill" src={node} alt="" />
                    <img class="project-skill" src={mongodb} alt="" />
                    <img class="project-skill" src={react} alt="" />
                    <img class="project-skill" src={vercel} alt="" />
  
    <img src={express} alt="" class="skills-logo" />
 
    <img src={redux} alt="" class="skills-logo" />
    <img src={mongodb} alt="" class="skills-logo" />
    <img src={vercel} alt="" class="skills-logo" />
    <img src={github} alt="" class="skills-logo" />
    <img class="project-skill" src={nextjs} alt="" />
                    <img class="project-skill" src={tailwind} alt="" />
                    <img class="project-skill" src={node} alt="" />
    <img src={bash} alt="" class="skills-logo" />
    <img src={docker} alt="" class="skills-logo" />
    <img src={k8} alt="" class="skills-logo" />
  </div>



</div>

<div class="contactus-form-container" id="contactme">
  <div class="container">

    <h1 class="contactus-heading">Contact me</h1>

    <h3 class="contactus-sub-heading">
      Questions, thoughts, or just want to say hello?
    </h3>


    <div class="contactus-form-container">
      <form class="form" onSubmit={submithandler} action="">
        <div class="formfield-container">
          <input class="formfield" 
          type="text" 
          name="name" 
          id="" 
          value={input.name}
          onChange={chnagehandler}
          placeholder="Enter your name" />

          <input class="formfield" 
          type="email" 
          name="email" 
          id="" 
          value={input.email}
          onChange={chnagehandler}
          placeholder="Enter your email address" />

          <input class="formfield" 
          type="text" 
          name="subject" 
          id="" 
          value={input.subject}
          onChange={chnagehandler}
          placeholder="Enter your subject" />

          <textarea name="message" 
          id="" cols="30" rows="10" 
          class="formfield formfield-textarea"
          onChange={chnagehandler}
          value={input.message}
          placeholder="Enter your message"></textarea>

        </div>
        
        <div>
          <button type="submit" class="btn-pink" id="submit-btn">
            Send Message<i class="submit-icon fa-solid fa-paper-plane"></i>
          </button>
        </div>

      </form>

    </div>


  </div>
</div>

<footer>
  <div class="container">
    <div class="footer-wrapper">
      <div class="footer-faded-text">JAIDEEP</div>

      <div class="link-wrapper">
        <div>
          <a href="#projects">Projects</a>
        </div>
        <div>
          <a href="#skills">Skills</a>
        </div>
        <div>
          <a href="#contactme">Contact Me</a>
        </div>
      </div>

      <div class="icon-wrapper">
        <i class="fa-brands fa-linkedin icon"></i>
        <i class="fa-brands fa-github icon"></i>
        <i class="fa-brands fa-twitter icon"></i>
        <i class="fa-brands fa-instagram icon"></i>
        <i class="fa-regular fa-envelope icon"></i>
      </div>

    </div>
  </div>
</footer>

</div>
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
<script src="https://kit.fontawesome.com/58a810656e.js" crossorigin="anonymous"></script>


   </div>
  )
}

export default Portfolio