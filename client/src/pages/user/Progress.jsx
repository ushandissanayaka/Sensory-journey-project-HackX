import React,{useEffect,useState} from 'react'
import PieChart1 from '../../components/PieChart'
import Template from '../../components/Resources/Template'
import ProgressCover from '../../assets/ProgressCover.jpg'
import Loader from '../../components/Loader'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import './Progress.css'
const Progress = () => {
    const [gameData,setGameData]=useState([])
    const [userId,setUserId]=useState('')
    const [loading,setLoading]=useState(false)

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
    const menu=[
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
        
            <PieChart1 menu={menu}/>
          


         }
        </>
        
    } ></Template>
  )
}

export default Progress