"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define a specific type for the context value
interface AppContextType {
  image: string;
  setImage: (image: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string>("");

  return (
    <AppContext.Provider value={{ image, setImage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  // Ensure context is not undefined
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }

  return context;
}
