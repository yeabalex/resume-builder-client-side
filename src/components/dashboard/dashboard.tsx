"use client";
import React, { useState, useEffect } from "react";
import { IconPlus } from "@tabler/icons-react";
import { getUserCv } from "../../api/dashboard-api";
import { Button } from "../ui/button";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { labels } from "@/constants/sidebar-links";
import { useSearchParams } from "next/navigation";
import { getPersonalInfo } from "@/api/personal-info-api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createCv } from "@/api/cv-api";

// Dummy dashboard component with content
export const Dashboard = (params: Params) => {
  const [cvData, setCvData] = useState<boolean>();
  const [personalInfo, setPersonalInfo] = useState<any>(null);

  useEffect(() => {
    async function checkCv() {
      if ((await getUserCv()) === "y") {
        setCvData(true);
      } else {
        setCvData(false);
      }
    }

    async function fetchPersonalInfo() {
      const info = await getPersonalInfo();
      setPersonalInfo(info);
    }

    checkCv();
    fetchPersonalInfo();
  }, []);

  const param = useSearchParams();
  const filterSection = labels.filter((sec) => {
    return sec.label.replaceAll(" ", "").toLowerCase() === param.get("s");
  });

  const isPersonalInfoEmpty = (!personalInfo || Object.keys(personalInfo).length === 0);


  return (
    <div className="flex flex-1">
      <div className="p-5 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-scroll">
        <div className="flex justify-end">
          <Button 
            className={`bg-blue-500 hover:bg-blue-600 text-white ${isPersonalInfoEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isPersonalInfoEmpty}
          >
            <Link href={`/resume/generate?template=beggie`}>
            <span className="group relative">
              Generate
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {isPersonalInfoEmpty 
                  ? "Please fill out your personal information first"
                  : "Try to fill as much sections as possible before generating"
                }
              </span>
            </span>
            </Link>
          </Button>
        </div>
        <div className="flex gap-2 flex-1">
          {filterSection[0] ? (
            <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800">
              {filterSection[0].tsx}
            </div>
          ) : !cvData ? (
            <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 flex justify-center items-center">
              <Button 
                className="bg-neutral-800"
                disabled={isPersonalInfoEmpty}
              >
                {isPersonalInfoEmpty ? "Fill Personal Info First" : "Create resume"}
                <IconPlus className="text-neutral-200 h-4 w-4 flex-shrink-0 ml-1" />
              </Button>
            </div>
          ) : (
            <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 flex justify-center items-center">
              {params.currSec}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
