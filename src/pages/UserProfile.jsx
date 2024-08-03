import { useEffect, useState } from "react";
import axiosInstance from "../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const UserProfile = () => {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosInstance.get(`${baseURL}/api/User/Profile`);
        if (res.data.statusCode === 200) {
          setProfileData(res.data.data.profile);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        // Toast Notification
        toast.error("Error Fetching Profile", {
          pauseOnHover: false,
        });
      }
    };
    getProfile();
  }, []);

  return (
    <>
      {loading ? (
        <div className="max-w-md mx-auto bg-darkBlue shadow-md rounded-lg overflow-hidden min-h-[350px] animate-pulse"></div>
      ) : (
        <section className="max-w-md mx-auto bg-darkBlue shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/25 pb-2 ">User Profile</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Date Created:</span>
                <span>
                  {new Date(profileData?.datecreated).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date Updated:</span>
                <span>
                  {profileData?.dateupdated
                    ? new Date(profileData?.dateupdated).toLocaleString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email Address:</span>
                <span>{profileData?.emailaddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">First Name:</span>
                <span>{profileData?.firstname}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Name:</span>
                <span>{profileData?.lastname}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Middle Name:</span>
                <span>{profileData?.middlename || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone Number:</span>
                <span>{profileData?.phonenumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email Confirmed:</span>
                <span>{profileData?.isEmailConfirmed ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Active:</span>
                <span>{profileData?.isactive ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Role:</span>
                <span>{profileData?.roleDetails.roleName}</span>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default UserProfile;
