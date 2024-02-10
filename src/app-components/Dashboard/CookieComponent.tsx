import { useState } from "react";

export const CookieComponent: React.FC = () => {
    const [hide, setHide] = useState('');
    const verify = () => {
        localStorage.setItem('cookieConsent2', 'true');
        setHide('hide');
      };
      const optional = () => {
        localStorage.setItem('cookieConsent2', 'optional');
        setHide('hide');      };
    
    return (
        <div className={`cookie-component ${hide}`}>
            <div className="test">
            <div className="cookieComponent__content">
                <p>
                    Ние използваме бисквитки, за да подобрим вашето преживяване на нашия уебсайт. 
                    Можете да прочетете повече за тях в нашата <a href="/app/privacy-policy">политика за поверителност</a>.
                </p>
            </div>
            <div className="cookieComponent__button">
                <button onClick={optional}>Съгласен съм <br></br> (само със задължителните)</button>
                <button onClick={verify}>Сългасен съм</button>
            </div>
            </div>
        </div>
    )
}