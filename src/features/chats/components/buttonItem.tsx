import { ReactNode } from "react";

type buttonItem = {
  icon: ReactNode;
  className?: any;
  text: string;
  handleClick?: () => void;
  isMenu?: boolean;
  status?: boolean;
};

const ButtonItem = ({
  icon,
  className,
  text,
  handleClick,
  isMenu = false,
  status = false,
}: buttonItem) => {
  return (
    <button
      disabled={status}
      onClick={handleClick}
      style={{
        cursor: status ? "not-allowed" : "pointer",
      }}
      className={
        isMenu
          ? className
          : "flex items-center justify-start gap-4 w-full p-4 rounded-xl hover:bg-[#e4e2e2]"
      }
    >
      {icon}
      <span
        className={
          isMenu ? "text-sm font-[600] text-[#444444]" : "font-semibold"
        }
      >
        {text}
      </span>
    </button>
  );
};

export default ButtonItem;
