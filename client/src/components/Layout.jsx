import React from 'react';
import { userMenu, adminMenu } from '../Data/data'; // Ensure these are properly available
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    alert('Logout Successfully'); // You can use alert or any other method for notification
    navigate('/login');
  };

  // Doctor menu
  const doctorMenu = [
    {
      name: 'Dashboard',
      path: '/',
      icon: "fa-solid fa-house"
    },
    {
      name: 'Appointments',
      path: "/doctor-appointments",
      icon: 'fa-solid fa-clipboard-list'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user'
    },
  ];

  // Sidebar menu based on user type
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/5 bg-purple-500 text-white">
          <div className="p-4">
            <h6 className="text-lg font-bold">DOC App</h6>
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

        <div className="w-4/5">
          <div className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
            <div className='flex items-center space-x-4'>
              <i className="fa-solid fa-bell text-gray-600 cursor-pointer"></i>
              <Link to="/profile" className="text-gray-600">
                {user?.name}
              </Link>
            </div>
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
