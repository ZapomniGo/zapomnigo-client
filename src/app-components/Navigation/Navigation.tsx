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
import axios from "axios";
import { url } from "../../Global";
import { BiLogIn } from "react-icons/bi";
import instance from "../../app-utils/axios";
import { ToastContainer, toast } from "react-toastify";
import CookieConsent, { Cookies } from "react-cookie-consent";
import "react-toastify/dist/ReactToastify.css";

interface NavigationProps {
  children?: ReactNode;
}

const CustomNavLink: React.FC<NavLinkProps> = (props) => (
  <RRNavLink {...props} />
);

export const Navigation: React.FC<NavigationProps> = (props) => {
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: { username: string; institution: string } =
        jwtDecode(token);
      setUsername(decodedToken.username);
      setInstitution(decodedToken.institution);
    }
  }, []);

  //cookie method leave for future cookie implementation
  // const handleLogout = async () => {
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");
  //   window.location.reload();
  // };

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.replace("/app/login");
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
    window.scrollTo(0, 0);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="navigation-bar">
        <div className="nav-mobile">
          <div className="menu-mobile">
            <RxHamburgerMenu
              className="menu-mobile"
              onClick={handleHamburgerClick}
            />
          </div>
          <div className="search-box">
            <i className="icon">
              <BiSearch />
            </i>
            <input type="search" placeholder="Търси..." />
          </div>
        </div>
        <nav
          className={`sidebar ${navigationSliceManager.open ? "" : "close"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <header>
            <IoMdClose className="close-mobile" onClick={handleCloseClick} />
            {token ? (
              <div className="image-text">
                <span className="image">
                  <img src="/logo.jpg" alt="logo"></img>
                </span>
                <div className="text header-text">
                  <span className="name">
                    {username.length > 13
                      ? username.substring(0, 13) + "..."
                      : username}
                  </span>
                  <span className="institution">{institution}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </header>

          <div className="menu-bar">
            <div className="menu">
              <li className="search-box">
                <i className="icon">
                  <BiSearch />
                </i>
                <input type="search" placeholder="Търси..." />
              </li>
              <ul className="menu-links">
                <li className="nav-link">
                  <CustomNavLink
                    to="/app/"
                    activeClassName="active"
                    onClick={handleCloseClick}
                  >
                    <i className="icon" style={{ transform: "scale(1.3)" }}>
                      <BiHomeAlt />
                    </i>
                    <span className="text nav-text">Начало</span>
                  </CustomNavLink>
                </li>
                {token ? (
                  <>
                    <li className="nav-link">
                      <CustomNavLink
                        to={`/app/sets/${username}`}
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <TbCards />
                        </i>
                        <span className="text nav-text">Моите тестета</span>
                      </CustomNavLink>
                    </li>
                    <li className="nav-link">
                      <CustomNavLink
                        to="/app/folders"
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon">
                          <FaRegFolderOpen />
                        </i>
                        <span className="text nav-text">Моите папки</span>
                      </CustomNavLink>
                    </li>
                    <li className="nav-link">
                      <CustomNavLink
                        to="/app/create"
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.3)" }}>
                          <GoPencil />
                        </i>
                        <span className="text nav-text">Създай</span>
                      </CustomNavLink>
                    </li>
                    {/* <li className="nav-link">
                      <CustomNavLink
                        to="/app/settings"
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <TbSettings />
                        </i>
                        <span className="text nav-text">Настройки</span>
                      </CustomNavLink>
                    </li> */}
                  </>
                ) : (
                  <>
                    <li className="nav-link">
                      <CustomNavLink
                        to="/app/register"
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <GoPencil />
                        </i>
                        <span className="text nav-text">Регистрирай се</span>
                      </CustomNavLink>
                    </li>
                    <li className="nav-link">
                      <CustomNavLink
                        to="/app/login"
                        activeClassName="active"
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <BiLogIn />
                        </i>
                        <span className="text nav-text">Вход</span>
                      </CustomNavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="bottom-content">
              {token ? (
                <li className="logout">
                  <a onClick={handleLogout}>
                    <i className="icon">
                      <BiLogOut />
                    </i>
                    <span className="text nav-text">Излез</span>
                  </a>
                </li>
              ) : (
                <></>
              )}
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
