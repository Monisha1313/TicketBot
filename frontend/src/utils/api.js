import axios from "axios";

const BASE = "/api";

export const sendMessage = (messages, user) =>
  axios.post(`${BASE}/chat/message`, {
    messages,
    user_name:  user?.displayName || null,
    user_email: user?.email || null,
  }).then((r) => r.data);

export const getBooking    = (ref) =>
  axios.get(`${BASE}/bookings/${ref}`).then((r) => r.data);

export const getMyBookings = (email) =>
  axios.get(`${BASE}/bookings/my/${encodeURIComponent(email)}`).then((r) => r.data);

export const cancelBooking = (ref) =>
  axios.patch(`${BASE}/bookings/${ref}/cancel`).then((r) => r.data);

export const getExhibits   = () =>
  axios.get(`${BASE}/exhibits/`).then((r) => r.data);