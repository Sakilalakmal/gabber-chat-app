import { useQuery } from "@tanstack/react-query";
import { authUserDetails } from "../lib/api";

export const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: authUserDetails,
  });

  return { authUser: authUser.data?.user, isLoading: authUser.isLoading };
};
