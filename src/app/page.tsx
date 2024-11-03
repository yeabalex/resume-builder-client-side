"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";
import NavbarDemo from "@/components/navbar";
export default function HeroParallaxx() {
  return (
    <>
      <NavbarDemo />
      <HeroParallax products={products} />;
    </>
  );
}
const products = [
  {
    title: "Minimalist Theme",
    link: "",
    thumbnail: "/cvs/1.png",
  },
  {
    title: "Professional Theme",
    link: "",
    thumbnail: "/cvs/2.png",
  },
  {
    title: "Modern Theme",
    link: "",
    thumbnail: "/cvs/3.png",
  },
  {
    title: "Classic Theme",
    link: "",
    thumbnail: "/cvs/4.png",
  },
  {
    title: "Elegant Theme",
    link: "",
    thumbnail: "/cvs/5.png",
  },
  {
    title: "Creative Theme",
    link: "",
    thumbnail: "/cvs/6.png",
  },
  {
    title: "Sleek Theme",
    link: "",
    thumbnail: "/cvs/7.png",
  },
  {
    title: "Bold Theme",
    link: "",
    thumbnail: "/cvs/8.png",
  },
  {
    title: "Simple Theme",
    link: "",
    thumbnail: "/cvs/9.png",
  },
  {
    title: "Innovative Theme",
    link: "",
    thumbnail: "/cvs/10.png",
  },
  {
    title: "Executive Theme",
    link: "",
    thumbnail: "/cvs/11.png",
  },
  {
    title: "Artistic Theme",
    link: "",
    thumbnail: "/cvs/12.png",
  },
  {
    title: "Contemporary Theme",
    link: "",
    thumbnail: "/cvs/13.png",
  },
  {
    title: "Versatile Theme",
    link: "",
    thumbnail: "/cvs/14.png",
  },
  {
    title: "Corporate Theme",
    link: "",
    thumbnail: "/cvs/15.png",
  },
  {
    title: "Chic Theme",
    link: "",
    thumbnail: "/cvs/16.png",
  },
];
