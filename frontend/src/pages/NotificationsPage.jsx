import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { BellIcon, CheckIcon, LoaderIcon, UserPlusIcon } from "lucide-react";
import toast from "react-hot-toast";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/friend-requests");
      return res.data;
    },
  });

  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Friend request accepted!");
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to accept request");
    },
  });

  const incomingReqs = data?.incomingReqs || [];
  const acceptedReqs = data?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BellIcon className="size-6 text-primary" />
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoaderIcon className="animate-spin size-8 text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Incoming friend requests */}
            {incomingReqs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserPlusIcon className="size-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary">{incomingReqs.length}</span>
                </h2>
                <div className="space-y-3">
                  {incomingReqs.map((req) => (
                    <div
                      key={req._id}
                      className="card bg-base-200 p-4 flex flex-row items-center gap-4"
                    >
                      <div className="avatar size-12 flex-shrink-0">
                        <img
                          src={req.sender.profilePic || "/avatar.png"}
                          alt={req.sender.fullName}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{req.sender.fullName}</h3>
                        <p className="text-sm text-base-content opacity-60">
                          Wants to connect with you
                        </p>
                      </div>
                      <button
                        className="btn btn-primary btn-sm gap-1"
                        onClick={() => acceptRequest(req._id)}
                        disabled={isPending}
                      >
                        <CheckIcon className="size-4" />
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted requests (new friends) */}
            {acceptedReqs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">New Friends 🎉</h2>
                <div className="space-y-3">
                  {acceptedReqs.map((req) => (
                    <div
                      key={req._id}
                      className="card bg-base-200 p-4 flex flex-row items-center gap-4"
                    >
                      <div className="avatar size-12 flex-shrink-0">
                        <img
                          src={req.recipient.profilePic || "/avatar.png"}
                          alt={req.recipient.fullName}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{req.recipient.fullName}</h3>
                        <p className="text-sm text-base-content opacity-60">
                          You are now connected!
                        </p>
                      </div>
                      <span className="badge badge-success gap-1">
                        <CheckIcon className="size-3" />
                        Friends
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingReqs.length === 0 && acceptedReqs.length === 0 && (
              <div className="card bg-base-200 p-8 text-center">
                <BellIcon className="size-12 mx-auto opacity-30 mb-3" />
                <h3 className="font-semibold text-lg">No notifications yet</h3>
                <p className="text-base-content opacity-60 text-sm mt-1">
                  When someone sends you a friend request, it will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
