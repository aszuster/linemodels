export default function Cross({ className = "" }) {
  return (
    <svg className={`${className}`} width="8" height="8" fill="none">
      <path
        fill="#000"
        d="M7.182 1.525 1.525 7.182l-.707-.707L6.475.818l.707.707Z"
      />
      <path
        fill="#000"
        d="M6.475 7.182.818 1.525l.707-.707 5.657 5.657-.707.707Z"
      />
    </svg>
  );
}
