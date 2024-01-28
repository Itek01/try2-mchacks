import React from 'react';
import '../Pages/Styling/Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <button onClick={startGame}> Start Game </button>
            <button onClick={openMultiplayerLobby} className='multiplayerButton'> Multiplayer Lobby </button>
        </div>
    );
};

const startGame = () => {
    console.log("Starting Game...");
};

const openMultiplayerLobby = () => {
    console.log("Opening Multiplayer Lobby...");
};

export default Menu;