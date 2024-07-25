"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "1. Create a free account",
    description:
      "Click the Sign-Up button, fill in your details, boom your account is created. Then, check your email for a confirmation code, fill it, and you're all set to explore and enjoy my service!",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "2. Fill in your information",
    description:
      "Fill in your information in the forms provided. Once completed, click Done to finalize your personal profile and get started! Your information is only used to create your resume.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "3. Choose your template",
    description:
      "Choose your template by browsing through our diverse selection of designs. Select the one that best fits your style and preferences.Click on your prefered design to set your chosen template.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "4. Tada! You're all set",
    description:
      "Yes you read that it is time to download your perfect resume and show it off! Let’s get those employers excited to see what you’ve got. You’ve put in the effort, so let your hard work shine through and make a lasting impression. This is your moment to stand out and grab attention—go make it count!",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="h-[100vh]">
      <StickyScroll content={content} contentClassName="w-[60%] h-[85%]" />
    </div>
  );
}
