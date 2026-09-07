import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { UsersIcon, UserPlusIcon, ZapIcon, LoaderIcon } from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { getLanguageFlag } from "../lib/utils";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/friends");
      return res.data;
    },
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const { data: outgoingRequests = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/outgoing-friend-requests");
      return res.data;
    },
  });

  const outgoingIds = new Set(outgoingRequests.map((r) => r.recipient._id));

  const { mutate: sendRequest, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosInstance.post(`/users/friend-request/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Friend request sent!");
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send request");
    },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* Friends section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <UsersIcon className="size-6 text-primary" />
              <h2 className="text-xl font-bold">Your Friends</h2>
            </div>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-10">
              <LoaderIcon className="animate-spin size-8 text-primary" />
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </section>

        {/* Recommended users */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ZapIcon className="size-5 text-secondary" />
              <h2 className="text-xl font-bold">Meet Language Partners</h2>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-10">
              <LoaderIcon className="animate-spin size-8 text-primary" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-60 text-sm">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedUsers.map((user) => {
                const hasSent = outgoingIds.has(user._id);
                return (
                  <div key={user._id} className="card bg-base-200 hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="avatar size-12">
                          <img
                            src={user.profilePic || "/avatar.png"}
                            alt={user.fullName}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold truncate">{user.fullName}</h3>
                          {user.location && (
                            <p className="text-xs text-base-content opacity-60">
                              📍 {user.location}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(user.nativeLanguage)} {user.nativeLanguage}
                        </span>
                        <span className="badge badge-outline text-xs">
                          {getLanguageFlag(user.learningLanguage)} {user.learningLanguage}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm text-base-content opacity-70 mb-3 line-clamp-2">
                          {user.bio}
                        </p>
                      )}

                      <button
                        className={`btn btn-sm w-full mt-auto ${hasSent ? "btn-disabled" : "btn-primary"}`}
                        onClick={() => sendRequest(user._id)}
                        disabled={hasSent || isPending}
                      >
                        {hasSent ? (
                          "Request Sent ✓"
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-1" />
                            Connect
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
