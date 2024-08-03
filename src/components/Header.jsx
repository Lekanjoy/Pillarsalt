import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
    const {logoutUser} = useAuth()
  return (
    <header className="w-full mb-10 h-[10dvh] px-4 border-b border-white/20 flex justify-between items-center gap-x-3 shadow-md">
      <Link to="/">Home</Link>
      <div className="flex gap-x-2">
        <Link to="/wallet">My Wallet</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
