import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const codeRef = useRef();

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/api/Account/ConfirmActivationCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: emailRef.current.value,
            activationCode: codeRef.current.value,
          }),
        }
      );
      const data = await response.json();
      if (data?.statusCode === 200) {
        // Toast Notification
        toast.success(data?.message || "Email Verification Successful!", {
          pauseOnHover: false,
        });
        navigate("/login");
      } else {
        // Toast Notification
        toast.success(data?.message || "Email Verification Failed!", {
          pauseOnHover: false,
        });
      }
      setLoading(false);
    } catch (error) {
      // Toast Notification
      toast.error("Email Verification Failed", {
        pauseOnHover: false,
      });
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen px-6 font-light">
      <form
        onSubmit={handleEmailVerification}
        className="bg-darkBlue flex flex-col w-full  p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8"
      >
        <div className="mb-[40px]">
          <h1 className="text-[32px] font">Verify Email</h1>
          <p className="text-sm">Check your email for activation code</p>
        </div>
        <input
          required
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          required
          ref={codeRef}
          type="number"
          placeholder="Enter code"
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
          Verify
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default VerifyEmail;
