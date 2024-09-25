import React from 'react'
import Layout from '../Layout'
import './Template.css'
const Template = ({Cover,Head,Children}) => {
  return (
    <Layout
      children={
        <div className="w-full bg-purple-500 relative" style={{ height: '90vh' }}>
          <img
            className="absolute inset-0 object-cover w-full h-full blur-sm"
            src={Cover}
            alt="Resources Cover"
          />
          <div className="relative z-10 flex flex-col items-center justify-start h-full">
            <h1 className="head1 text-6xl font-semibold  text-center font-sedgwick">
              {Head}
            </h1>

            

            <div className='row1 relative top-8 items-center flex justify-start flex-col'>
            {Children}
              
              

              

              
            
            




           
            
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Template