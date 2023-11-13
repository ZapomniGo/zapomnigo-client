import { BiChevronRight, BiHomeAlt, BiSearch, BiLogOut, BiMoon, BiSun } from "react-icons/bi";


export const Navigation = () => {
    return(
        <div className="navigation_bar">
            <nav className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="src/app-components/Navigation/logo.png" alt="logo"></img>
                        </span>

                        <div className="text header-text">
                            <span className="name">Aleks Ivan</span>
                            <span className="profession">Web Developer</span>
                        </div>
                    </div>
                    <i className="toggle">
                        <BiChevronRight />
                    </i>
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

                        <li className="mode">
                            <div className="moon-sun">
                                <i className="moon">
                                    <BiMoon/>
                                </i>
                                <i className="sun">
                                    <BiSun/>
                                </i>
                            </div>
                            <span className="mode-text text"> Dark Mode</span>
                            <div className="toggle-switch">
                                <span className="switch"></span>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    )
    
}