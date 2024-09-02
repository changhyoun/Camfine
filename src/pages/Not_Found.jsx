// 404 page
import { page_not_found } from '../components/Images';
import './Not_Found.css';
import { Link } from 'react-router-dom';

function Not_Found() {
   
    return (
        <div id="Not_Found">
            <img src={page_not_found} alt="page_not_found" />
            <p>페이지가 존재하지 않아요 ❗</p>
            <Link to='/'>
                <button className="Not_Found_btn">
                    메인 페이지로 <span className="material-symbols-rounded">arrow_forward_ios</span>
                </button>
            </Link>
            
        </div>
    );
}

export default Not_Found;