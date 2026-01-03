import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Drawer from "@mui/material/Drawer";
import { Dispatch, SetStateAction, useState } from "react";
import FileSizeFormatter from "../../../../utils/fileSizeFormatter";

type PropsTypes = {
  file: Record<string, any>;
  image: string | null;
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  handleSendFile: (fileType: string, file: any, fileText: string) => void;
  fileText: string;
  setFileText: Dispatch<SetStateAction<string>>;
};

const FileDrawer = ({
  file,
  image,
  openDrawer,
  handleCloseDrawer,
  handleSendFile,
  fileText,
  setFileText,
}: PropsTypes) => {
  // const handleSendDocument = async () => {
  //   if (file) {
  //     const res = await uploadFile(file);
  //     console.log("this is res", res);
  //     handlese
  //     console.log(file);
  //   }
  // };
  // const [fileText, setFileText] = useState<string>("");
  const HandleSendFile = () => {
    handleSendFile(file.type, file, fileText);
  };
  const previewImage = file?.type?.startsWith("image")
    ? (image as string)
    : "https://www.citypng.com/public/uploads/preview/video-cinema-clap-black-icon-png-image-7017516950353797kbrvcrxz0.png";
  return (
    <Drawer
      slotProps={{
        paper: {
          sx: {
            width: "35%",
            height: "400px",
            left: "38%",
            borderRadius: "10px 10px 0 0",
            padding: "10px",
            overflow: "hidden",
          },
        },
      }}
      open={openDrawer}
      onClose={handleCloseDrawer}
      anchor="bottom"
    >
      <div>
        <div className="flex items-center justify-between pr-3 mb-3">
          <h1 className="text-lg font-bold">Send Media</h1>
          <button onClick={handleCloseDrawer}>
            <CloseIcon />
          </button>
        </div>

        <img
          src={previewImage}
          alt=""
          className="w-1/2 object-cover border aspect-square rounded-lg"
        />

        <div className="mt-3">
          <h1 className="font-semibold text-black">{file.name}</h1>
          <h1 className="font-bold text-sm text-gray-600">
            {FileSizeFormatter(file.size)}
          </h1>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Add a Caption..."
            value={fileText}
            onChange={(e) => setFileText(e.target.value)}
            className="w-full rounded-2xl outline-none border p-2 px-3 placeholder:text-[#4e4d4d]"
          />
          <button
            onClick={HandleSendFile}
            className="p-2 rounded-full bg-green-500 flex items-center justify-center transition-all hover:bg-green-600"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default FileDrawer;
