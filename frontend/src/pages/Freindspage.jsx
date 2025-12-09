import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFreinds } from "../lib/api";
import FriendDetailCard from "../components/FriendDetailCard";
import NoFriends from "../components/NoFriends";
import { Users } from "lucide-react";

const Freindspage = () => {
  const { data: freindsData, isLoading } = useQuery({
    queryKey: ["freinds"],
    queryFn: getFreinds,
  });

  const friends = useMemo(() => freindsData?.friends || [], [freindsData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="size-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">My Friends</h1>
          </div>
          <p className="text-lg opacity-70">
            {isLoading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              <span>
                {friends.length === 0
                  ? "You don't have any friends yet"
                  : `You have ${friends.length} ${
                      friends.length === 1 ? "friend" : "friends"
                    }`}
              </span>
            )}
          </p>
        </div>

        {/* Friends Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriends />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendDetailCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Freindspage;
