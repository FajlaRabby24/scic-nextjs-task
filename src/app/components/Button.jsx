"use client";

const Button = ({
  children,
  className = "btn btn-primary",

  isLoading = false,
  onClick, // 👈 added onClick
  ...props
}) => {
  return (
    <button
      onClick={onClick} // 👈 now supports click event
      className={`${className} `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
