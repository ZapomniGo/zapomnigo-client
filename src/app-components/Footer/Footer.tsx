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
          <div className="footer-logo">
          <Tilty reverse={true} glare={true} max={15} maxGlare={0.7}>
            <img src="/image.jpg" alt="Лого" />
            </Tilty>
          </div>
      </div>
      <div className="col-2">
        <div className="options">
            <div>
                <a className="link" href="/app/legal/terms-of-service">
                    Общи условия
                </a>
            </div>

          <a className="link" href="/app/legal/cookie-rules">
            Политика за бисквитки
          </a>
          <a className="link" href="/app/legal/privacy-policy">
            Политика за поверителност
          </a>
        </div>
      </div>
    {/* <div className="col-2">
        <div className="options">
          <a className="link" href="/legal/terms-of-service">
            Общи условия
          </a>
          <a className="link" href="/legal/cookie-rules">
            Политика за бисквитки
          </a>
          <a className="link" href="/legal/privacy-policy">
            Политика за поверителност
          </a>
        </div>
      </div> */}
      <div className="social-media">
        <div className="options">
          <a href="https://www.facebook.com/profile.php?id=61555653000101">
            <FaFacebookSquare />
          </a>
          <a href="https://www.instagram.com/zapomnigo">
            <BsInstagram />
          </a>
          <a href="mailto:zapomnigo.com@gmail.com" className="">
            <SiGmail />
          </a>
        </div>
      </div>
    </div>
  );
};
