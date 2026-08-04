import logo from './logo.svg';
import './App.css';
import React from 'react';
import PacketRaceGame from './PacketRaceGame';
import back2 from './back2.jpg';

function App() {
  return (
    <div style={{ 
        boxSizing: 'border-box',
        // backgroundColor: '#0f0f1a', 
        backgroundImage: `url(${back2})`,
        backgroundSize: 'cover',
        minHeight: '100vh', 
        maxWidth: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        // padding: '20px',
        overflow: 'hidden' 
 }}> 
    <PacketRaceGame /> 
    </div> 
 ); 
}

export default App;
