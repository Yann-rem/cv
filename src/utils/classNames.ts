type ClassValue = string | { [key: string]: boolean };

export const classNames = (...classes: ClassValue[]): string => {
  return classes
    .map((cls) => {
      if (typeof cls === "string") {
        return cls;
      }

      if (typeof cls === "object") {
        return Object.entries(cls)
          .filter(([_, value]) => value)
          .map(([key, _]) => key)
          .join(" ");
      }

      return "";
    })
    .filter(Boolean)
    .join(" ");
};
