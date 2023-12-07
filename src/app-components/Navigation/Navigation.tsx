// To-Do: Make Login/Register Button 
// Fix logo

import React, { ReactNode } from "react";
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

interface CustomNavLinkProps extends NavLinkProps {
  activeClassName?: string;
}

interface NavigationProps {
  children?: ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = (props) => (
  <RRNavLink {...props} />
);

export const Navigation: React.FC<NavigationProps> = (props) => {
  const navigationSliceManager = useAppSelector((state) => state.navigationReducer);
  const dispatch = useAppDispatch();

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

              <div className="text header-text">
                <span className="name">Aleks Ivan</span>
                <span className="profession">Web Developer</span>
              </div>
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
                <a href="#">
                  <i className="icon">
                    <BiLogOut />
                  </i>
                  <span className="text nav-text">Logout</span>
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
