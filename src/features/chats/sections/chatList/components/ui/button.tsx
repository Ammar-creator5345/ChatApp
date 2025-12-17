type propsTypes = {
  text: string;
  handleClick: () => void;
};
const ChatHeaderButton = ({ text, handleClick }: propsTypes) => {
  return (
    <button
      onClick={handleClick}
      className="rounded-full px-4 py-[2px] border border-[#363636] center hover:bg-[#e2c8c8] focus:bg-[#3b3a3a] focus:text-white"
    >
      {text}
    </button>
  );
};

export default ChatHeaderButton;
