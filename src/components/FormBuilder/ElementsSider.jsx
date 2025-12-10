import React from "react";
import { Box, Button, Stack } from "@mui/material";

const fieldTypes = ["Short Text", "Email", "Number", "Radio Group", "Checkbox", "Date", "DropDown", "Text Area"];

const ElementsSider = ({ onAddBasic }) => {
  return (
    <Box p={2}>
      <Stack spacing={2}>
        {fieldTypes.map((type) => (
          <Button key={type} variant="outlined" onClick={() => onAddBasic(type)}>
            {type}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default ElementsSider;
