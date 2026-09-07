import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signUp } = useSignUp();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(signUpData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" data-theme="night">
      <div className="card bg-base-100 w-full max-w-4xl shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - form */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Streamify
                </span>
              </div>
              <p className="text-base-content opacity-60">
                Connect with language partners worldwide
              </p>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                {error && (
                  <div className="alert alert-error">
                    <span>{error.response?.data?.message || "An error occurred"}</span>
                  </div>
                )}

                <div className="form-control">
                  <label className="label"><span className="label-text">Full Name</span></label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered w-full"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Password</span></label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content opacity-60">
                      Must be at least 6 characters
                    </span>
                  </label>
                </div>

                <div className="form-control mt-2">
                  <label className="label cursor-pointer gap-2 justify-start">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                    <span className="label-text text-xs">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">Terms of Service</span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">Privacy Policy</span>
                    </span>
                  </label>
                </div>

                <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-base-content opacity-60 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right side - illustration */}
          <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-12 rounded-r-2xl">
            <div className="text-center">
              <div className="text-8xl mb-6">🌍</div>
              <h2 className="text-3xl font-bold mb-3">Join the Community</h2>
              <p className="text-base-content opacity-60 text-lg">
                Practice languages, make friends, and explore cultures through real conversations.
              </p>
              <div className="flex justify-center gap-4 mt-8 flex-wrap">
                {["🇺🇸", "🇪🇸", "🇫🇷", "🇩🇪", "🇯🇵", "🇧🇷", "🇨🇳", "🇰🇷"].map((flag) => (
                  <span key={flag} className="text-3xl">{flag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
