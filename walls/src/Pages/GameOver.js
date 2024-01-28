import React from 'react';
import './Styling/GameOver.css'; // Create a CSS file for styling
import { useNavigate} from 'react-router-dom';


const GameOverScreen = ({score, onPlayAgainClick  }) => {

    const navigate = useNavigate();
    const handleBackToMenu = () => {
        // Navigate back to the menu page when the button is clicked
        navigate('/choosetrack'); // Replace '/menu' with the actual URL of your menu page
    };

    return (
        <div className="game-over-container">
            <div className="game-over-content">
                <h1 className="game-over-title">Game Over</h1>
                <p className="game-over-message">You scored {score} points!</p>
                <button className="play-again-button" onClick={onPlayAgainClick}> Play Again </button>
                <button className="main-menu-button" onClick={handleBackToMenu}> New Track </button>
            </div>
        </div>
    );
};

export default GameOverScreen;