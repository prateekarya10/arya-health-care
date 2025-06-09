const PrimaryButton = ({
  label,
  width = "w-[207px]",
  className = "",
  loading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type="submit"
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`text-[18px] py-2.5 rounded-full transition flex justify-center items-center gap-2 ${width} ${className} ${
        (disabled || loading) && "opacity-50 cursor-not-allowed"
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {label}
    </button>
  );
};

export default PrimaryButton;
