"use client";
import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import getLinks from "@/constants/sidebar-links";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dashboard } from "@/components/dashboard/dashboard";
import { usePathname } from "next/navigation";
import { getUserData } from "../../api/dashboard-api";
import { Suspense } from "react";
import LogoKraft from "@/../public/kraft-logo.png"
import { useAppContext } from "@/context";

export function SidebarDemo() {
  interface UserData {
    firstName: any;
  }
  const [userData, setUserData] = React.useState<UserData>();
  const router = useRouter();
  const path = usePathname();

  React.useEffect(() => {
    async function getData() {
      try {
        const res = await getUserData();
        if (res?.status === 200) {
          setUserData(res.data);
        } else {
          router.push("/log-in");
        }
      } catch (err) {}
    }

    getData();
  }, [router]);

  const [open, setOpen] = React.useState(false);
  const links = getLinks();
  const image = useAppContext();
  if (!userData) {
    return <div>Loading...</div>;
  } else {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${userData?.firstName}`,
                href: "#",
                icon: image.image ? (
                  <Image
                    src={image.image}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ) : (
                  <div className="w-7 h-7 bg-gray-300 flex items-center justify-center rounded-full">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
     <Image src={LogoKraft} alt="Logo Kraft" width={30} height={30} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Kraft Dashboard
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
