import { UserTypes } from "../../../types/chatTypes";

type PropsTypes = {
  user: UserTypes;
  isActiveUser?: boolean;
  handleClick?: () => void;
};

const UserSection = ({
  user,
  isActiveUser = false,
  handleClick,
}: PropsTypes) => {
  return (
    <div
      key={user?.uid}
      onClick={handleClick}
      className="border cursor-pointer rounded-lg p-2 mt-2 flex items-center gap-3 transition-all hover:bg-[#dddbdb]"
    >
      <img
        src={
          user?.photoUrl
            ? user?.photoUrl
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
        }
        alt=""
        className="w-12 aspect-square rounded-full object-cover"
      />
      <div className="w-full truncate">
        <h1 className="font-semibold truncate">
          {isActiveUser ? user?.displayName + " (You)" : user?.displayName}
        </h1>
        <p className="truncate text-sm">
          {isActiveUser ? "Message yourself" : user?.about}
        </p>
      </div>
    </div>
  );
};

export default UserSection;
