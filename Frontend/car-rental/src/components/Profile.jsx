import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = ({ setShowProfile }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch user data once when the modal open
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/profile`,
          { withCredentials: true }
        );
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false); // this is crucial
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_GENERAL_API}/api/updateProfile`,
        { name, email },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully")
      navigate("/")
      setShowProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_GENERAL_API}/api/deleteProfile`,
        { withCredentials: true }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm min-h-screen">
      <div className="bg-white rounded-3xl shadow-xl w-[400px] max-w-[90%] p-8 relative">
        {/* Close button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors duration-200"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Profile
        </h2>

        {/* Form */}
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Update Profile
          </button>
        </form>

        {/* Delete button */}
        <button
          onClick={handleDeleteProfile}
          className="mt-4 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 w-full"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
