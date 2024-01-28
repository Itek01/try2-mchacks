import React, { useState, useEffect, useRef} from 'react';
import './Styling/SoloGame.css';
import { useParams } from 'react-router-dom';

const tracks = [
    { id: 1, name: 'Track 1', audioUrl: './Sounds/Track1.mp3' },
    { id: 2, name: 'Track 2', audioUrl: './Sounds/Track2.mp3' },
    { id: 3, name: 'Track 3', audioUrl: './Sounds/Track3.mp3' },
    { id: 4, name: 'Track 4', audioUrl: './Sounds/Track4.mp3' }

    // Add more tracks as needed
];

const SoloGame = () => {
    const [walls, setWalls] = useState([{ id: 1, size: 10 }]);
    const [isGrowing, setIsGrowing] = useState(true);
    const [countdown, setCountdown] = useState(10);

    const { trackId } = useParams();
    const wallSpeed = 12;
    const audioRef = useRef();

    const toggleMusic = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        if (isGrowing) {
            const interval = setInterval(() => {
                setWalls((currentWalls) => {
                    return currentWalls.map(wall => {
                        return wall.size < 1000
                            ? { ...wall, size: wall.size + wallSpeed }
                            : wall;
                    });
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isGrowing]);

    useEffect(() => {
        const lastWall = walls[walls.length - 1];
        if (lastWall.size >= 1000) {
            setIsGrowing(false); // Stop the wall from growing
            setTimeout(() => {
                setWalls((currentWalls) => {
                    // Remove the first wall and add a new wall
                    const newWalls = currentWalls.slice(1);
                    newWalls.push({ id: lastWall.id + 1, size: 10 });
                    return newWalls;
                });
                setCountdown(10);
                setIsGrowing(true); // Start growing the new wall
            }, 3000); // Wait for 3 seconds before replacing the wall
        }
    }, [walls]);

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setWallSize(prevSize => prevSize + wallSpeed); // Grow the wall
        // }, 100); // Change the size every 100 milliseconds

        if (audioRef.current) {
            audioRef.current.play().catch((e) => {
                console.error("Playback failed:", e);
            });
        }

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : 0);
        }, 1000);

        return () => clearInterval(countdownInterval);

        // return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className="sologame">
            <div className="countdown">{countdown}</div>
            <div className="walls-container">
                {walls.map((wall) => (
                    <div key={wall.id} className="wall" style={{ width: wall.size, height: wall.size / 1.5 }}></div>
                ))}
            </div>
            <div className="controls">
            <audio ref={audioRef} src={require(`./Sounds/Track${trackId}.mp3`)} preload="auto" loop onError={(e) => console.log('Error loading audio:', e)} />
                <button onClick={toggleMusic}>Toggle Music</button>
            </div>
        </div>
    );
};

export default SoloGame;