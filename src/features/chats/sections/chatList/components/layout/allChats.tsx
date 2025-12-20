import { DateFormatter } from "../../../../../../utils/dateFormatter";
import { ChatListTypes } from "../../../../types/chatTypes";
import ChatRowSkeleton from "./chatRowSkeleton";
import { ReactComponent as DropdownIcon } from "../../../.../../../../../assets/icons/dropdown.svg";
import { useAuth } from "../../../../../auth/context/authContext";

type propsTypes = {
  search: string;
  loading: boolean;
  filteredChats: ChatListTypes[];
  handleClickChat: (value: ChatListTypes) => void;
  setSelected_chat: (value: ChatListTypes) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AllChats = ({
  search,
  loading,
  filteredChats,
  handleClickChat,
  setSelected_chat,
  handleClick,
}: propsTypes) => {
  const { user } = useAuth();
  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex flex-col gap-1">
          {Array.from({ length: 5 }).map((value, i) => (
            <ChatRowSkeleton key={i} />
          ))}
        </div>
      ) : filteredChats.length === 0 ? (
        <p className="text-center font-[500] text-[#4b4a4a] mt-10">
          {search.trim() === ""
            ? "No chats available"
            : `No chat found for '${search}'`}
        </p>
      ) : (
        filteredChats.map((value: ChatListTypes) => (
          <div
            className="border border-[#838181] mt-1 p-3 flex items-center rounded-3xl justify-between cursor-pointer hover:bg-[#e2c8c8] group"
            key={value.id}
            onClick={() => handleClickChat(value)}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 flex-shrink-0 border border-[#b9b7b7] rounded-full overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
                  alt={`${value.otherName} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 truncate">
                <h1 className="text-lg font-semibold truncate">
                  {value.otherName}
                </h1>
                <span className="truncate">{value.lastMessage}</span>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col justify-center transition-all items-end gap-1">
              <span className="text-sm">
                {DateFormatter(value.lastMessageTime?.seconds)}
              </span>
              <div className="center gap-1">
                {value?.unreadCount?.[user?.uid!] > 0 && (
                  <span className="center min-w-[20px] h-5 px-1 rounded-full bg-[#0ac00a] text-white text-xs font-medium group-hover:translate-x-0">
                    {value?.unreadCount?.[user?.uid!]}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    setSelected_chat(value);
                    handleClick(e);
                  }}
                  className="mx-1 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                >
                  <DropdownIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllChats;
