// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import List from './pages/List';
import CampDetails from './pages/CampDetails';
import SearchList from './pages/SearchList';
import SignUp from './pages/SignUp';
import UserList from './UserList'; 
import Login from './pages/Login';
import FavoriteList from './pages/FavoriteList';
import './App.css';


function App() {
    const [campList, setCampList] = useState([]);

    // 카카오톡 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/list" element={<List campList={campList} setCampList={setCampList} />} />
                    <Route path="/camp/:id" element={<CampDetails campList={campList} />} />
                    <Route path="/searchlist" element={<SearchList />} />
                    <Route path="/signUp" element={<SignUp/>} />
                    <Route path="/UserList" element={<UserList/>} />
                    
                    <Route path="/login" element={<Login/>} />
                    <Route path="/favoriteList" element={<FavoriteList/>} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
