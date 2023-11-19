import { BiHomeAlt, BiSearch, BiLogOut} from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../app-context/store";
import { navReducer } from "../../app-context/navigationSlice";
import { TbCards } from "react-icons/tb";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { TbSettings } from "react-icons/tb";



import { Outlet } from "react-router";

export const Navigation = (props) => {

    const navigationSliceManager = useAppSelector((state) => state.navigationReducer);
    const dispatch = useAppDispatch();
    let timeoutId: number;

    const handleMouseEnter = () => {
        if (window.innerWidth > 900) {
            timeoutId = setTimeout(() => {
                dispatch(navReducer({open: true}));
            }, 150);
        }
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        dispatch(navReducer({open: false}));
    };

    const handleHamburgerClick = () => {
        dispatch(navReducer({open: true}));
    };

    const handleCloseClick = () => {
        dispatch(navReducer({open: false}));
    }


    return(
        <div className="wrapper">
            <div className="navigation_bar" >
                <RxHamburgerMenu className = "menu-mobile" onClick={handleHamburgerClick} />
                <nav
                    className={`sidebar ${navigationSliceManager.open ? "" : "close"}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >                
                    <header>
                        <IoMdClose className="close_mobile" onClick={handleCloseClick}/>

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
                                    <BiSearch/>
                                </i>
                                <input type="search" placeholder="Search..." />
                            </li>
                            <ul className="menu-links">
                                <li className="nav-link">
                                    <a href="#">
                                        <i className="icon" style={{'transform': "scale(1.3)"}}>
                                            <BiHomeAlt/>
                                        </i>
                                        <span className="text nav-text">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className="icon" style={{'transform': "scale(1.2)"}}>
                                            <TbCards />
                                        </i>
                                        <span className="text nav-text" >My Sets</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className="icon">
                                            <FaRegFolderOpen />

                                        </i>
                                        <span className="text nav-text">My Folders</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className="icon" style={{'transform': "scale(1.3)"}}>
                                            <GoPencil/>
                                        </i>
                                        <span className="text nav-text">Create</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <i className="icon" style={{'transform': "scale(1.2)"}}>
                                            <TbSettings/>
                                        </i>
                                        <span className="text nav-text">Settings</span>
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
            {navigationSliceManager.open}
            {props.children}
            <Outlet />
        </div>
    )
    
}