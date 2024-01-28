import React, { useState, useEffect } from 'react';
import './Styling/SoloGame.css'; // Create and import your CSS file for styling

const SoloGame = () => {
    const [wallSize, setWallSize] = useState(10); // Starting size of the wall

    const wallSpeed = 8;

    useEffect(() => {
        const interval = setInterval(() => {
            setWallSize(prevSize => prevSize + wallSpeed); // Grow the wall
        }, 100); // Change the size every 100 milliseconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    console.log(wallSize.toString());
    return (
        <div className="sologame">
            <div className="wall" style={{ width: wallSize, height: wallSize }}></div>
        </div>
    );
};

export default SoloGame;