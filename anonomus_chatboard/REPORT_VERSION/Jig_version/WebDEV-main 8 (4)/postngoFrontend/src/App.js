import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Studentlogin from './components/Studentlogin';
//import Main from './components/Main'
import Adminlogin from './components/Adminlogin';
import NewAccount from './components/NewAccount';
import StudentView from './components/Studentview';
// import StudentView from './components/Studentview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Studentlogin />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/NewAccount" element={<NewAccount />} />
        <Route path="/StudentView" element={<StudentView />} />
      </Routes>
    </Router>
  );
};

export default App;

