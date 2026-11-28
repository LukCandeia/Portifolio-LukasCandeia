const paths = {
  diagonal: 'M5 11 11 5M5 5h6v6',
  up: 'M8 13V3M4 7l4-4 4 4',
  spark: 'M8 2v12M2 8h12M4 4l8 8m0-8-8 8',
};

export function PortfolioIcon({ kind = 'diagonal' }) {
  return (
    <svg
      className="portfolio-icon"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
