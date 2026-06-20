const BASE_URL = "http://127.0.0.1:8000/api";

export const signupUser = async (data) =>
  fetch(`${BASE_URL}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const verifyOtp = async (data) =>
  fetch(`${BASE_URL}/verify-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = async (data) =>
  fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
