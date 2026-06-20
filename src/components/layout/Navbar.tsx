export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h2 className="text-xl font-bold tracking-wider">Y SPACE</h2>

        <ul className="hidden gap-8 md:flex">
          <li>WHAT WE DO</li>
          <li>ABOUT</li>
          <li>TEAM</li>
          <li>BLOG</li>
          <li>CONTACT</li>
        </ul>
        
        <button className="rounded-full bg-white px-5 py-2 text-black transition hover:scale-105">
          Book Call
        </button>
      </nav>
    </header>
  );
}
