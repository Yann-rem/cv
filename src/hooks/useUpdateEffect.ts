import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useUpdateEffect = (effect: EffectCallback, dependencies: DependencyList) => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) {
      return effect();
    } else {
      hasMountedRef.current = true;
    }
    // eslint-disable-next-line
  }, dependencies);
};

export default useUpdateEffect;
