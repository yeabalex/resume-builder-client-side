"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { StickyScrollRevealDemo } from "@/components/sticky-content";
import Footer from "@/components/footer";
import NavbarDemo from "@/components/navbar";

export default function HeroParallaxDemo() {
  return (
<>  
  <NavbarDemo/>
  <HeroParallax />
  <StickyScrollRevealDemo/>
  <Footer/>
</>
);
}
