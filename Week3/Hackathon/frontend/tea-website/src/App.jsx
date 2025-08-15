import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/layouts/Header/page";
import Footer from "./components/layouts/Footer/page";
import Home from "./pages/home";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
