
import './App.css'
import Home from './components/Home/Home'
import Home2 from './components/Home/Home2'
import Home3 from './components/Home/Home3'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './components/Games/Games'; 

function App() {


  return (
   










<Router>
<Navbar />
<Routes>
  {/* Define Routes for your components */}
  <Route path="/" element={<><Home /><Home2 /><Home3 /></>} />
  <Route path="/Games" element={<Games />} />
  {/* Add routes for other pages */}
</Routes>
</Router>
  )
}

export default App
