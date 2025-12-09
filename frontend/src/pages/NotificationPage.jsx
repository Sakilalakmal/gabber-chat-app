import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptFreindRequest, notifications } from "../lib/api";
import toast from "react-hot-toast";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import NoNotificationFounds from "../components/NoNotificationFounds";
import { useAuthUser } from "../hook/useAuthUser";

const NotificationPage = () => {
  const { authUser } = useAuthUser();
  const currentUserFullName = authUser.fullName;
  console.log(currentUserFullName);

  const queryClient = useQueryClient();

  const { data: notificationData, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: notifications,
  });

  const { mutate: acceptFriendRequestMutation, isPending } = useMutation({
    mutationFn: acceptFreindRequest,
    onSuccess: () => {
      toast.success("Friend request accepted");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["freinds"] });
    },
  });

  const incomingFriendsRequests = notificationData?.incomingRequests;
  const acceptedFriendRequests = notificationData?.acceptedRequests;
  console.log({ acceptedFriendRequests });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications from Kouventa
        </h1>

        {isLoading ? (
          <>
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            {incomingFriendsRequests.length > 0 && (
              <>
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <UserCheckIcon className="h-5 w-5 text-primary" />
                    Friend Requests
                    <span className="badge badge-primary ml-2">
                      {incomingFriendsRequests.length}
                    </span>
                  </h2>

                  <div className="space-y-3">
                    {incomingFriendsRequests.map((request) => (
                      <div
                        key={request._id}
                        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="avatar w-14 h-14 rounded-full bg-base-300">
                                <img
                                  src={request.sender.profilePic}
                                  alt={request.sender.fullName}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {request.sender.fullName}
                                </h3>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  <span className="badge badge-accent badge-sm">
                                    native language:{" "}
                                    {request.sender.nativeLanguage}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                acceptFriendRequestMutation(request._id);
                              }}
                              disabled={isPending}
                            >
                              Accept request
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {acceptedFriendRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedFriendRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-sm my-1">
                              {notification.recipient.fullName ===
                              currentUserFullName
                                ? "You"
                                : notification.recipient.fullName}{" "}
                              accepted{" "}
                              {currentUserFullName ===
                              notification.sender.fullName
                                ? "your"
                                : notification.sender.fullName}{" "}
                              friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingFriendsRequests.length === 0 &&
              acceptedFriendRequests.length === 0 && <NoNotificationFounds />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
