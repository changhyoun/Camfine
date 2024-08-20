import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './DetailFooter.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { go_browser_icon } from './Images';

function DetailFooter() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { campList } = location.state || { campList: [] };
    const [camp, setCamp] = useState(null);

    const backBtn = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (campList && campList.length > 0) {
            const foundCamp = campList.find(c => String(c.contentId) === String(id));
            setCamp(foundCamp);
        }
    }, [campList, id]);

    useEffect(() => {
        if (camp) {
            const getWeatherData = async () => {
                const cityName = camp.sigunguNm;
                const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},KR&appid=${apiKey}&units=metric&lang=kr`;
                
                // weather data fetching logic here
            };

            getWeatherData();
        }
    }, [camp]);

    return (
        <div id="DetailFooter">
            <div className="DetailFooter_inner">
                <button className="back" onClick={backBtn}>
                    <span className="material-symbols-rounded">
                        keyboard_backspace
                    </span>
                </button>
                <button className="reser">
                    {camp && camp.resveUrl ? (
                        <a href={camp.resveUrl} target="_blank" rel="noopener noreferrer">
                            <img src={go_browser_icon} alt="go_browser_icon" />
                        </a>
                    ) : (
                        <span className="no-resve-url">예약주소가 없네요!</span>
                        
                    )}
                </button>
                <button className="love">
                    <span className="material-symbols-rounded">
                        favorite
                    </span>
                </button>
            </div>
        </div>
    );
}

export default DetailFooter;
