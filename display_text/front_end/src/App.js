import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from  './Components/Login';
import Displaybox from './Components/displaybox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path='/displaybox' element={<Displaybox />}/>
      </Routes>
    </Router>
  );
}

export default App;
