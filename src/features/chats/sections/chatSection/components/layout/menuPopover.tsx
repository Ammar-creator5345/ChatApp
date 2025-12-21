import Popover from "@mui/material/Popover";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import FileDrawer from "./layout/fileDrawer";

type PropTypes = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  setOpenCameraModal: Dispatch<SetStateAction<boolean>>;
  handleDocumentPicker: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhotosPicker: (e: ChangeEvent<HTMLInputElement>) => void;
};

const MenuPopover = ({
  open,
  anchorEl,
  handleClose,
  setOpenCameraModal,
  handleDocumentPicker,
  handlePhotosPicker,
}: PropTypes) => {
  return (
    <>
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
