import logo from './logo.svg';
import './App.css';
import React from 'react';
import PacketRaceGame from './PacketRaceGame';

function App() {
  return (
    <div style={{ 
        backgroundColor: '#0f0f1a', 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px' 
 }}> 
    <PacketRaceGame /> 
    </div> 
 ); 
}

export default App;
