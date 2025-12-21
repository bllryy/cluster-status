const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="40"
      viewBox="0 0 180 40"
      fill="none"
    >
      {/* Activity/Status icon */}
      <rect x="2" y="8" width="24" height="24" rx="4" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="14" cy="20" r="6" fill="white" opacity="0.8" />
      <circle cx="14" cy="20" r="3" fill="white" />

      {/* Text: "Status Dashboard" */}
      <text
        x="34"
        y="26"
        fontFamily="monospace"
        fontSize="18"
        fontWeight="700"
        fill="white"
      >
        Status Dashboard
      </text>
    </svg>
  );
};

export default Logo;
