import React, { ReactElement } from "react";
import Spinner from "./Spinner";
interface Iprops {
  isLoading?: boolean;
  text: string | ReactElement;
  func?: () => void;
  primary?: boolean;
  type?: string;
  disabled?: boolean;
  className?: string;
}
const ButtonComp: React.FC<Iprops> = ({
  isLoading,
  func,
  text,
  primary,
  type,
  disabled,
  className,
}) => {
  return (
    <>
      {primary ? (
        <button
          onClick={func}
          type={type ? "submit" : "button"}
          disabled={disabled}
          style={{ minWidth: "100px", width: "100%" }}
          className={`text-blue-700 ${className}
                hover:text-white 
                border border-blue hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500
                  dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500
                   dark:focus:ring-blue-800`}
        >
          {isLoading ? <Spinner height="h-4" width="w-4" /> : text}
        </button>
      ) : (
        <button
          type="button"
          onClick={func}
          style={{ minWidth: "100px", width: "100%" }}
          disabled={disabled}
          className={`text-red ${className} hover:text-white border 
                border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500
                  dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`}
        >
          {isLoading ? <Spinner height="h-4" width="w-4" /> : text}
        </button>
      )}
    </>
  );
};

export default ButtonComp;
