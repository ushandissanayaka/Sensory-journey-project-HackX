import React,{useEffect,useState} from 'react'
import Loader from '../../../components/Loader';
import axios from 'axios';
import './Articles.css'
import ArticlesCover  from '../../../assets/ArticlesCover.jpg'
import Template from '../../../components/Resources/Template'
import ArticlesCard from './ArticlesCard';
import './Articles.css'
const Articles = () => {
  const [serachInput,setSearchInput]=useState('')
  const [searchResult,setSearchResult]=useState(false)
  const [ArticlesData,setArticlesData]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingHome,setLoadingHome]=useState(false)

  
  useEffect(() => {
    const fetchArticles = async () => {
        try {
          setLoadingHome(true)
            const res = await axios.get('http://localhost:8080/api/v1/user/resources/article', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (res.data.success) {
              
                const transformedArticles = res.data.data.map(article => [
                    article._id,
                    article.title,
                    article.description,
                    article.link,
                  ]);
                  setLoadingHome(false)
                  setArticlesData(transformedArticles); // Set transformed array in state

            }
            
        } catch (error) {
            console.log(error);
            setLoadingHome(false)
        }
    };

    fetchArticles(); // Call the function

}, []);
  const readHandle=async (title)=>{
    
    try {
      
      const res=await axios.post(`http://localhost:8080/api/v1/user/resources?title=${title}&type=${'Articles'}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
          
      }

      )
      if(res.data.success){
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchHandle=async (e)=>{
    e.preventDefault();
    
     try {
      setLoading(true)
          const res = await axios.get('http://localhost:8080/api/v1/user/resources/article', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
              params: {
                  searchTerm:serachInput.split(' ').join('|')
              },
          });
          if (res.data.success) {
            const transformedArticles = res.data.data.map(article => [
                article._id,
                article.title,
                article.description,
                article.link,
              ]);
              setLoading(false)
              setArticlesData(transformedArticles); // Set transformed array in state
               // Log the transformed array
          }
      } catch (error) {
          console.log(error);
          setLoading(false)
      }
  

    
  }
  return (
    <Template Cover={ArticlesCover} Head={'Articles'} Children={
      <>
      {loadingHome ? <div className='top-96 absolute'><Loader></Loader></div> : <>
      <form class="max-w-full w-3/4 mx-auto">   
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={serachInput} onChange={(e)=>{setSearchInput(e.target.value)}} placeholder="Search Mockups, Logos..." required />
              <button onClick={searchHandle} type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>
      

      
        {loading ? <Loader></Loader> : <div className='row2 relative'>{ArticlesData.map(article=>(
            <div className='box3 w-3/4 left-14 h-fit relative'>        <ArticlesCard readHandle={readHandle}  Title={article[1]} Description={article[2]} Link={article[3]}></ArticlesCard></div>
        
        ))}</div>} 
        
        
      
      
      </>}
      </>
      }></Template>
  )
}
export default Articles;