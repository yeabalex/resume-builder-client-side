'use client'
import React from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { motion } from "framer-motion";
import { ImagesSlider } from "../ui/images-slider";
import Link from "next/link";

export default function ThankYou() {
    interface UserData {
        firstName: any
    }
    const [userData, setUserData] = React.useState<UserData>();
    const router = useRouter();

    React.useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get('https://kraft-server.onrender.com/api/auth/login/status', {withCredentials: true});
                
                if (response.status === 401) {
                    router.push('/log-in');
                } else if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                router.push('/log-in');
            }
        }

        getUserData();
    }, [router]);

    const images = [
        "/cvs/12.png",
        "/cvs/14.png",
        "/cvs/10.png",
      ];
      return (
        <ImagesSlider className="h-[40rem]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              Thank you for your interest {userData?.firstName}. <br /> comming soon...
            </motion.p>
            <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
              <span><Link href="https://yeabalex.vercel.app">Check out my page →</Link></span>
              <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
            </button>
          </motion.div>
        </ImagesSlider>
      );
}
