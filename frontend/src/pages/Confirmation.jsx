import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking }  from "../utils/api";
import TicketCard      from "../components/TicketCard";
import ItineraryCard   from "../components/ItineraryCard";

export default function Confirmation() {
  const { ref } = useParams();
  const navigate  = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBooking(ref).then(setBooking).catch(console.error);
  }, [ref]);

  if (!booking)
    return (
      <p style={{ padding: 40, textAlign: "center", color: "#888" }}>
        Loading…
      </p>
    );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "32px 16px" }}>
      <TicketCard    booking={booking} />
      {booking.itinerary?.length > 0 && (
        <ItineraryCard itinerary={booking.itinerary} />
      )}
      <button
        className="btn btn-primary"
        style={{ marginTop: 24, width: "100%" }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}