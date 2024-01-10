import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


export const Footer = () => {
    return (
        <div id="footer">
            <div className="col-1">
                <div className="footer-logo">
                    <img src="src/app-components/Footer/image.png" alt="" />
                </div>
                <div className="social-media">
                    <a href="#">
                        <FaFacebookSquare />
                    </a>
                    <a href="#">
                        <BsInstagram />
                    </a>
                    <a href="#" className="email">
                        <MdEmail />
                    </a>
                    <a href="#">
                        <BsInstagram />
                    </a>
                    
                </div>
            </div>
            <div className="col-2">
                <div className="about-us">
                    <h2 >About us</h2>
                </div>
                <div className="options">
                    <ul>
                        <li>
                        <a href="">About ZapomniGo</a>
                        </li>
                        <li>
                            <a href="">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-3">
                <div className="about-us">
                    <h2 >About us</h2>
                </div>    
                <div className="options">
                    <ul>
                        <li>
                        <a href="">About ZapomniGo</a>
                        </li>
                        <li>
                            <a href="">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-3">
                <div className="about-us">
                    <h2 >About us</h2>
                </div>    
                <div className="options">
                    <ul>
                        <li>
                        <a href="">About ZapomniGo</a>
                        </li>
                        <li>
                            <a href="">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="">Terms and Conditions</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
