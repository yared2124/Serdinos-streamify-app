import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-base-200 p-6 text-center col-span-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-base-300 rounded-full p-4">
          <UsersIcon className="size-8 opacity-40" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">No friends yet</h3>
          <p className="text-base-content opacity-70 text-sm">
            Connect with language partners below to start practicing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoFriendsFound;
