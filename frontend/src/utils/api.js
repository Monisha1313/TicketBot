import axios from "axios";

const BASE = "/api";

export const sendMessage  = (messages) =>
  axios.post(`${BASE}/chat/message`, { messages }).then((r) => r.data);

export const getBooking   = (ref) =>
  axios.get(`${BASE}/bookings/${ref}`).then((r) => r.data);

export const getExhibits  = () =>
  axios.get(`${BASE}/exhibits/`).then((r) => r.data);

export const getMyBookings = (email) =>
  axios.get(`${BASE}/bookings/my/${encodeURIComponent(email)}`).then((r) => r.data);