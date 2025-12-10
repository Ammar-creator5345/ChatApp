import { ReactNode } from "react";

type buttonItem = {
  icon: ReactNode;
  className?: any;
  text: string;
  handleClick?: () => {};
  isMenu?: boolean;
};

const ButtonItem = ({
  icon,
  className,
  text,
  handleClick,
  isMenu = false,
}: buttonItem) => {
  return (
    <button
      onClick={handleClick}
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
