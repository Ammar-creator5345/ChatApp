import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Drawer from "@mui/material/Drawer";

type PropsTypes = {
  file: Record<string, any>;
  image: string;
  openDrawer: boolean;
  handleCloseDrawer: () => void;
};

const FileDrawer = ({
  file,
  image,
  openDrawer,
  handleCloseDrawer,
}: PropsTypes) => {
  return (
    <Drawer
      slotProps={{
        paper: {
          sx: {
            width: "35%",
            height: "400px",
            left: "50%",
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
        {image && (
          <img
            src={image}
            alt=""
            className="w-1/2 object-cover border aspect-square rounded-lg"
          />
        )}
        <div className="mt-3">
          <h1 className="font-semibold text-black">{file.name}</h1>
          <h1 className="font-bold text-sm text-gray-600">
            {(file.size / 1000).toFixed(1)} kbs
          </h1>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Add a Caption..."
            className="w-full rounded-2xl outline-none border p-2 px-3 placeholder:text-[#4e4d4d]"
          />
          <button className="p-2 rounded-full bg-green-500 flex items-center justify-center transition-all hover:bg-green-600">
            <SendIcon />
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default FileDrawer;
