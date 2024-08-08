import './Header.css';
import { logoColor } from './Images';
import { Link } from 'react-router-dom';

function Header(){

    return(
        <div id="Header">
            <div className="Header_inner">
                <img src={logoColor} alt="logoColor" />
                <Link to={"/"}>
                    로그인 / 회원가입
                </Link>
            </div>
            
        </div>
    )
}

export default Header;