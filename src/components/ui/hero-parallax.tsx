"use client";
import React from "react";
import { FlipWords } from "./flip-words";
import { MovingBorderDemo } from "../moving-border-botton";


export const HeroParallax = () => {
  
  
  return (
    <div
      className="w-full py-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
    </div>
  );
};

export const Header = () => {
  const words = ['builder', 'customizer']
  return (
    <div className="max-w-full w-full relative mx-auto py-20 md:py-5 left-0 top-0 flex flex-col justify-evenly items-center space-y-8">
      <p className="text-base md:text-base text-neutral-700 dark:text-neutral-200 max-w-3xl text-center">
        With no hassle on your part, our app lets you build beautiful resumes with the most attractive designs and templates. Say goodbye to manual editing - just input your information and let us handle the rest. This app is made by <a href="#" className="text-blue-500 hover:underline">Yeabsira A.</a>, founder at <a href="#" className="text-blue-500 hover:underline">Kraft Technologies</a>, a company known for developing innovative SaaS products. Our team's expertise in creating cutting-edge software solutions ensures that you'll have access to the best tools for crafting your perfect resume.
      </p>

      <MovingBorderDemo/>

      <div className="flex space-x-4 mt-4">
        <a href="https://github.com/yeabsiramoges" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">GitHub</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/yeabsira-moges/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">LinkedIn</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="mailto:yeabsiramoges@gmail.com" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Email</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a href="https://yeabsira.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Website</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>
        <a href="https://twitter.com/yeabsiramoges" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">X (Twitter)</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
