'use client'
import { getLogStatus } from "@/api/login-api";
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createCv } from "@/api/cv-api";

function ResumeContent() {
  const [content, setContent] = useState<string>('');
  const [scale, setScale] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template");

  function handleGenerateResume() {
    return createCv(template || "beggie");
  }

  useEffect(() => {
    async function checkLoginStatus() {
      const res = await getLogStatus();
      if (res?.status === 200) {
        const res = await handleGenerateResume();
        console.log(res);
        setContent(res);
      } else {
        router.push("/log-in");
      }
    }
    checkLoginStatus();
  }, [router]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
        setScale(window.innerWidth / 1000);
      } else {
        setScale(1);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {content && (
        <div className="flex-grow overflow-hidden">
          <iframe
            srcDoc={content}
            title="Resume"
            className="w-full h-full"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: `${100 / scale}%`,
              height: `${100 / scale}%`,
            }}
          />
        </div>
      )}
      <button
        onClick={() => window.print()}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Print Resume
      </button>
    </div>
  );
}

export default function Resume() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
}
