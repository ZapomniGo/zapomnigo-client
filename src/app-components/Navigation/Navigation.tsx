// To-Do: Make Login/Register Button 
// Fix logo

import React, { ReactNode, useEffect, useState } from "react";
import { NavLink as RRNavLink, NavLinkProps } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { BiHomeAlt, BiSearch, BiLogOut } from "react-icons/bi";
import { TbCards } from "react-icons/tb";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { TbSettings } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../app-context/store";
import { navReducer } from "../../app-context/navigationSlice";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { url } from "../../Global";


interface NavigationProps {
  children?: ReactNode;
}

const CustomNavLink: React.FC<NavLinkProps> = (props) => (
  <RRNavLink {...props} />
);

export const Navigation: React.FC<NavigationProps> = (props) => {
  const navigationSliceManager = useAppSelector((state) => state.navigationReducer);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [institution, setInstitution] = useState('');
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token'))
      ?.split('=')[1];
      setToken(token || null);

    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
      setInstitution(decodedToken.institution)

    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/v1/logout`, {}, { withCredentials: true });

      console.log(response)

      if (response.status === 200) {  
        window.location.reload();
      } else {
        console.error(`Logout failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 900) {
      dispatch(navReducer({ open: true }));
    }
  };

  const handleMouseLeave = () => {
    dispatch(navReducer({ open: false }));
  };

  const handleHamburgerClick = () => {
    dispatch(navReducer({ open: true }));
  };

  const handleCloseClick = () => {
    dispatch(navReducer({ open: false }));
  };

  return (
    <div className="wrapper">
      <div className="navigation-bar">
        <div className="nav-mobile">
          <div className="menu-mobile">
            <RxHamburgerMenu className="menu-mobile" onClick={handleHamburgerClick} />
          </div>
          <div className="search-box">
            <i className="icon">
              <BiSearch />
            </i>
            <input type="search" placeholder="Search..." />
          </div>
          <div className="menu-mobile">
            <RxHamburgerMenu className="menu-mobile" onClick={handleHamburgerClick} />
          </div>
        </div>
        <nav
          className={`sidebar ${navigationSliceManager.open ? "" : "close"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <header>
            <IoMdClose className="close-mobile" onClick={handleCloseClick} />

            <div className="image-text">
              <span className="image">
                <img src="src/app-components/Navigation/logo.png" alt="logo"></img>
              </span>

            {token ? (
            <div className="text header-text">
              <span className="name">{username}</span>
              <span className="institution">{institution}</span>
            </div>
            ) : (
              <>
                <button onClick={() => window.location.href = '/login'}>Login</button>
                <button onClick={() => window.location.href = '/register'}>Register</button>
              </>
            )}
            </div>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <li className="search-box">
                <i className="icon">
                  <BiSearch />
                </i>
                <input type="search" placeholder="Search..." />
              </li>
              <ul className="menu-links">
                <li className="nav-link">
                  <CustomNavLink to="/" activeClassName="active">
                    <i className="icon" style={{ transform: "scale(1.3)" }}>
                      <BiHomeAlt />
                    </i>
                    <span className="text nav-text">Dashboard</span>
                  </CustomNavLink>
                </li>
                <li className="nav-link">
                  <CustomNavLink to="/sets" activeClassName="active">
                    <i className="icon" style={{ transform: "scale(1.2)" }}>
                      <TbCards />
                    </i>
                    <span className="text nav-text">My Sets</span>
                  </CustomNavLink>
                </li>
                <li className="nav-link">
                  <CustomNavLink to="/folders" activeClassName="active">
                    <i className="icon">
                      <FaRegFolderOpen />
                    </i>
                    <span className="text nav-text">My Folders</span>
                  </CustomNavLink>
                </li>
                <li className="nav-link">
                  <CustomNavLink to="/create" activeClassName="active">
                    <i className="icon" style={{ transform: "scale(1.3)" }}>
                      <GoPencil />
                    </i>
                    <span className="text nav-text">Create</span>
                  </CustomNavLink>
                </li>
                <li className="nav-link">
                  <CustomNavLink to="/settings" activeClassName="active">
                    <i className="icon" style={{ transform: "scale(1.2)" }}>
                      <TbSettings />
                    </i>
                    <span className="text nav-text">Settings</span>
                  </CustomNavLink>
                </li>
              </ul>
            </div>

            <div className="bottom-content">
              <li className="">
                <a onClick={handleLogout}>
                  <i className="icon">
                    <BiLogOut />
                  </i>
                  <span className="text nav-text" >Logout</span>
                </a>
              </li>
            </div>
          </div>
        </nav>
      </div>
      {navigationSliceManager.open}
      {props.children}
      <Outlet />
    </div>
  );
};
