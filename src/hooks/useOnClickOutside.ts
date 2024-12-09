import { type RefObject, useEffect } from "react";

type EventType = "mousedown" | "mouseup" | "touchstart" | "touchend";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  eventType: EventType = "mousedown"
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, callback, eventType]);
};

export default useOnClickOutside;
