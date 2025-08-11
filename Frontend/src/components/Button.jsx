import React from "react";

function Button({ text, onClick, type = "submit", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300
        disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
}

export default Button;
