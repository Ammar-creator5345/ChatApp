import { useState } from "react";
import { SearchUserDrawerTypes, UserTypes } from "../../../types/chatTypes";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../../../../auth/context/authContext";
import UserSection from "./userSection";
import useUsers from "../../../hooks/useUsers";
import { getOrCreateChat } from "../services/chatService";
import SearchDrawerSkeleton from "./searchDrawerSkeleton";

const SearchUserDrawer = ({
  open,
  setOpen,
  setSelectedChat,
}: SearchUserDrawerTypes) => {
  const { user } = useAuth();
  const { users, loading } = useUsers({ open });
  const [search, setSearch] = useState("");

  const filteredUsers = users
    ? users?.filter((u) =>
        u?.displayName?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const activeUser = filteredUsers?.filter((u) => u?.uid === user?.uid);
  const otherUsers = filteredUsers?.filter((u) => u?.uid !== user?.uid);

  const handleUserClick = async (otherUser: UserTypes) => {
    const chat = await getOrCreateChat(user, otherUser);
    setSelectedChat(chat);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  return (
    <div
      className={`absolute top-0 left-0 h-full w-full bg-white shadow-lg transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(false)}
            className="center rounded-full p-1 hover:bg-[#ecebeb]"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-lg font-bold">Search User</h1>
        </div>

        <div className="center gap-1 border px-3 overflow-hidden rounded-full my-3 mx-2">
          <SearchIcon />
          <input
            type="text"
            className="w-full py-2 px-1 outline-none border-none"
            placeholder="Search by name or number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto">
          {activeUser?.length > 0 && (
            <div className="mt-3">
              {activeUser.map((user) => (
                <UserSection key={user.uid} user={user} isActiveUser={true} />
              ))}
            </div>
          )}

          {loading ? (
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <SearchDrawerSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="mt-3">
              {otherUsers?.length > 1 && (
                <h1 className="text-lg font-bold">Other users</h1>
              )}

              {otherUsers?.length > 0 ? (
                otherUsers.map((user) => (
                  <UserSection
                    key={user.uid}
                    user={user}
                    handleClick={() => handleUserClick(user)}
                  />
                ))
              ) : (
                <p className="text-sm text-center text-gray-500 mt-2">
                  No result found for '{search}'
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserDrawer;
