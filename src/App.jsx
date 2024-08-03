import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MyWallet from "./pages/MyWallet";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const location = useLocation();
  const authRoutes = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/verify';

  return (
    <div className="relative bg-background w-full min-h-screen text-primaryColor pb-8 font-[Outfit]">
      {authRoutes ? null : <Header />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index path="/" element={<Home />} />
          <Route path="/wallet" element={<MyWallet />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
