import { Box, Typography } from "@mui/material";

export function ToastMsg({ title, content, titleColor, contentColor }) {
  return (
    <Box textAlign="center" m="0.5rem">
      <Typography fontWeight={700} color={titleColor || "black"}>
        {title}
      </Typography>
      <Typography color={contentColor || "black"}>{content}</Typography>
    </Box>
  );
}
