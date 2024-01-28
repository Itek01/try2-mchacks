import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import Model from './Pages/Model';
import { WebSocketDemo } from './Pages/WebSocketDemo';
import Menu from './Pages/Menu';
import SoloGame from './Pages/SoloGame';
import TrackChooser from './Pages/TrackChooser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Model" element={<Model />} />
        <Route path="/WebSocketDemo" element={<WebSocketDemo />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sologame/:trackId" element={<SoloGame/>} />
        <Route path="/choosetrack" element={<TrackChooser/>} />

      </Routes>
    </Router>
  );
}

export default App;
