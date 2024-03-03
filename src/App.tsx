import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Home from './pages/home';
import Videos from './pages/videos';
import Parts from './pages/parts';
import Lessons from './pages/lesson';
import LessonVideo from './pages/lessonVideo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      console.log('is logged in');
    }
  }
  useEffect(() =>{
    handleLogin();
    
  }, [])
  return (
    <div className="App">
      <Sidebar/>
      <div className='content'>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path='/signup' Component={SignupPage}/>
          <Route path='/profile' Component={ProfilePage}/>
          <Route path='/video' Component={Videos}/>
          <Route path='/course/:id' Component={Parts}/>
          <Route path='/part/:id' Component={Lessons}/>
          <Route path='/lesson/:id' Component={LessonVideo}/>
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
