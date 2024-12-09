import { useEffect, useState } from "react";

import { debounce } from "@/utils/debounce";

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({ isLg: false });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setBreakpoints({ isLg: width >= 1024 });
    };

    const debouncedHandleResize = debounce(handleResize, 200);

    handleResize();

    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return breakpoints;
};

export default useBreakpoints;
