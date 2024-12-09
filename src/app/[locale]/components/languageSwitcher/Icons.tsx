import { FC, SVGProps } from "react";

export const GlobeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <line x1="1.5" y1="15.375" x2="22.5" y2="15.375" stroke="currentColor" strokeWidth="2.25" />
    <line x1="1.5" y1="8.75" x2="22.5" y2="8.75" stroke="currentColor" strokeWidth="2.25" />
    <ellipse cx="12" cy="12" rx="4.125" ry="10.875" fill="none" stroke="currentColor" strokeWidth="2.25" />
    <circle cx="12" cy="12" r="10.875" fill="none" stroke="currentColor" strokeWidth="2.25" />
  </svg>
);

export const DownArrowIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <polyline
      points="5 8.5 12 15.5 19 8.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></polyline>
  </svg>
);

export const CheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <polyline
      points="4 12.5 9 17.5 20 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></polyline>
  </svg>
);
