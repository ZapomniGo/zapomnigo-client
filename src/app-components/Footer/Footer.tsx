import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import Tilty from "react-tilty";
export const Footer = () => {
  return (
    <div id="footer">
      <div onClick={()=>window.location.replace('https://www.zapomnigo.com')} className="col-1">
        <Tilty glare={true} max={20}>
          <div className="footer-logo">
            <img src="src/app-components/Footer/image.png" alt="" />
          </div>
        </Tilty>
      </div>
      <div className="col-2">
        <div className="options">
          <a className="link" href="/legal/terms-of-service">
            Общи условия
          </a>
          <a className="link" href="/legal/cookie-rules">
            Политика за бисквитки
          </a>
          <a className="link" href="/legal/privacy-policy">
            Политка за поверителност
          </a>
        </div>
      </div>
      <div className="social-media">
        <div className="options">
          <a href="www.facebook.com">
            <FaFacebookSquare />
          </a>
          <a href="https://www.instagram.com/zapomnigo">
            <BsInstagram />
          </a>
          <a href="mailto:zapomnigo.com@gmail.com" className="">
            <SiGmail />
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
};
