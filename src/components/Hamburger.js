import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose
} from "./Animations";

import dallas from "../images/dallas.webp";
import austin from "../images/austin.webp";
import newyork from "../images/newyork.webp";
import sanfrancisco from "../images/sanfrancisco.webp";
import beijing from "../images/beijing.webp";
import security from "../images/secure.jpg";
import dAPP from "../images/blockchain.jpg";
import prag from "../images/Prag.jpg";
import offchain from "../images/offchain.jpg";
import Robust from "../images/Robust.jpg";

const cities = [
  { name: "Security", image: security ,feature:"Propose a novel privacy mechanism to protect the privacy of the students’ credentials"},
  { name: "Decentralized Application", image: dAPP ,feature: "Develop a Decentralized Application (DApp) using Ethereum blockchain as a proof-of-concept of the proposed architecture."},
  { name: "Robustness", image: Robust,feature: "Analyse the robustness of the developed DApp against the most widespread security attacks." },
  { name: "Pragmatic Architecture", image: prag,feature: "Introduce a novel blockchain-based pragmatic architecture for secure sharing of students’ credentials among all the stakeholders in the education ecosystem." },
  { name: "Offchain Storing Mech.", image: offchain, feature:"Utilize an off-chain storing mechanism to improve the scalability of the blockchain system" }
];



const Hamburger = ({ state }) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);
  const [solutionInfo,setSolutionInfo] = useState({
    objectInfo : "Our aim is to provide the project proposes a tamper-proof, immutable, authentic, non-repudiable,privacy protected and easy to share blockchain-based architecture for secured sharing of students’ credentials.",
    titleInfo: "Our Service"
  });

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);


  const handleHoverIn = (info,image,cityBackground,title,feature) => {
    setSolutionInfo({
      objectInfo:feature,
      titleInfo:title
    })
    handleCity(image, cityBackground,info);


  }

  return (
    <div ref={el => (menuLayer = el)} className='hamburger-menu'>
      <div
        ref={el => (reveal1 = el)}
        className='menu-secondary-background-color'></div>
      <div ref={el => (reveal2 = el)} className='menu-layer'>
        <div
          ref={el => (cityBackground = el)}
          className='menu-city-background'></div>
        <div className='container'>
          <div className='wrapper'>
            <div className='menu-links'>
              <nav>
                <ul>
                <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line1 = el)}
                      to='/Login'>
                      Login 
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line1 = el)}
                      to='/school-dash'>
                      School
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line2 = el)}
                      to='/student-dash'>
                      Student
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line3 = el)}
                      to='/contact-us'>
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={el => (info = el)} className='info'>
                <h3>Our Promise</h3>
                <p>
                  The passage experienced a surge in popularity of hybrid college mechanism due to COVID 
                  We promise to fulfill secure storage of college credentials with a solid architecture to ensure a great experienced and tension free storage
                </p>
                <h4>{solutionInfo.titleInfo}</h4>
                  <p>
                    {solutionInfo.objectInfo}
                  </p>
              </div>
              <div className='locations'>
                Features:
                {/* Returning the list of cities */}
                {cities.map(el => (
                 
                
                  <span
                    key={el.name}
                    onMouseEnter={() => handleHoverIn(info,el.image, cityBackground,el.name,el.feature)}
                    onMouseOut={() => handleCityReturn(cityBackground)}>
                    {el.name}
                  </span>
                
            
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
