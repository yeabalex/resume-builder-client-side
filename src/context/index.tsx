"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  image: any;
  setImage: (image: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<any>(false);

  return (
    <AppContext.Provider value={{ image, setImage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
}
