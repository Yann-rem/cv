"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ActiveLinkIndexContextType {
  activeLinkIndex: number;
  setActiveLinkIndex: (linkIndex: number) => void;
}

const ActiveLinkIndexContext = createContext<ActiveLinkIndexContextType | null>(null);

export const ActiveLinkIndexProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  return (
    <ActiveLinkIndexContext.Provider value={{ activeLinkIndex, setActiveLinkIndex }}>
      {children}
    </ActiveLinkIndexContext.Provider>
  );
};

export const useActiveLinkIndexContext = () => {
  const context = useContext(ActiveLinkIndexContext);

  if (!context) {
    throw new Error("'useActiveLinkIndex' must be used inside an 'ActiveLinkIndexProvider'");
  }

  return context;
};
