import React from "react";
import { List, ListItem, ListItemText, useTheme, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BasicFieldsList = ({ basicTypes, onAddBasic }) => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Basic Fields
      </Typography>
      <List
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {basicTypes.map((type) => (
          <ListItem
            key={type}
            button
            onClick={() => onAddBasic(type)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: theme.palette.primary.light,
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemText primary={type} primaryTypographyProps={{ fontWeight: 500 }} />
            <AddIcon fontSize="small" color="action" />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BasicFieldsList;
