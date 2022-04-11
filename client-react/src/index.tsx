import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminScreen from '../src/routes/AdminScreen';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from './routes/LoginScreen';
import BookingScreen from './routes/BookingScreen';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path="/book-equipments" element={<BookingScreen />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
