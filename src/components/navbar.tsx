"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-desktop";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BackgroundGradient } from "./ui/background-gradient";
import NavbarMobile from "./ui/navbar-mobile";
import Logo from '@/../public/kraft.png'
import Image from "next/image";
import Link from "next/link";
import { url } from "inspector";
import { usePathname } from "next/navigation";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center bg-white">
      <Navbar className="top-6" />
    </div>
  );
}



function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<Boolean>()
  const path = usePathname()

  useEffect(()=>{
    const handleResize = () => {
      if(window.innerWidth<900){
        setIsSmallScreen(true)
      }else{
        setIsSmallScreen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize);
    return ()=>{
      window.removeEventListener('resize', handleResize);
    }
  },[])


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };


    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

    if(!isSmallScreen){
      return(
      <div
      className={cn("fixed mx-[10%] top-2 inset-x-0 z-50 flex justify-around items-center rounded-full", className)}
    >
      <div className={`rounded-full ${scrolled?"bg-black bg-opacity-0":null} transition duration-700`}>
        <div className="flex items-center justify-around space-x-16">
      <div>    
        <Image src={Logo} alt="logo" width={85} height={85} className="bg-blend-darken"/>
      </div>
      <Menu setActive={setActive}>
        <div className="text-neutral-700 dark:text-neutral-200"><Link href='/'>Home</Link></div>
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
      </Menu>
      <div className="flex space-x-5 text-white"> 
        <Button className="bg-neutral-800"><Link href='/log-in'>Log in</Link></Button>
      </div> 
      </div>
      </div>
    </div>
      )
    }else{
      return (
      <div
        className={cn("fixed top-2 inset-x-0 max-w-[90%] mx-auto z-50 flex justify-around items-center rounded-full", className)}
      >
      <div className={`${scrolled?"bg-black bg-opacity-80":null} transition duration-700 w-full flex justify-between`}>
          <NavbarMobile image={Logo}/>
      </div>
      </div>
      )
    }
    
  
}
