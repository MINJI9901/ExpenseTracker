import { Box, Typography } from "@mui/material";

export function ToastMsg({ title, content }) {
  return (
    <Box textAlign="center" m="0.5rem">
      <Typography fontWeight={700} color="black">
        {title}
      </Typography>
      <Typography>{content}</Typography>
    </Box>
  );
}
