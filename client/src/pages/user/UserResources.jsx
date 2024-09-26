import React from 'react';
import ResourceCard from './Resources/ResourceCard';


import Layout from '../../components/Layout';
import ResourcesCover from '../../assets/ResourcesCover.jpg';
import ArticlePic from '../../assets/Article.png';
import VideoPic from '../../assets/Videos.png'
import GuidePic from '../../assets/Guides.png'
import WebinarPic from '../../assets/Webinars.png'

import './UserResources.css'
const UserResources = () => {
  return (
    <Layout
      children={
        <div className="w-full bg-purple-500 relative" style={{ height: '90vh' }}>
          <img
            className="absolute inset-0 object-cover w-full h-full blur-sm"
            src={ResourcesCover}
            alt="Resources Cover"
          />
          <div className="relative z-10 flex flex-col items-center justify-start h-full">
            <h1 className="head2 text-6xl font-semibold text-gray-500 text-center font-mono">
              Resources for Autism Support
            </h1>

            

            <div className='row1 relative top-8 h-4/5'>
              
              <ResourceCard ArticlePic={ArticlePic} Title='Articles' Description='Explore our collection of articles to learn more about autism, treatments, and helpful tips for supporting your child. Each article is written to give you clear and practical advice for everyday challenges.' nextLink='/user/Resources/Articles'></ResourceCard>
              <ResourceCard ArticlePic={GuidePic} Title='Guides' Description='Browse our guides for step-by-step advice on supporting your autistic child. Each guide is designed to give you clear and practical instructions to help with everyday tasks.' nextLink='/user/Resources/Guides'></ResourceCard>
              <ResourceCard ArticlePic={VideoPic} Title='Videos' Description='Watch our videos for simple and helpful tips on autism, therapies, and daily support. Each video is made to give you easy-to-follow guidance and insights.' nextLink='/user/Resources/Videos'></ResourceCard>
              <ResourceCard ArticlePic={WebinarPic} Title='Webinars' Description='Browse our guides for step-by-step advice on supporting your autistic child. Each guide is designed to give you clear and practical instructions to help with everyday tasks.' nextLink></ResourceCard>
              
              

              

              

              
            
            




           
            
            </div>
          </div>
        </div>
      }
    />
  );
};

export default UserResources;
