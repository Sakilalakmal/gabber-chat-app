import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  alreadySentFreindRequests,
  getFreinds,
  getRecommendedUsers,
  sendFreindRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCheckIcon, MapPinIcon, User2Icon, Users2 } from "lucide-react";
import FreindsCard from "../components/FreindCard";
import NoFriends from "../components/NoFriends";
import toast from "react-hot-toast";

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: freindsData, isLoading: isFreindsLoading } = useQuery({
    queryKey: ["freinds"],
    queryFn: getFreinds,
  });

  const { data: recommendedUsersData, isLoading: isRecommendedUsersLoading } =
    useQuery({
      queryKey: ["recommendedUsers"],
      queryFn: getRecommendedUsers,
    });

  const { data: alreadySentFreindRequestData } = useQuery({
    queryKey: ["alreadyFreinds"],
    queryFn: alreadySentFreindRequests,
  });

  const { mutate: sentFriendrequestMutation, isPending } = useMutation({
    mutationFn: sendFreindRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alreadyFreinds"] });
    },
  });

  const freinds = useMemo(() => freindsData?.friends || [], [freindsData]);
  const recommendedUsers = useMemo(
    () => recommendedUsersData?.users || [],
    [recommendedUsersData]
  );

  const alreadySentRequestIds = useMemo(() => {
    const requests = alreadySentFreindRequestData?.requests || [];
    return new Set(requests.map((req) => req.recipient._id));
  }, [alreadySentFreindRequestData]);

  console.log({ alreadySentRequestIds });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notification" className="btn btn-outline btn-sm">
            <Users2 className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {isFreindsLoading ? (
          <>
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          </>
        ) : freinds.length === 0 ? (
          <>
            <NoFriends />
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {freinds.map((friend) => (
                <FreindsCard key={friend._id} friend={friend} />
              ))}
            </div>
          </>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Friends
                </h2>
                <p className="opacity-70">
                  Discover perfect freinds based on your interests and language
                </p>
              </div>
            </div>
          </div>

          {isRecommendedUsersLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new friend suggestions!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = alreadySentRequestIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>
                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      <button
                        onClick={() => {
                          sentFriendrequestMutation(user._id);
                          toast.success("Sent friend requests...");
                        }}
                        disabled={hasRequestBeenSent || isPending}
                        className={`btn w-full mt-4 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCheckIcon className="size-4 mr-2" />
                            Already sent
                          </>
                        ) : (
                          <>
                            <User2Icon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
