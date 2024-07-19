"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/constants/products";


export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
