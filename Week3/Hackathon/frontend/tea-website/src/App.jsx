import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/layouts/Header/page";
import Footer from "./components/layouts/Footer/page";
import Home from "./pages/home";
import PublicRoute from "./components/shared/common/PublicRoute";
import LoginForm from "./components/forms/loginForm";
import SignupForm from "./components/forms/signupForm";
import ProductsPage from "./pages/productsPage";

import SingleProductPage from './pages/singleProductPage';

import BagPage from "./pages/BagPage";


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<ProductsPage/> } />

        <Route path="/product/:slug" element={<SingleProductPage/>} />

        <Route path="/cart" element={<BagPage/> } />

        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupForm /></PublicRoute>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
