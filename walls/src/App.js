import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';
import Model from './Pages/Model';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Model" element={<Model />} />
      </Routes>
    </Router>
  );
}

export default App;
