import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-hunting-business.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
