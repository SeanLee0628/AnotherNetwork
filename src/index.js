import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Board from './Board';
import People from './People';
import PostDetail from './PostDetail';
import Mentoring from './Mentoring';
import './index.css'; // 전역 스타일 시트

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/board" element={<Board />} />
            <Route path="/people" element={<People />} />
            <Route path="/PostDetail/:postId" element={<PostDetail />} />
            <Route path="/mentoring" element={<Mentoring />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
