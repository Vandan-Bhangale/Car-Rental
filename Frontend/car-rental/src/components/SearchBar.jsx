import { useContext } from "react";
import { Search } from "lucide-react";
import { CarContext } from "../context/carContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setCurrentPage } = useContext(CarContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when typing
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">

        {/* 🔍 Icon */}
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        {/* ❌ Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

        {/* 🧾 Input */}
        <input
          type="text"
          placeholder="Search cars (BMW, SUV, Swift...)"
          value={searchTerm}
          onChange={handleChange}
          className="
            w-full pl-11 pr-10 py-3
            rounded-full border border-gray-300
            bg-white shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-300
            placeholder:text-gray-400
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;