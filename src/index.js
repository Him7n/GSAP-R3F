import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollControls } from '@react-three/drei';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Dom Strucrure ki wajah se Scroll Trigger mein Problem biutt

// we have
{/* <div className="section1 hi" id='section1' >
      {/* Section 1 content */}
    //   Hero
    // </div>
    // <div className="section2" id='section2'>
    //   {/* Section 2 content */}
    //   Hero2
    // </div> */}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div  className="scroll-container">
    <Canvas>
      <ScrollControls pages={3} damping={0.23} >

      {/* Your 3D scene components go here */}
      <App/>
      </ScrollControls>

    </Canvas>
    
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
