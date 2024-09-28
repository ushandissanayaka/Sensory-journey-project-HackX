import React from 'react';
import { userMenu, adminMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Import your GIF and profile picture here
import animation from '../assets/animation.gif'; // Adjust the path as necessary
import AdminProfile from '../assets/adminProfile.jpg'; // Adjust the path for admin profile picture
import DoctorProfile from '../assets/DoctorProfile.jpeg'; // Adjust the path for doctor profile picture
import userProfile from '../assets/userProfile.jpg'; // Adjust the path for normal user profile picture

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user image based on user type
  const getUserImage = () => {
    if (user?.isAdmin) return AdminProfile; // Profile picture for admins
    if (user?.isDoctor) return DoctorProfile; // Profile picture for doctors
    return userProfile; // Profile picture for normal users
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    alert('Logout Successfully');
    navigate('/login');
  };

  // Sidebar menu based on user type
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? [
        { name: 'Dashboard', path: '/PublicDashboard', icon: 'fa-solid fa-house' },
        //{ name: 'Appointments', path: '/doctor-appointments', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Profile', path: `/doctor/profile/${user?._id}`, icon: 'fa-solid fa-user' },
      ]
    : userMenu;

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 bg-purple-500 text-white min-h-screen">
          <div className="p-4 text-center">
            {/* User Profile Picture in Sidebar */}
            <img
              src={getUserImage()}
              alt="User Profile"
              className="rounded-full border-4 border-white mx-auto"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} // Ensures the image is circular
            />
            <h6 className="text-lg font-bold mt-4">{user?.name}</h6>
            <hr className="my-4 border-black" />
          </div>
          <div className="p-4 text-xl">
            {SidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.path || index} className={`menu-item ${isActive && "bg-gray-300"} p-2 rounded-md my-2`}>
                  <i className={`${menu.icon} mr-2`}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item p-2 rounded-md my-2 bg-white text-black cursor-pointer" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-4/5">
          <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center h-[calc(20vh)]">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-bell text-gray-600 cursor-pointer"></i>
              <span className="text-gray-600 text-4xl "><strong>Hello,</strong> {user?.name}</span> {/* Added Hello before user name */}
            </div>
            <img src={animation} alt="Loading animation" className="w-30 h-30" /> {/* Move GIF to the right side */}
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
