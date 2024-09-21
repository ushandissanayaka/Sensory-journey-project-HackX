
import './App.css'
import Home from './components/Home/Home.jsx'
import Home2 from './components/Home/Home2'
import Home3 from './components/Home/Home3'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Games from './components/Games/Games.jsx'; 
import UserGames from './pages/user/UserGames.jsx'
import UserResources from './pages/user/UserResources.jsx'
import UserAppointments from './pages/user/UserAppointments.jsx'
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import PublicRoute from "./components/PublicRoute";
import PublicDashboard from './pages/PublicDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider  } from './context/AuthContext';

function App() {

  

  return (
  
    <AuthProvider>









<Router>
<Navbar />
<Routes>
  
  <Route path="/" element={<><Home /><Home2 /><Home3 /></>} />
  <Route path="/Games" element={<Games />} />
  <Route path="/SignUp" element={<PublicRoute><SignUp /></PublicRoute>} />
  <Route path="/Login" element={     <PublicRoute><Login /></PublicRoute>} />
  <Route path="/PublicDashboard" element={ <ProtectedRoute><PublicDashboard/></ProtectedRoute> }/>
  <Route path="/user/Games" element={ <ProtectedRoute><UserGames/></ProtectedRoute> }/>
  <Route path="/user/Resources" element={ <ProtectedRoute><UserResources/></ProtectedRoute> }/>
  <Route path="/user/Appointments" element={ <ProtectedRoute><UserAppointments/></ProtectedRoute> }/>
  <Route path="/admin/users" element={ <ProtectedRoute><Users/></ProtectedRoute> }/>
  <Route path="/admin/doctors" element={ <ProtectedRoute><Doctors/></ProtectedRoute> }/>
</Routes>
</Router>
</AuthProvider>
  );
}

export default App
