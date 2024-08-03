import { useEffect, useState } from "react";
import axiosInstance from "../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
const MyWallet = () => {
  const [myWalletData, setMyWalletData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}/api/Wallet/MyWallet`);
        if (res.data.statusCode === 200) {
          setMyWalletData(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // Toast Notification
        toast.error("Error Fetching Wallets", {
          pauseOnHover: false,
        });
      }
    };
    fetchWallets();
  }, []);

  return (
    <>
      {loading ? (
        <div className="max-w-sm mx-auto bg-blue-500 text-white shadow-lg rounded-lg overflow-hidden min-h-[200px] animate-pulse"></div>
      ) : (
        <div className="max-w-sm mx-auto bg-blue-500 text-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Wallet</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Wallet Number:</span>
                <span className="font-mono text-lg">
                  {myWalletData?.walletNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Balance:</span>
                <span className="font-mono text-lg">
                  ${myWalletData?.balance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Created Date:</span>
                <span>
                  {new Date(myWalletData?.createdDate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Updated Date:</span>
                <span>
                  {myWalletData?.updateDated
                    ? new Date(myWalletData?.updateDated).toLocaleString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">User ID:</span>
                <span>{myWalletData?.userID}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MyWallet;
