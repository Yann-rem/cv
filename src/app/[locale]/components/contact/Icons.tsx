import { FC, SVGProps } from "react";

export const DangerIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      d="M 19.928312,21.813403 H 4.0716894 A 2.958979,2.9592994 0 0 1 1.5087951,17.375049 L 9.4391645,3.630391 a 2.956601,2.9569211 0 0 1 5.1216685,-4e-7 L 22.491205,17.37505 a 2.9589784,2.9592988 0 0 1 -2.562893,4.438353 z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
    />
    <path
      d="m 12,7.5 c -0.828456,0 -1.5,0.671577 -1.5,1.5 3.5e-4,0.03275 0.0014,0.06503 0.0039,0.09766 l 0.314453,4.792969 c 0.04075,0.622562 0.557741,1.108699 1.181641,1.109375 0.623885,-6.88e-4 1.140854,-0.486813 1.181641,-1.109375 L 13.496088,9.09766 c 0.0025,-0.03263 0.0039,-0.06491 0.0039,-0.09766 0,-0.828423 -0.671584,-1.5 -1.5,-1.5 z m 0,8.5 c -0.828426,0 -1.5,0.671574 -1.5,1.5 0,0.828426 0.671574,1.5 1.5,1.5 0.828426,0 1.5,-0.671574 1.5,-1.5 C 13.5,16.671574 12.828426,16 12,16 Z"
      fill="currentColor"
    />
  </svg>
);

export const SpinnerIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="11" fill="none" stroke="url(#grad1)" strokeWidth="2" />
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0" stopColor="currentColor" stopOpacity="1" />
        <stop offset="0.67" stopColor="currentColor" stopOpacity="0.2" />
      </linearGradient>
    </defs>
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
      strokeDasharray="100"
      strokeDashoffset="100"
      className="check-line"
    ></polyline>
  </svg>
);
