import "./App.css";
import NavBar from "./components/NavBar";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import AddCar from "./pages/AddCar";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import MyBookings from "./pages/MyBookings";
import Payment from "./components/Payment";
import OnlinePayment from "./components/OnlinePayment";
import DashBoardLayout from "./components/DashBoardLayout";
import Dashboard from "./pages/Dashboard";
import EditCar from "./pages/EditCar";
import ManageCar from "./pages/ManageCar";
import BookingDetails from "./pages/BookingDetails";
import About from "./pages/About";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import OwnerCar from "./components/OwnerCar";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />

          <Route path="/car-details/:id" element={<CarDetail />} />

          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/onlinePayment" element={<OnlinePayment />} />

          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route index element={<Navigate to="/dashboard/dashboard" />} />

            <Route path="cars" element={<OwnerCar />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="edit-car/:id" element={<EditCar />} />
            <Route path="manage-car" element={<ManageCar />} />
            <Route path="booking-details" element={<BookingDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;