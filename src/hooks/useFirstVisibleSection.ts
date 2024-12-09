import { useEffect, useState } from "react";

const useFirstVisibleSection = (
  observedElements: (HTMLElement | null)[],
  setActiveLinkIndex: (index: number) => void,
  rootMarginTop: string = "0px"
) => {
  const [firstVisibleElement, setFirstVisibleElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      console.warn("IntersectionObserver is not supported in this browser");
      return;
    }

    const visibilityByElement = new Map<HTMLElement, boolean>();

    const manageVisibility = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        visibilityByElement.set(entry.target as HTMLElement, entry.isIntersecting);
      }
    };

    const manageFirstVisibleSection = () => {
      const visibleElements = Array.from(visibilityByElement.entries())
        .filter(([, isVisible]) => isVisible)
        .map(([element]) => element);

      setFirstVisibleElement(visibleElements[0] ?? null);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        manageVisibility(entries);
        manageFirstVisibleSection();
      },
      {
        rootMargin: `${rootMarginTop} 0px 0px 0px`,
        threshold: [0.0, 1.0],
      }
    );

    observedElements.forEach((element) => {
      if (element) {
        visibilityByElement.set(element, false);
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [observedElements, rootMarginTop]);

  useEffect(() => {
    if (firstVisibleElement) {
      const index = observedElements.indexOf(firstVisibleElement);

      setActiveLinkIndex(index);
    }
  }, [firstVisibleElement, observedElements, setActiveLinkIndex]);
};

export default useFirstVisibleSection;
