import { useState } from "react";

// Global overlays / effects
import Aurora from "./components/Aurora";
import Spotlight from "./components/Spotlight";
import Cursor from "./components/Cursor";
import Noise from "./components/Noise";
import ScrollProgress from "./components/ScrollProgress";
import SocialDock from "./components/SocialDock";
import ScrollTop from "./components/ScrollTop";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Marquee from "./components/Marquee";
import GlobalStyles from "./components/GlobalStyles";

// Page sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

// Root component — composes every section + global effect together.
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden"
      style={{background:"#04020d", fontFamily:"'Outfit',sans-serif"}}>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* fixed overlays */}
      <Aurora />
      <Spotlight />
      <Cursor />
      <Noise />
      <ScrollProgress />
      <SocialDock />
      <ScrollTop />

      {/* main content */}
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Marquee />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>

      <GlobalStyles />
    </div>
  );
}
