import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../lib/api";

export const useLogOut = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutatation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      toast.success("You are log out from kouventa");
    },
    onError: (error) => {
      toast.error(error.response.data?.message);
    },
  });

  return { logoutMutatation, isPending, error };
};
