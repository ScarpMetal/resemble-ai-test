import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="flex h-16 gap-4 px-4 items-center">
      <img src={logo} alt="logo" className="h-full" />
      <Link to="/" className="ml-auto">
        Home
      </Link>
      <Link to="/voices">Voices</Link>
      <Link to="/about">About</Link>
    </div>
  );
}
