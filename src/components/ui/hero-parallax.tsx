"use client";
import React from "react";
import { FlipWords } from "./flip-words";
import { MovingBorderDemo } from "../moving-border-botton";


export const HeroParallax = () => {
  
  
  return (
    <div
      className="h-[100vh] py-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
    </div>
  );
};

export const Header = () => {
  const words = ['builder', 'customizer']
  return (
    <div className="max-w-7xl relative mx-auto  py-20 md:py-5 px-4 w-full left-0 top-0 flex flex-col justify-evenly items-center space-y-8">
      <h1 className="text-6xl md:text-7xl font-bold text-neutral-700 dark:text-neutral-200 text-center">
        Providing you <br/> the coolest resume <br/> <FlipWords className='text-neutral-700 dark:text-neutral-200 h-[80px]' words={words}/>
      </h1>
      <p className="max-w-2xl text-base md:text-lg text-neutral-700 dark:text-neutral-200">
      With no hassle on your part, my app lets you build beautiful resumes with the most attractive designs and templates.
      </p>

      <MovingBorderDemo/>
    </div>
  );
};

