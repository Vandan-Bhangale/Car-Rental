import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Profile = ({ setShowProfile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authProvider,setAuthProvider] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  // fetch user data once when the modal open
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/profile`,
          { withCredentials: true },
        );
        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setAuthProvider(res.data.authProvider);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false); // this is crucial
      }
    };
    fetchProfile();
  }, []);


  //Update profile api call
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_GENERAL_API}/api/updateProfile`,
        { name, email },
        { withCredentials: true },
      );
      toast.success("Profile updated successfully");
      navigate("/");
      setShowProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };


  //Delete profile api call
  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_GENERAL_API}/api/deleteProfile`,
        { withCredentials: true },
      );
      toast.success("Profile deleted successfully");
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      setUserType(null);
      navigate("/");
      setShowProfile(false);
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  const handleSwitchToOwner = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_GENERAL_API}/api/switch-role`,{},{withCredentials:true});
      console.log(res.data.user);
      
      if(res.data.success) {
        localStorage.setItem("user",JSON.stringify(res.data.user));
        
        toast.success("Role switched successfully");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Error while switching role");
      console.log("Error while switching role: ",err); 
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl w-[400px]">
          Loading profile…
        </div>
      </div>
    );
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md min-h-screen">
    <div className="bg-white rounded-3xl shadow-2xl w-[420px] max-w-[90%] p-8 relative">

      {/* Close button */}
      <button
        onClick={() => setShowProfile(false)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-sm"
      >
        ✕
      </button>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-teal-200 flex items-center justify-center text-blue-800 font-semibold text-xl mb-3">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account details</p>

        {/* Status badge */}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Active account
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-6" />

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
          <input
            type="email"
            placeholder="jane@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-300"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          className="mt-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          Save Changes
        </button>
      </div>

      {/* Switch to Owner — only for Google auth users */}
      {authProvider === "google" && user.userType === "guest" && (
        <button
          onClick={handleSwitchToOwner}
          className="mt-3 w-full py-3 rounded-xl text-sm font-medium text-purple-600 border border-purple-100 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Switch to Owner
        </button>
      )}

      {/* Delete button */}
      <button
        onClick={handleDeleteProfile}
        className="mt-3 w-full py-3 rounded-xl text-sm font-medium text-red-500 border border-gray-100 hover:bg-red-50 hover:border-red-200 active:scale-[0.98] transition-all duration-200"
      >
        Delete Account
      </button>

    </div>
  </div>
);
};

export default Profile;
