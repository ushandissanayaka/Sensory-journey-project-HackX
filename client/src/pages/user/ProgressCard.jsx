import React from 'react'

const ProgressCard = ({color,number,percentage,title,description}) => {
  return (
    <div
  style={{
    backgroundColor: `${color}`,
    borderRadius: '15px',
    padding: '20px',
    minWidth: 'full',
    minHeight: '200px',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    
    position: 'relative',
  }}
>
  {/* Left side content */}
  <div className='w-full' style={{ display: 'flex', flexDirection: 'column' }}>
    <h2 className='text-3xl' style={{ margin: 0 }}>{title}</h2>
    <p style={{ margin: '5px 0 0' }}>{description}</p>
    {/* Progress bar */}
    
  </div>
  
  {/* Right side content */}
  <div className='flex flex-row w-full justify-start items-center relative'>
  <div
      style={{
        backgroundColor: '#fff',
        height: '5px',
        borderRadius: '3px',
        width: '70%',
        
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          height: '100%',
          width: `${percentage}`, // Adjust this for the progress amount
          borderRadius: '3px',
        }}
      ></div>
    </div>
  <div
    style={{    
      backgroundColor: 'black',
      color: `${color}`,
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      left:'10px',
      position:'relative'

    }}
  >
    {number}
  </div>
  </div>
  {/* Enroll button */}
  <div
    style={{
      position: 'relative',
     
      fontWeight: 'bold',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    }}
  >
    See details <span style={{ marginLeft: '5px' }}>→</span>
  </div>
</div>
  )
}

export default ProgressCard