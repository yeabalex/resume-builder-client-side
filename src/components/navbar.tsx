"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-desktop";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BackgroundGradient } from "./ui/background-gradient";
import NavbarMobile from "./ui/navbar-mobile";
import Logo from '@/../public/kraft-logo.png'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarDemo() {
  return (
    <div className="relative max-w-4xl">
      <Navbar />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isSmallScreen) {
    return (
      <div className={cn("fixed top-0 inset-x-0 z-50", className)}>
        <div className={`w-full transition-all duration-300 ${scrolled ? "bg-black bg-opacity-80 py-2" : "py-4"}`}>
          <NavbarMobile image={Logo} />
        </div>
      </div>
    );
  }

  return (
    <nav className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-300 max-w-4xl mx-auto", className)}>
      <div className={`mx-auto px-6 ${scrolled ? "bg-black bg-opacity-80 py-2" : "py-4"}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={Logo} alt="logo" width={50} height={50} className="" />
            <span className="text-xl font-bold text-black">Kraft</span>
          </Link>
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Home">
              <Link href="/" className="text-white hover:text-gray-300 transition">Home</Link>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="About">
              <Link href="/web-dev" className="text-white hover:text-gray-300 transition">What we do</Link>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="grid grid-cols-2 gap-4 p-4">
                <ProductItem
                  title="Build"
                  href=""
                  src="/cvs/14"
                  description="Build resume just by providing personal info."
                />
                <ProductItem
                  title="Manage"
                  href=""
                  src="/cvs/12"
                  description="Manage different versions of your resume for different employers."
                />
                <ProductItem
                  title="Customize"
                  href=""
                  src="/cvs/10"
                  description="Customize templates as you like."
                />
                <ProductItem
                  title="Enhance"
                  href=""
                  src="/cvs/8"
                  description="Enhance your previous resume."
                />
              </div>
            </MenuItem>
          </Menu>
          <div>
            <Button className="bg-white text-black hover:bg-gray-200 transition">
              <Link href="/log-in">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
