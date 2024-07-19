"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        {/* You can add text or elements here if needed */}
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-[85%] mx-auto z-50 flex justify-between items-center", className)}
    >
      <div>    
        <Image 
          alt='logo' 
          src="/logo.svg" 
          width={50} 
          height={50}
        />
      </div>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">What we do</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
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
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="">One Time</HoveredLink>
            <HoveredLink href="">Monthly</HoveredLink>
            <HoveredLink href="">Premium</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
      <div className="flex space-x-5"> 
        <div>Login</div>
        <div>Sign Up</div>
      </div> 
    </div>
  );
}
