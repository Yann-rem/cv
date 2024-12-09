"use client";

import { createContext, FC, ReactNode, useContext } from "react";
import useBreakpoints from "@/hooks/useBreakpoints";

type BreakpointsContextType = ReturnType<typeof useBreakpoints>;

const BreakpointsContext = createContext<BreakpointsContextType | null>(null);

export const BreakpointsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const breakpoints = useBreakpoints();

  return <BreakpointsContext.Provider value={breakpoints}>{children}</BreakpointsContext.Provider>;
};

export const useBreakpointsContext = (): BreakpointsContextType => {
  const context = useContext(BreakpointsContext);

  if (!context) {
    throw new Error("'useBreakpointsContext' must be used inside an 'BreakpointsProvider'");
  }

  return context;
};
