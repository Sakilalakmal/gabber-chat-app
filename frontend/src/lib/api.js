import { axiosInstance } from "./axios";

export const signUp = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const authUserDetails = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeUserOnBoarding = async (userData) => {
  const response = await axiosInstance.post("/auth/user/onboarding", userData);
  return response.data;
};

export const getFreinds = async () => {
  const response = await axiosInstance.get("/user/manage/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/user/manage");
  return response.data;
};

export const alreadySentFreindRequests = async () => {
  const response = await axiosInstance.get(
    "/user/manage/already-sent-requests"
  );
  return response.data;
};

export const sendFreindRequest = async (userId) => {
  const response = await axiosInstance.post(
    `/user/manage/friend-request/${userId}`
  );

  return response.data;
};
