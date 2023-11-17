import { BiHomeAlt, BiSearch, BiLogOut} from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";


import { useState } from "react";

export const Navigation = ({ onSidebarToggle }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    let timeoutId: number;

    const handleMouseEnter = () => {
        if (window.innerWidth > 900) {
            timeoutId = setTimeout(() => {
                setSidebarOpen(true);
                onSidebarToggle(true);

            }, 150);
        }
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setSidebarOpen(false);
        onSidebarToggle(false); 

    };

    const handleHamburgerClick = () => {
        setSidebarOpen(true); 
        onSidebarToggle(true);

    };

    const handleCloseClick = () => {
        setSidebarOpen(false);
        onSidebarToggle(false);

    }


    return(
        <div className="navigation_bar" >
            <RxHamburgerMenu className = "menu-mobile" onClick={handleHamburgerClick} />
            <nav
                className={`sidebar ${sidebarOpen ? "" : "close"}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >                
                <header>
                    <IoMdClose className="close_mobile" onClick={handleCloseClick}/>

                    <div className="image-text">
                        <span className="image">
                            <img src="src/app-components/MainPage/Navigation/logo.png" alt="logo"></img>
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
                                <BiSearch/>
                            </i>
                            <input type="search" placeholder="Search..." />
                        </li>
                        <ul className="menu-links">
                            <li className="nav-link">
                                <a href="#">
                                    <i className="icon">
                                        <BiHomeAlt/>
                                    </i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="icon">
                                        <BiHomeAlt/>
                                    </i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="icon">
                                        <BiHomeAlt/>
                                    </i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="icon">
                                        <BiHomeAlt/>
                                    </i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <i className="icon">
                                        <BiHomeAlt/>
                                    </i>
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
                                <i className="icon">
                                    <BiLogOut/>
                                </i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    )
    
}