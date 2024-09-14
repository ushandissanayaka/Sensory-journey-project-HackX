import React,{useState} from 'react';
import './Home.css';
import NavBar from '../Navbar/Navbar';
import Banner from '../../shared/Banner';
import banner from '../../assets/3.png';
import { IoMdCloseCircle } from "react-icons/io";

function Home() {

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handlePopupOpen = () => setPopupVisible(true);
  const handlePopupClose = () => setPopupVisible(false);
  
  return (
    <div>
    
      <NavBar />

      <div className='home-container md:px-12 p-4 max-w-screen-2xl mx-auto'>
        <Banner
          banner={banner}  // Changed the prop name to 'banner' to match the usage in the Banner component
          heading="Sensory Journey"
          subheading="Turn Your Scars Into Stars!"
          paragraph="Sensory Journey is a website made to help kids with autism do sensory activities at home. It's personalized for each child and their family, focusing on what sensory activities work best for them."
          btn="See More"
          onBtnClick={handlePopupOpen}
        />
      </div>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={handlePopupClose}><IoMdCloseCircle /></button>
            <h2>Additional Information</h2>
            <p>This is where you can add more information about the Sensory Journey or any other content you want to display.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
