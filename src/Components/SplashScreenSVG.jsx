import React from "react";

const SplashScreenSVG = () => {
  return (
    <svg
    className="splashscreen"
      viewBox="0 0 1080 1920"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="City skyline background with a small car on a road and eTMS logo"
    >
      {/* Sky */}
      <rect width="1080" height="1920" fill="#1547FF" />

      {/* Logo & Title */}
      <g transform="translate(540,200)" textAnchor="middle">
        {/* Logo (shopping cart) */}
        <g transform="translate(-60,-60) scale(0.6)" fill="#F5B400">
          <rect x="40" y="50" width="120" height="60" rx="10" />
          <rect x="50" y="70" width="100" height="20" rx="5" fill="#1547FF" />
          <circle cx="60" cy="120" r="15" />
          <circle cx="140" cy="120" r="15" />
        </g>

        {/* Title */}
        <text
          x="0"
          y="160"
          fill="#ffffff"
          fontSize="72"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          eTMS
        </text>
      </g>

      {/* Clouds (above/near skyline) */}
      <g fill="#ffffff" opacity="0.95">
        <path d="M140 1220a30 30 0 1 1 58-12 24 24 0 1 1 14 44H120a20 20 0 0 1 20-32z" />
        <path d="M925 1240a26 26 0 1 1 49-10 18 18 0 1 1 10 33H902a16 16 0 0 1 23-23z" />
        <path d="M820 1100a22 22 0 1 1 42-9 16 16 0 1 1 10 28H800a14 14 0 0 1 20-19z" />
      </g>

      {/* Distant skyline */}
      <g transform="translate(0,1280)" fill="#7DD3FC" opacity="0.95">
        <path d="M0 160 L60 160 60 70 95 70 95 160 L150 160 150 20 165 20 165 160 L240 160 240 60 260 60 260 160 L320 160 320 0 360 0 360 160 L430 160 430 55 470 55 470 160 L560 160 560 25 590 25 590 160 L650 160 650 70 705 70 705 160 L780 160 780 15 795 15 795 160 L860 160 860 65 900 65 900 160 L980 160 980 35 1000 35 1000 160 L1080 160 1080 220 0 220 Z" />
      </g>

      {/* Near skyline */}
      <g transform="translate(0,1320)" fill="#5CC9E8">
        <path d="M0 180 L40 180 40 90 120 90 120 180 L170 180 170 40 210 40 210 180 L270 180 270 110 330 110 330 180 L380 180 380 10 420 10 420 180 L480 180 480 85 520 85 520 180 L600 180 600 60 650 60 650 180 L720 180 720 35 740 35 740 180 L800 180 800 120 870 120 870 180 L930 180 930 55 980 55 980 180 L1080 180 1080 260 0 260 Z" />
      </g>

      {/* Green strip */}
      <g transform="translate(0,1520)">
        <path
          d="M0 80 C200 40, 350 120, 540 80 C750 35, 900 120, 1080 70 L1080 160 L0 160 Z"
          fill="#55B879"
        />
      </g>

      {/* Road */}
      <g transform="translate(0,1600)">
        <rect x="0" y="0" width="1080" height="160" fill="#ECECEC" />
        <g opacity="0.45">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={30 + i * 90}
              y="72"
              width="60"
              height="8"
              rx="4"
              fill="#999"
            />
          ))}
        </g>
      </g>

      {/* Car (facing RIGHT) - moved more to the right side */}
      <g transform="translate(700,1580)">
        {/* shadow */}
        <ellipse
          cx="120"
          cy="158"
          rx="110"
          ry="12"
          fill="#000"
          opacity="0.12"
        />
        {/* body */}
        <rect x="20" y="90" width="200" height="60" rx="12" fill="#2FA9D6" />
        {/* roof */}
        <path
          d="M200 90 L150 50 H70 a10 10 0 0 0 -10 10 V90 Z"
          fill="#2FA9D6"
        />
        {/* windows */}
        <rect x="90" y="60" width="54" height="30" rx="4" fill="#CDEBFF" />
        <rect x="150" y="60" width="54" height="30" rx="4" fill="#CDEBFF" />
        {/* door line */}
        <rect
          x="148"
          y="90"
          width="2"
          height="60"
          fill="#ffffff"
          opacity="0.35"
        />
        {/* bumpers/lights */}
        <circle cx="20" cy="120" r="5" fill="#FFA64D" />
        <circle cx="220" cy="120" r="5" fill="#FFA64D" />
        {/* wheels */}
        <circle cx="70" cy="150" r="18" fill="#2F2F2F" />
        <circle cx="190" cy="150" r="18" fill="#2F2F2F" />
        <circle cx="70" cy="150" r="8" fill="#9DA3AF" />
        <circle cx="190" cy="150" r="8" fill="#9DA3AF" />
      </g>
    </svg>
  );
};

export default SplashScreenSVG;
