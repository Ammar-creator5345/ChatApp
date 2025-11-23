import Popover from "@mui/material/Popover";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FileDrawer from "./fileDrawer";

type PropTypes = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  setOpenCameraModal: Dispatch<SetStateAction<boolean>>;
};

const MenuPopover = ({
  open,
  anchorEl,
  handleClose,
  setOpenCameraModal,
}: PropTypes) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<Record<string, any>>({});

  const handlePhotosPicker = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log("event", e);
    if (e.target.files) {
      const files = e.target.files[0];
      setFile(files);
      const createdUrl = URL.createObjectURL(files);
      setImage(createdUrl);
      console.log(files);
      setOpenDrawer(true);
      e.target.value = "";
    }
  };
  const handleDocumentPicker = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = e.target.files[0];
      console.log(files);
      setImage(
        "https://img.freepik.com/free-vector/files-blue-colour_78370-6661.jpg?semt=ais_incoming&w=740&q=80"
      );
      setFile(files);
      setOpenDrawer(true);
      e.target.value = "";
    }
  };
  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
    setImage("");
    setFile({});
  };

  return (
    <>
      <FileDrawer
        file={file}
        image={image}
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
      />
      <input
        type="file"
        accept=".pdf,.docx,application/msword*"
        id="document_picker"
        className="hidden"
        onChange={handleDocumentPicker}
      />
      <input
        type="file"
        accept="image/*,video/*"
        id="photos_videos_picker"
        className="hidden"
        onChange={handlePhotosPicker}
      />
      <Popover
        id={open ? "simple-popover" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ marginBottom: "40px" }}
      >
        <div className="flex flex-col items-start justify-start">
          <button
            onClick={() => {
              handleClose();
              document.getElementById("photos_videos_picker")?.click();
            }}
            className="hover:bg-red-200 p-2 w-full text-start cursor-pointer"
          >
            Photos and videos
          </button>

          <button
            onClick={() => {
              handleClose();
              document.getElementById("document_picker")?.click();
            }}
            className="hover:bg-red-200 p-2 w-full text-start cursor-pointer"
          >
            Documents
          </button>

          <button
            onClick={() => {
              handleClose();
              setOpenCameraModal(true);
            }}
            className="hover:bg-red-200 p-2 w-full text-start"
          >
            <h1>Camera</h1>
          </button>
        </div>
      </Popover>
    </>
  );
};

export default MenuPopover;
