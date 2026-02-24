import React, { useState } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { GlareCard } from "@/components/ui/glare-card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { NoiseBackground } from "@/components/ui/noise-background";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    if(username === "testuser" && password === "Test123"){
      navigate('/list')
    }else{
      alert("Invalid credentials! Please try again.")
    }
  }
  const words = `Login to Jotish to access the best!`;
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <div className="absolute z-100 shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <div className="w-full max-w-md mx-auto p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative z-10">
        
        <TextGenerateEffect words={words} />;
        <form className="my-8">
          <LabelInputContainer className="mb-6 space-y-2">
            <Label
              htmlFor="username"
              className="text-slate-300 font-medium tracking-wide"
            >
              Username
            </Label>
            <Input
              id="username"
              placeholder="testuser"
              type="text"
              className="bg-slate-900/50 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8 space-y-2">
            <Label
              htmlFor="password"
              className="text-slate-300 font-medium tracking-wide"
            >
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="bg-slate-900/50 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 rounded-lg shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <div className="flex justify-center mt-6">
            <NoiseBackground
              // Changed p-2 to p-[2px] for a sharper, thinner glowing border
              containerClassName="w-fit p-[2px] rounded-full mx-auto shadow-xl shadow-indigo-500/10"
              gradientColors={[
                "#4f46e5", // Deep Indigo
                "#10b981", // Emerald Green
                "#8b5cf6", // Vibrant Purple
              ]}
            >
              <button onClick={handleSubmit} className="relative flex items-center justify-center h-full w-full cursor-pointer rounded-full bg-slate-950 px-10 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:bg-slate-900 hover:text-white active:scale-95 border border-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                Login &rarr;
              </button>
            </NoiseBackground>
          </div>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        </form>
        </div>
      </div>

    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};