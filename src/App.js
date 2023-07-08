import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
