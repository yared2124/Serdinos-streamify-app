import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (loginData) => {
      const res = await axiosInstance.post("/auth/login", loginData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  return { isPending, error, login: mutate };
};

export default useLogin;
