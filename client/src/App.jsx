
import './App.css'
import Home from './components/Home/Home'
import Home2 from './components/Home/Home2'
import Home3 from './components/Home/Home3'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './components/Games/Games'; 
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import PublicRoute from "./components/PublicRoute";


function App() {


  return (
   










<Router>
<Navbar />
<Routes>
  
  <Route path="/" element={<PublicRoute><Home /><Home2 /><Home3 /></PublicRoute>} />
  <Route path="/Games" element={<PublicRoute><Games /></PublicRoute>} />
  <Route path="/SignUp" element={<PublicRoute><SignUp /></PublicRoute>} />
  <Route path="/Login" element={     <PublicRoute><Login /></PublicRoute>} />
  
</Routes>
</Router>
  );
}

export default App
