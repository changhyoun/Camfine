import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import './App.css';
import './components/Responsive.css';

// 동적 import로 컴포넌트들을 lazy 로딩
const Main = lazy(() => import('./pages/Main'));
const List = lazy(() => import('./pages/List'));
const CampDetails = lazy(() => import('./pages/CampDetails'));
const SearchList = lazy(() => import('./pages/SearchList'));
const SignUp = lazy(() => import('./pages/SignUp'));
const UserList = lazy(() => import('./UserList'));
const Login = lazy(() => import('./pages/Login'));
const FavoriteList = lazy(() => import('./pages/FavoriteList'));
const Not_Found = lazy(() => import('./pages/Not_Found'));

function App() {
    const BASE_URL = import.meta.env.BASE_URL;
    const [campList, setCampList] = useState([]);

    // 카카오톡 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }

    return (
        <Router basename={BASE_URL}>
            <div className="App">
                {/* Suspense로 Lazy 로딩된 컴포넌트들을 감싸서 로딩 중 로딩 컴포넌트를 표시 */}
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/list" element={<List campList={campList} setCampList={setCampList} />} />
                        <Route path="/camp/:id" element={<CampDetails campList={campList} />} />
                        <Route path="/searchlist" element={<SearchList />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/UserList" element={<UserList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/favoriteList" element={<FavoriteList />} />
                        <Route path="*" element={<Not_Found />} /> {/* 없는페이지 표시 */}
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
