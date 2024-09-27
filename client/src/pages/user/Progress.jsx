import React,{useEffect,useState} from 'react'
import PieChart1 from '../../components/PieChart'
import Template from '../../components/Resources/Template'
import ProgressCover from '../../assets/ProgressCover.jpg'
import Loader from '../../components/Loader'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import './Progress.css'
import ProgressCard from './ProgressCard'
const Progress = () => {
    const [gameData,setGameData]=useState([])
    const [userId,setUserId]=useState('')
    const [loading,setLoading]=useState(false)
    const [resourcesData,setResourcesData]=useState([])
    
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id; // assuming 'id' is the field containing the userId
          } catch (error) {
            console.error("Invalid token:", error);
            return null;
          }
        }
        return null;
      };

    useEffect(()=>{
        const userId = getUserIdFromToken();
        if (userId) {
          setUserId(userId);
        } else {
          
        }
        try{
            setLoading(true)
        const fetchGameProgress=async()=>{
            const res = await axios.get(`http://localhost:8080/api/v1/user/progress?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                
            });
            if(res.data.success){
                const transformedData=res.data.data.map(game=>
                    [game.gameId,
                    game.score,
                    game.level]

                )
                
                
                setLoading(false)
                setGameData(transformedData)
                 menu = menu.map(item => {
                    const gameProgress = transformedData.find(game => game.gameId === item.gameId);
                    return gameProgress ? { ...item, score: gameProgress.score } : item;
                  });
                
            }
            else{
                setLoading(false)
                console.log(res.data.message)
            }
            
        }
        fetchGameProgress()
    }catch(error) {

            console.log(error);
            setLoading(false)
        }
        

    },[])
    //for resources
    useEffect(()=>{
        const userId = getUserIdFromToken();
        if (userId) {
          setUserId(userId);
        } else {
          
        }
        try {
            setLoading(true)
        const fetchResourceProgress=async()=>{
            const res = await axios.get(`http://localhost:8080/api/v1/user/resources?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                
            });
            if(res.data.success){
                
                
                setLoading(false)
                setResourcesData(res.data.data)
                
            }
            else{
                setLoading(false)
                console.log(res.data.message)
            }
            
        }
        fetchResourceProgress()



        } catch (error) {
            
        }
    },[])


    let menu=[
        {
            gameId:'0',
            tag1:'Visual',
            tag2:'Pattern Recognition',
            score:''
        },
        {
            gameId:'1',
            tag1:'Spatial Awareness',
            tag2:'Visual',
            score:''
        },
        {
            gameId:'2',
            tag1:'Visual',
            tag2:'Sound',
            score:'90'
        },
        {
            gameId:'3',
            tag1:'Creativity',
            tag2:'Shape Recognition',
            score:'100'
        },
        {
            gameId:'4',
            tag1:'Pattern Recognition',
            tag2:'Color Exploration',
            score:'80'
        }
    ]

  return (
    <Template Head={'Progress'} Cover={ProgressCover} Children={
        <>
        {loading ? <Loader/> : 
        
            <><PieChart1 menu={menu}/>
            
             <div className='tasks h-1/2 w-full'
 style={{
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)', 
    padding:'10px',
    overflow:'hidden',
    display: 'grid',
    gridColumnGap:'10px',
    
    borderRadius: '10px',
    gridTemplateColumns: 'repeat(4, 1fr)',
  }}>
    <div className='h-full w-full hover:shadow-2xl transition-shadow duration-300'>
   <ProgressCard color={'#5ad25f'} title={'Articles'} description={'Keep reading articles to help your child'} number={!loading && resourcesData && resourcesData.Articles ? resourcesData.Articles.length :0} percentage={!loading && resourcesData && resourcesData.Articles 
      ? `${(resourcesData.Articles.length / 4) * 100}%` 
      : '0%'}></ProgressCard>
    </div>
    <div className='h-full w-full hover:shadow-2xl transition-shadow duration-300'>
    <ProgressCard color={'#2880ff'} title={'Guides'} description={'Keep following guides to direct your child'} number={!loading && resourcesData && resourcesData.Guides ? resourcesData.Guides.length :0} percentage={!loading && resourcesData && resourcesData.Guides ? `${(resourcesData.Guides.length / 4) * 100}%` 
      : '0%'}></ProgressCard>
    </div>
    <div className='h-full w-full hover:shadow-2xl transition-shadow duration-300'>
    <ProgressCard color={'#fff933'} title={'Videos'} description={'Keep watching videos to learn about autism'} number={!loading && resourcesData && resourcesData.Videos ? resourcesData.Videos.length :0} percentage={!loading && resourcesData && resourcesData.Videos ? `${(resourcesData.Videos.length / 4) * 100}%` 
      : '0%'}></ProgressCard>
    </div>
    <div className='h-full w-full hover:shadow-2xl transition-shadow duration-300'>
    <ProgressCard color={'#ff2fe2'} title={'Webinars'} description={'Keep attending webinars bring you questions to end'} number={!loading && resourcesData && resourcesData.Webinars ? resourcesData.Webinars.length :0} percentage={!loading && resourcesData && resourcesData.Webinars ? `${(resourcesData.Webinars.length / 4) * 100}%` 
      : '0%'}></ProgressCard>
    </div>
            
            </div>
            </>
          


         }
        </>
        
    } ></Template>
  )
}

export default Progress