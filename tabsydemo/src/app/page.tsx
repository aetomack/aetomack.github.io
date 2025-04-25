import Navbar from "./Navbar.js";
import Intro from "./Intro.js";
import Downloads from "./Downloads.js";
import DemoCarousel from "./DemoCarousel.js";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col space-y-16">
        <Navbar />
        <Intro />
        <Downloads />
        <DemoCarousel />
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
