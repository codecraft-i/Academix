import axios from "axios";

const BASE_URL = "http://45.138.159.137/api/events/";

export async function getEvents({ status }) {
  // maksimal 6 ta tadbirni qaytarish uchun page_size berib yuboramiz
  const { data } = await axios.get(BASE_URL, {
    params: { status, page_size: 6, ordering: "-date" },
  });
  return data.results;           // DRF: count, next ... kerak emas
}

export async function getEvent(id) {
  const { data } = await axios.get(`${BASE_URL}${id}/`);
  return data;
}