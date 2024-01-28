import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Pages/About';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
