import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";


export const Footer = () => {
    return (
        <div id="footer">
            <div className="col-1">
                <div className="footer-logo">
                    <img src="src/app-components/Footer/image.png" alt="" />
                </div>
            </div>
            <div className="col-2">
                <div className="about-us">
                    <h2>Общи условия</h2>
                </div>
                <div className="options">
                    <ul>
                        <li>
                        <a href="">Политика за поверителност</a>
                        </li>
                        <li>
                            <a href="">Политика за ползване</a>
                        </li>
                        <li>
                            <a href="">Маркетингово съгласие</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="social-media">
                <div className="options">
                    <a href="#">
                        <FaFacebookSquare />
                    </a>
                    <a href="#">
                        <BsInstagram />
                    </a>
                    <a href="#" className="">
                        <SiGmail />
                    </a>
                    <a href="#">
                        <RiTwitterXLine />
                    </a>                    
                </div>
                {/* <div className="options">
                    <a href="#" className="">
                        <SiGmail />
                    </a>
                    <a href="#">
                        <RiTwitterXLine />
                    </a>
                    
                </div> */}
            </div>
            {/* <div className="col-3">
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
            </div> */}
        </div>
    );
}
