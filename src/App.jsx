import Chat from "./components/Chat"
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Admin from "./components/Admin"
function App() {

  return (
    <Router>
        <div className="App">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App
