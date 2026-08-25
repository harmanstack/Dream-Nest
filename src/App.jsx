// React Router
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

// Homepage components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Steps from "./components/Steps";
import CTA from "./components/CTA";

// Pages
import Studio from "./pages/Studio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// CSS
import "./App.css";


// ========================================
// HOME PAGE
// ========================================
function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Steps />

      <CTA />

      <Features />
    </>
  );
}


// ========================================
// MAIN APP
// ========================================
function App() {

  return (
    <HashRouter>

      <Routes>

        {/* Standard Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/studio"
          element={<Studio />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
        
        <Route
           path="/login"
           element={<Login />}
        />

        {/* Explicit GitHub Pages Subfolder Route Matches */}
        <Route
          path="/DreamNest"
          element={<Home />}
        />

        <Route
          path="/DreamNest/"
          element={<Home />}
        />

        <Route
          path="/DreamNest/studio"
          element={<Studio />}
        />

        <Route
          path="/DreamNest/about"
          element={<About />}
        />

        <Route
          path="/DreamNest/contact"
          element={<Contact />}
        />

        <Route
          path="/DreamNest/login"
          element={<Login />}
        />

        {/* Universal Catch-all Route */}
        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </HashRouter>
  );
}

export default App;