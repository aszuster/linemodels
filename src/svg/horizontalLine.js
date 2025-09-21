export default function HorizontalLine({ className = "", fill = "" }) {
  return (
    <svg className={`${className}`} width="10" height="2" fill="none">
      <path fill={fill} d="M10 .5v1H0v-1h10Z" />
    </svg>
  );
}
