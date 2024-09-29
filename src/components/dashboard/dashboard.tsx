"use client";
import React, { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { getUserCv } from "../../api/dashboard-api";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { labels } from "@/constants/sidebar-links";
import { useSearchParams } from "next/navigation";

// Dummy dashboard component with content
export const Dashboard = (params: Params) => {
  const [cvData, setCvData] = useState<boolean>();

  React.useEffect(() => {
    async function checkCv() {
      if ((await getUserCv()) === "y") {
        setCvData(true);
      } else {
        setCvData(false);
      }
    }

    checkCv();
  }, []);

  const param = useSearchParams();
  const filterSection = labels.filter((sec) => {
    return sec.label.replaceAll(" ", "").toLowerCase() === param.get("s");
  });
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-scroll">
        <div className="flex gap-2 flex-1">
          {filterSection[0] ? (
            <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800">
              {filterSection[0].tsx}
            </div>
          ) : !cvData ? (
            <div className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 flex justify-center items-center">
              <Button className="bg-neutral-800">
                Create resume
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
