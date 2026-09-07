import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        throw error;
      }
    },
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data };
};

export default useAuthUser;
