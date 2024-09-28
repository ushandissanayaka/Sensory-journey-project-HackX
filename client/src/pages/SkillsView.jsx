import React from 'react'
import './SkillsView.css'
import { useNavigate } from "react-router-dom"; 

import SkillsCard from './SkillsCard';
import SkillsCard1 from "../assets/SkillsCard1.jpg";
import SkillsCard2 from "../assets/SkillsCard2.jpg";
import SkillsCard3 from "../assets/SkillsCard3.jpg";
import SkillsCard4 from "../assets/SkillsCard4.jpg";
import SkillsCard5 from "../assets/SkillsCard5.jpg";

const SkillsView = () => {
    const skillsCenters = [
        {
          GameName: "Life Skills Autism Academy",
          GameDescription: "At Life Skills Autism Academy, our mission is to help children with autism write their own success stories.",
          GamePhoto: SkillsCard1,
          
          link: "https://www.lifeskillsautismacademy.com/",
        },
        {
          GameName: "Skills and Ability School under ICMH",
          GameDescription:
            "We belive in Skills and Abilities",
          GamePhoto: SkillsCard2,
         
          link: "http://www.icmh.org.in/index.html",
        },
        {
          GameName: "Autism Therapy centre India",
          GameDescription: "Pop colorful bubbles as they float across the screen!",
          GamePhoto: SkillsCard3,
         
          link: "https://maps.app.goo.gl/d7Hd3qd16TbVZsg29",
        },
        {
          GameName: "Skills Global",
          GameDescription: "Skills® is a one-stop resource for creating and implementing comprehensive, tailored treatment plans for children and adolescents with autism spectrum disorder (ASD).",
          GamePhoto: SkillsCard4,
          
          link: "https://www.skillsforautism.com/",
        },
        {
          GameName: "Altogether Autism TAKIWATANGA",
          GameDescription: "Autism Awareness, Acceptanceand Appreciation.Supporting people to be‘authentically autistic’.",
          GamePhoto: SkillsCard5,
         
          link: "https://www.altogetherautism.org.nz/",
        },
      ];
  return (
    <div id="card-area">
      <div className="wrapper ">
      {skillsCenters.map((game, index) => (
          <SkillsCard
            key={index}
            Name={game.GameName}
            Description={game.GameDescription}
            Photo={game.GamePhoto}
            link={game.link}
            
          ></SkillsCard>
        ))}
        </div>
    </div>
  )
}

export default SkillsView