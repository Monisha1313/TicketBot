import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";

const BOOKINGS = "bookings";

// Save a new booking to Firestore
export const saveBookingToFirestore = async (booking, itinerary, user) => {
  try {
    await addDoc(collection(db, BOOKINGS), {
      booking_ref:    booking.booking_ref,
      visitor_name:   booking.visitor_name,
      visitor_email:  booking.visitor_email,
      booking_type:   booking.booking_type,
      num_tickets:    booking.num_tickets,
      visit_date:     booking.visit_date,
      visit_slot:     booking.visit_slot,
      total_amount:   booking.total_amount,
      payment_status: booking.payment_status,
      group_name:     booking.group_name || null,
      interests:      booking.interests || [],
      itinerary:      itinerary || [],
      uid:            user?.uid || null,
      created_at:     serverTimestamp(),
    });
  } catch (e) {
    console.error("Firestore save error:", e);
  }
};

// Get all bookings for a user by email
export const getBookingsFromFirestore = async (email) => {
  const q = query(collection(db, BOOKINGS), where("visitor_email", "==", email));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
};

// Update booking status in Firestore
export const cancelBookingInFirestore = async (bookingRef) => {
  const q = query(collection(db, BOOKINGS), where("booking_ref", "==", bookingRef));
  const snap = await getDocs(q);
  snap.docs.forEach(async (d) => {
    await updateDoc(doc(db, BOOKINGS, d.id), { payment_status: "cancelled" });
  });
};