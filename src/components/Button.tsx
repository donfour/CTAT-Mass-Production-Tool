import React from "react";

function Button(props: JSX.IntrinsicElements["button"]) {
  const {children, disabled, ...rest} = props;

  return (
    <button
      disabled={disabled}
      className={`${disabled ? "bg-primary-light" : "bg-primary"} text-white rounded-sm px-6 py-1 filter drop-shadow-md`}
      {...rest}
    >
      {props.children}
    </button>
  );
}

export default Button;
