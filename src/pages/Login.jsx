import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Login = () => {
  const { loginUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin(e) {
    e.preventDefault();
    // check if email and password are empty
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      toast.error("Missing credentials!", {
        pauseOnHover: false,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/Account/Authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailaddress: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const data = await response.json();
      // Toast Notification
      loginUser(data);
      toast.success("Login Successful!", {
        pauseOnHover: false,
      });
    } catch (error) {
      // Toast Notification
      toast.error("Login Unsuccessful", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen px-6 font-light">
      <form
        onSubmit={handleLogin}
        className="bg-darkBlue flex flex-col w-full  p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8"
      >
        <h1 className=" mb-[40px] text-[32px] font">Login</h1>
        <input
          required
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="
            outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent"
        />
        <button
          disabled={loading}
          className={
            loading
              ? `bg-redColor rounded-[6px] mb-6 py-4 cursor-not-allowed opacity-50`
              : "bg-redColor rounded-[6px] mb-6 py-4 cursor-pointer duration-500 hover:bg-primaryColor hover:text-darkBlue"
          }
        >
          Login to your account
        </button>
        <div className="flex gap-x-2 text-[15px] self-center">
          <p className="">Don’t have an account?</p>
          <Link to="/signup" className="text-redColor ">
            Sign Up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
