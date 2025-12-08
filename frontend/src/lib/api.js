import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const authUserDetails = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeUserOnBoarding = async (userData) => {
  const response = await axiosInstance.post("/auth/user/onboarding", userData);
  return response.data;
};
