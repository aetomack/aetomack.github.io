import Navbar from "./Navbar.js";
import Intro from "./Intro.js";
import Downloads from "./Downloads.js"

export default function Home() {
  return (
    <div>
      <main className="flex flex-col space-y-16">
        <Navbar />
        <Intro />
        <Downloads />
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
