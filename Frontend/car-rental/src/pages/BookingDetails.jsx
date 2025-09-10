import { useEffect, useState } from "react";
import axios from "axios";

// This is giving error
const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_GENERAL_API}/api/totalBookings`,{withCredentials: true});
                setBookings(response.data.bookings);
                console.log("Fetched bookings:", response.data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <>
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.bookingId}>
                            <h3>{booking.carName} ({booking.carModel})</h3>
                            <p>Customer: {booking.customerName}</p>
                            <p>Start Date: {booking.startDate}</p>
                            <p>End Date: {booking.endDate}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default BookingDetails;