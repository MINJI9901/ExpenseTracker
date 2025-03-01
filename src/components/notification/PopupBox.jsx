import { Box, Button, Divider, Typography, useTheme } from "@mui/material";

export default function PopupBox({ title, msg, yesFn, noFn }) {
  const { palette } = useTheme();

  return (
    <Box
      position={"absolute"}
      width={{ xs: "90%", sm: "70%", md: "40%" }}
      maxHeight={"13rem"}
      borderRadius={"1rem"}
      boxShadow={"0 0 1rem gray"}
      bgcolor={"white"}
      padding={"2rem"}
      top={"20%"}
      left={"50%"}
      zIndex={2}
      sx={{ translate: "-50%" }}
    >
      <Typography
        variant="h1"
        textAlign={"center"}
        fontSize={"1.2rem"}
        color="gray"
      >
        {title}
      </Typography>
      <Divider sx={{ my: "1.3rem" }} />
      <Typography textAlign={"center"} mb={"1rem"}>
        {msg}
      </Typography>
      <Box display={"flex"} justifyContent={"end"}>
        <Button
          color="black"
          sx={{ mr: "1rem", bgcolor: palette.primary.main }}
          onClick={noFn}
        >
          No, I don't
        </Button>
        <Button
          color="black"
          sx={{ bgcolor: palette.grey[100] }}
          onClick={yesFn}
        >
          Yes, I do
        </Button>
      </Box>
    </Box>
  );
}
