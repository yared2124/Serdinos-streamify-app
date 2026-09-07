import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { CameraIcon, LoaderIcon, ShipWheelIcon } from "lucide-react";
import { LANGUAGES } from "../lib/utils";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardUser, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("/auth/onboarding", userData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to complete profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardUser(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random avatar generated!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Complete Your Profile
          </h1>
          <p className="text-center text-base-content opacity-70 mb-8">
            Tell us about yourself to get started with language exchange
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile picture */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="avatar size-24">
                  <img
                    src={formState.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="absolute bottom-0 right-0 bg-primary hover:bg-primary-focus text-primary-content rounded-full p-1.5 transition-colors"
                >
                  <CameraIcon className="size-4" />
                </button>
              </div>
              <p className="text-xs text-base-content opacity-60">
                Click the camera to generate a random avatar
              </p>
            </div>

            {/* Full name */}
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label"><span className="label-text">Bio</span></label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Tell us about yourself and your language goals..."
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Native Language</span></label>
                <select
                  className="select select-bordered"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  required
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Learning Language</span></label>
                <select
                  className="select select-bordered"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  required
                >
                  <option value="">Select language to learn</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label"><span className="label-text">Location</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Saving...
                </>
              ) : (
                "Complete Profile 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
