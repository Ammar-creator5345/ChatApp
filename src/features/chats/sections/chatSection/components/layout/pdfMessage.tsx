import { messageType } from "../../../../types/chatTypes";
import { useAuth } from "../../../../../auth/context/authContext";
import { TimeFormatter } from "../../../../../../utils/timeFormatter";
import { renderStatusIcon } from "../../../../utils/renderStatusIcon";

type PropsTypes = {
  message: messageType;
};
const PdfMessage = ({ message }: PropsTypes) => {
  const { user } = useAuth();
  async function handleSaveAs(publicUrl: string) {
    const response = await fetch(publicUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "file";
    link.click();

    URL.revokeObjectURL(link.href);
  }

  return (
    <div
      className={`${
        user?.uid === message.senderId
          ? "chatMessage-right"
          : "chatMessage-left"
      }`}
    >
      <div className="flex flex-col relative items-center justify-center pb-4">
        <div className="w-[250px] bg-[#6d6262] text-white p-2 rounded-md">
          <div className="flex items-center gap-1">
            <div className="flex-shrink-0 w-10">
              <img
                src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png"
                alt=""
              />
            </div>
            <div className="min-w-0">
              <p className="flex-1 truncate">{message.fileName}</p>
              <div className="flex items-center gap-1 text-sm">
                <p>49 kB</p>
                <p>pdf Document</p>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex items-center gap-1">
            <a
              href={message.fileUrl}
              target="_blank"
              className="bg-red-400 flex items-center justify-center rounded-md p-1 w-full"
            >
              Open
            </a>
            <button
              className="bg-red-400 flex items-center justify-center rounded-md p-1 w-full"
              onClick={() => handleSaveAs(message.fileUrl)}
            >
              Save as…
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 h-4 absolute -bottom-[4px] right-0">
          <p className="text-[10px] whitespace-nowrap">
            {TimeFormatter(message.timestamp.seconds)}
          </p>
          <p className="mb-1">
            {user?.uid === message.senderId && renderStatusIcon(message.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfMessage;
