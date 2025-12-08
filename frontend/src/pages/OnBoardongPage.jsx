import React, { useState } from "react";
import { useAuthUser } from "../hook/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeUserOnBoarding } from "../lib/api";
import toast from "react-hot-toast";
import {
  Aperture,
  LoaderIcon,
  MapPinIcon,
  RecycleIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants/languages";

const OnBoardongPage = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeUserOnBoarding,
    onSuccess: () => {
      toast.success("Onboarding completed & profile updated");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        <div className="space-y-2">
          <p className="font-bold text-red-600">
            {error?.response?.data?.message}
          </p>

          {error?.response?.data?.missingFields && (
            <div>
              <p className="text-sm">Missing fields:</p>
              <ul className="list-disc ml-4 text-sm text-red-500">
                {error.response.data.missingFields.map((field, i) => (
                  <li key={i}>{field}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const randomId = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${randomId}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar generated");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Complete Your Onboarding
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <RecycleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Learning Language</span>
              </label>
              <select
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    nativeLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select Your language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <Aperture className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardongPage;
