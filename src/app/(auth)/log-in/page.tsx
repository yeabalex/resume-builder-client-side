//import { LogIn } from "@/components/log-in/login";
import { Suspense } from "react";
import {lazy} from 'react'

const LogIn = lazy(() => import('@/components/log-in/login'));
export default function LogInPage(){
    return (
      <Suspense fallback={<div>Loading...</div>}>  
        <LogIn/>
      </Suspense>
    );
}