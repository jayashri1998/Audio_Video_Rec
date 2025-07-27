import React from 'react';

import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RecordingsList from './component/RecordingList'

export default function App() {
  return (
  
    <Router>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path ='/recordings' element={<RecordingsList/>}></Route>
    </Routes>
    </Router>
  );
}
