import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";

export const renderStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return <DoneIcon sx={{ fontSize: "14px" }} />;
    case "delivered":
      return <DoneAllIcon sx={{ fontSize: "15px" }} />;
    case "seen":
      return <DoneAllIcon sx={{ fontSize: "15px", color: "blue" }} />;
  }
};
