import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  padding: "15px 0",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const header = {
  // width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  padding: "0 15px",
  borderBottom: "1px solid #e5e7eb",
};

const content = {
  // width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  padding: "0 15px",
};
const footer = {
  // width: "100%",
  display: "flex",
  flexDirection: "row-reverse",
  padding: "0 15px",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
};

const ConfirmDeleteModal = ({
  open,
  setClose,
  actionHandler,
  data,
  message,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={header}>
          <Typography>Delete</Typography>
          <IconButton onClick={() => setClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={content}>
          <Typography>{message}</Typography>
        </Box>
        <Box sx={footer}>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
            }}
            onClick={() => setClose(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={() => {
              actionHandler(data);
              setClose(false);
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
