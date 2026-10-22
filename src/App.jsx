// React Router
import {
  HashRouter,
  Routes,
  Route,
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
import Projects from "./pages/Projects";

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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/studio/:projectId" element={<Studio />} />

        <Route path="/DreamNest" element={<Home />} />
        <Route path="/DreamNest/" element={<Home />} />
        <Route path="/DreamNest/about" element={<About />} />
        <Route path="/DreamNest/contact" element={<Contact />} />
        <Route path="/DreamNest/login" element={<Login />} />
        <Route path="/DreamNest/dashboard" element={<Projects />} />
        <Route path="/DreamNest/projects" element={<Projects />} />
        <Route path="/DreamNest/studio" element={<Studio />} />
        <Route path="/DreamNest/studio/:projectId" element={<Studio />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;