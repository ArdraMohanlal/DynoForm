import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SaveGroupButton = ({ onSaveGroup }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        bgcolor: theme.palette.background.paper,
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[4],
       zIndex: 10,
      }}
    >
      <Button
        variant="contained"
        fullWidth
        onClick={onSaveGroup}
        startIcon={<AddIcon />}
        sx={{
          bgcolor: theme.palette.primary.main,
          "&:hover": { bgcolor: theme.palette.primary.dark },
          fontWeight: "bold",
        }}
      >
        Save & Add Group to Form
      </Button>
    </Box>
  );
};

export default SaveGroupButton;
