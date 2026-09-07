import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (signUpData) => {
      const res = await axiosInstance.post("/auth/signup", signUpData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Sign up failed");
    },
  });

  return { isPending, error, signUp: mutate };
};

export default useSignUp;
