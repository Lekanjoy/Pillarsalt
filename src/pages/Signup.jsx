import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const midNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSignUp(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error("Passwords do not match.", {
        pauseOnHover: false,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/Account/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstNameRef.current.value,
          lastname: lastNameRef.current.value,
          middlename: midNameRef.current.value,
          phonenumber: phoneRef.current.value,
          role: parseInt(roleRef.current.value),
          emailaddress: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data?.statusCode === 200) {
        // Toast Notification
        toast.success(data?.message || "Signup Successful!", {
          pauseOnHover: false,
        });
        navigate("/verify");
      } else {
        toast.error(data?.message || "Error signing up!", {
          pauseOnHover: false,
        });
      }
      setLoading(false);
    } catch (error) {
      // Toast Notification
      toast.error("Error Creating Account", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen px-6 font-light lg:px-10 lg:py-20">
      <form
        onSubmit={handleSignUp}
        className="bg-darkBlue flex flex-col w-full mt-10 p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8 lg:max-w-[60%]"
      >
        <h1 className=" mb-[40px] text-[32px] font">Sign Up</h1>
        <input
          required
          ref={firstNameRef}
          type="text"
          placeholder="First Name"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={lastNameRef}
          type="text"
          placeholder="Last Name"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={midNameRef}
          type="text"
          placeholder="Middle Name"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={phoneRef}
          type="tel"
          placeholder="Phone Number"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <select
          required
          ref={roleRef}
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        >
          <option
            defaultValue={"Select Role"}
            disabled
            className="bg-darkBlue border-b py-1"
          >
            Select Role
          </option>
          <option value="32" className="bg-darkBlue">
            Participant
          </option>
          <option value="42" className="bg-darkBlue">
            Exams
          </option>
          <option value="52" className="bg-darkBlue">
            Examiner
          </option>
          <option value="62" className="bg-darkBlue">
            Vendor
          </option>
          <option value="99" className="bg-darkBlue">
            Administrator
          </option>
        </select>
        <input
          required
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={confirmPasswordRef}
          type="password"
          placeholder="Repeat Password"
          className="outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent"
        />
        <button
          disabled={loading}
          className={
            loading
              ? `bg-redColor rounded-[6px] mb-6 py-4 cursor-not-allowed opacity-50`
              : "bg-redColor rounded-[6px] mb-6 py-4 cursor-pointer"
          }
        >
          Create an account
        </button>
        <div className="flex gap-x-2 text-[15px] self-center">
          <p>Already have an account?</p>
          <Link to="/login" className="text-redColor ">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Signup;
