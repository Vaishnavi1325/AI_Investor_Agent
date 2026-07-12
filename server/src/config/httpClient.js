import axios from "axios";

export const httpClient = axios.create({
  timeout: 15000,
  headers: {
    Accept: "application/json"
  }
});

