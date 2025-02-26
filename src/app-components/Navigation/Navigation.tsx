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
import { BiLogIn } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

interface NavigationProps {
  children?: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = (props) => <RRNavLink {...props} />;

export const Navigation: React.FC<NavigationProps> = (props) => {
  const navigate = useNavigate();
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const toastLimit = window.innerWidth <= 900 ? 2 : 3;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: { username: string; institution: string } =
        jwtDecode(token);
      setUsername(decodedToken.username);
      setInstitution(decodedToken.institution);
      // props.Token(decodedToken);
    }

    const searchToken = localStorage.getItem("searchToken");
    if (searchToken) {
      document.querySelector("input[name=search]").value = searchToken;
    }
  }, []);

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

  const search = (value: string) => {
    if (value.length > 64) {
      toast.error("Търсенето трябва да бъде по-малко от 64 символа");
    } else {
      props.onSearch(value);
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer limit={toastLimit} />
      <div className="navigation-bar">
        <div className="nav-mobile">
          <div className="menu-mobile">
            <RxHamburgerMenu
              className="menu-mobile"
              onClick={handleHamburgerClick}
            />
          </div>
          <div className="search-box">
            <i className="icon" onClick={() => search(inputValue)}>
              <BiSearch />
            </i>
            <input
              type="search"
              name="search"
              placeholder="Търси..."
              onChange={(event) => setInputValue(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  search(event.target.value);
                }
              }}
            />
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
                <i className="icon" onClick={() => search(inputValue)}>
                  <BiSearch />
                </i>
                <input
                  type="search"
                  placeholder="Търси..."
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      search(event.target.value);
                    }
                  }}
                />
              </li>
              <ul className="menu-links">
                <li className="nav-link">
                  <a
                    onClick={() => {
                      handleCloseClick();
                      if (window.location.pathname == "/app/") {
                        window.location.reload();
                      }
                      navigate("/app/");
                    }}
                    className={window.location.pathname == "/app/" && "active"}
                  >
                    <i className={"icon "} style={{ transform: "scale(1.3)" }}>
                      <BiHomeAlt />
                    </i>
                    <span className="text nav-text">Начало</span>
                  </a>
                </li>
                {token ? (
                  <>
                    <li className="nav-link">
                      <NavLink
                        to={`/app/sets/${username}`}
                        onClick={handleCloseClick}
                      >
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <TbCards />
                        </i>
                        <span className="text nav-text">Моите тестета</span>
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="/app/folders" onClick={handleCloseClick}>
                        <i className="icon">
                          <FaRegFolderOpen />
                        </i>
                        <span className="text nav-text">Моите папки</span>
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="/app/create" onClick={handleCloseClick}>
                        <i className="icon" style={{ transform: "scale(1.3)" }}>
                          <GoPencil />
                        </i>
                        <span className="text nav-text">Създай</span>
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="/app/settings" onClick={handleCloseClick}>
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <TbSettings />
                        </i>
                        <span className="text nav-text">Настройки</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-link">
                      <NavLink to="/app/register" onClick={handleCloseClick}>
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <GoPencil />
                        </i>
                        <span className="text nav-text">Регистрирай се</span>
                      </NavLink>
                    </li>
                    <li className="nav-link">
                      <NavLink to="/app/login" onClick={handleCloseClick}>
                        <i className="icon" style={{ transform: "scale(1.2)" }}>
                          <BiLogIn />
                        </i>
                        <span className="text nav-text">Вход</span>
                      </NavLink>
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
