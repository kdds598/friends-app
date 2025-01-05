import React from 'react';
import './App.css';
import Login from './Components/Login.jsx';
import { Provider } from 'react-redux';
import store from '../Store/Store.js';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Recommendation from './Components/Recommendation.jsx';
import HomePage from './Components/Homepage.jsx';
import { Link } from 'react-router-dom';
import styles from './Styles/Navbar.module.css';
import Requests from './Components/Request.jsx';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/signup'); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.innernav} >
        <div className={styles.intonav}>
        <Link to="/" className={styles.navItem}>Home</Link>
        <Link to="/requests" className={styles.navItem}>Requests</Link>

        </div>
     
      <Link id={styles.dd} to="/recommendations" className={styles.navItem}>Recommendations</Link></div>
      
 
       <div>
        {localStorage.getItem('token') ? (
          <button
            className={styles.navItem}
            onClick={handleLogout} // Call the handleLogout function
          >
            Logout
          </button>
        ) : (
          <Link className={styles.navItem} to="/signup">
            Sign In
          </Link>
        )}
      </div>
      
    </nav>
  );
};


const router = createBrowserRouter([
  {
    path: '/',
    element:<><Navbar/><Outlet/>

    </>,
    children: [
      { path: '/', element: <ProtectedRoute element={<HomePage />}/> },
      { path: 'signup', element: <Login /> },
      { path: 'requests', element: <ProtectedRoute element={<Requests />}/> },
      { path: 'recommendations', element: <ProtectedRoute element={<Recommendation />}/> },
    ],
  },
]);







const App = () => {
  return (
    <Provider store={store}>

      <RouterProvider router={router}></RouterProvider>

    </Provider>
  );
};

export default App;
