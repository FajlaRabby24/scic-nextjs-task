'use client'

const Button = ({
  children,
  className = "",

  isLoading = false,
  onClick, // 👈 added onClick
  ...props
}) => {
  return (
    <button
      onClick={onClick} // 👈 now supports click event
      className={`${className} btn btn-primary`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
