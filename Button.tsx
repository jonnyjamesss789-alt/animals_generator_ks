import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "w-full flex items-center justify-center px-6 py-3 font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100";
  
  const variantClasses = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400",
    secondary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    tertiary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    quaternary: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
