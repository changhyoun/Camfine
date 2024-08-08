// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import List from './pages/List';
import CampDetails from './pages/CampDetails';

import './App.css';

function App() {
    const [campList, setCampList] = useState([]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/list" element={<List campList={campList} setCampList={setCampList} />} />
                    <Route path="/camp/:id" element={<CampDetails campList={campList} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
