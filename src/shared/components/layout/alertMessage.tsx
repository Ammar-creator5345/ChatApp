import { Alert, Collapse } from "@mui/material";
import { useEffect } from "react";
import { AlertMessageProps } from "../../types/globalTypes";

const AlertMessage = ({
  text,
  open,
  duration = 3000,
  onclose,
}: AlertMessageProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onclose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Collapse in={open}>
      <Alert
        severity="success"
        sx={{
          position: "fixed",
          right: 0,
          top: 10,
          padding: "5px 30px 5px 15px",
          boxShadow: "0px 0px 5px gray",
          border: "1px solid gray",
        }}
      >
        {text}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
