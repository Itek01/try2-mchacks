import React from 'react';
import '../Pages/Styling/Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu(){
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/sologame');
    };

    return (
        <div className="menu">
            <button onClick={startGame}> Start Game </button>
            <button onClick={openMultiplayerLobby} className='multiplayerButton'> Multiplayer Lobby </button>
        </div>
    );
};

const openMultiplayerLobby = () => {
    console.log("Opening Multiplayer Lobby...");
};

export default Menu;