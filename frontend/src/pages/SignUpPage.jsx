import React, { useState } from "react";
import { Aperture } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";
import { Loader } from "lucide-react";
import { MessageCircle } from "lucide-react";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: signUpMutate,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutate(signUpData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center sm:p-6 md:p-8 "
      data-theme="night"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Sign Up Form Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <Aperture className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              kouventa App
            </span>
          </div>

          {/* error messages */}
          {error && (
            <div className="alert alert-error">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Join with kouventa</h2>
                  <p className="text-sm opacity-70">
                    Create an account to connect with awesome peoplea and make new friends.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full name</span>
                    </label>

                    <input
                      type="text"
                      placeholder="sakila lakmal"
                      className="input input-bordered w-full"
                      value={signUpData.fullName}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          fullName: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>

                    <input
                      type="email"
                      placeholder="sakila@example.com"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          email: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  {/* Password Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>

                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                      value={signUpData.password}
                      onChange={(e) => {
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        });
                      }}
                      required
                    />

                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long.
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (<>
                  <Loader className="size-4 animate-spin"/>
                  Joining ...
                  </>) : (
                    <>
                    <MessageCircle className="size-4"/>
                    Join kouventa
                    </>
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/video.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with people worldwide
              </h2>
              <p className="opacity-70">
                making connection with your lovely people and connect with
                freinds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
