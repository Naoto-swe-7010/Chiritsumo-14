import React from "react";
import { FcGoogle } from "react-icons/fc";
import { TbMountain } from "react-icons/tb";

import { signIn } from "../../auth";

const SignIn = () => {
  return (
    <div className="min-h-[calc(100vh-132px)] flex flex-col items-center justify-center px-4 text-center">
      <TbMountain size={180} className="md:size-250" data-testid="icon" />
      <h1 className="mb-3 text-4xl font-bold sm:text-5xl md:text-6xl">
        ちり<span className="text-pink-500">つも</span>
      </h1>
      <h3 className="mb-6 text-lg sm:text-xl md:text-2xl font-bold">
        <div className="inline-block">無駄づかいを我慢して</div>
        <div className="inline-block">欲しいものを手に入れよう！</div>
      </h3>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="flex justify-center rounded-full bg-white/10 px-6 py-3 text-base font-semibold no-underline transition hover:bg-white/20 sm:w-[70%] sm:text-lg md:w-[40%] md:text-xl lg:w-[25%]"
      >
        <button className="flex flex-nowrap justify-center items-center max-w-md gap-3 ">
          <FcGoogle className="size-6 sm:size-7 md:size-8 " />
          <p>Sign in with Google！</p>
        </button>
      </form>
    </div>
  );
};
export default SignIn;
