import React, { useState, useRef } from 'react';
import './Styling/TrackChooser.css';
import { useNavigate } from 'react-router-dom';


const TrackChooser = () => {
    const [background, setBackground] = useState('');
    const tracks = [
        { id: 1, name: 'Wall Guys', description: 'A fun joyful song made to move! A pure Classic.', imageUrl: require('./Images/Track1.jpg'), audioUrl: require('./Sounds/Track1.mp3') },
        { id: 2, name: 'Cool It Down', description: 'A chiller vibe, relax and calmly get your moves in!', imageUrl: require('./Images/Track2.jpg'), audioUrl: require('./Sounds/Track2.mp3') },
        { id: 3, name: 'Party On', description: 'Party is on! Get ready to HAVE FUN!', imageUrl: require('./Images/Track3.jpg'), audioUrl: require('./Sounds/Track3.mp3') },
        { id: 4, name: 'The Crab Dance', description: 'What is this? I\'m feeling good!', imageUrl: require('./Images/Track4.jpg'), audioUrl: require('./Sounds/Track4.mp3') }
    ];

    // Create an array of audio refs using useRef
    const audioRefs = useRef(tracks.map(() => new Audio()));
    const navigate = useNavigate();

    const handleMouseEnter = (trackIndex) => {
        // Pause the currently playing audio, if any
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }

        // Play the selected track's audio
        const selectedAudio = audioRefs.current[trackIndex];
        selectedAudio.src = tracks[trackIndex].audioUrl;
        selectedAudio.play().catch((e) => console.log('Error playing the track:', e));

        // Set the background image
        setBackground(tracks[trackIndex].imageUrl);

        // Update the currentAudio state
        setCurrentAudio(selectedAudio);
    };

    const handleMouseLeave = () => {
        // Pause the currently playing audio on mouse leave
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
        }
    };

    const handleTrackClick = (trackId) => {
        // Navigate to the Solo Game page with the selected track's ID as a parameter
        currentAudio.pause();
        navigate(`/sologame/${trackId}`);
    };

    // State to store the currently playing audio
    const [currentAudio, setCurrentAudio] = useState(null);

    return (
        <div className="track-chooser" style={{ backgroundImage: `url(${background})` }}>
            <div className="tracks-container">
                    {tracks.map((track, index) => (
                        <div
                            key={track.id}
                            className="track"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleTrackClick(track.id)}
                        >
                            <button>
                                <div className="track-info">
                                    <h3 className="title">{track.name}</h3>
                                    <p className="description">{track.description}</p>
                                </div>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TrackChooser;