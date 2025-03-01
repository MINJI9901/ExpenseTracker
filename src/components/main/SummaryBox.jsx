import { Box, Divider, Typography, useTheme } from "@mui/material";

export default function SummaryBox({
  data = [
    { label: "label1", amount: 200 },
    { label: "label2", amount: 100 },
  ],
}) {
  const { palette } = useTheme();
  const distance = data[0].amount - data[1].amount;

  return (
    <Box
      sx={{
        borderRadius: "1rem",
        bgcolor: palette.primary.main,
        // width: "15rem",
        // height: "fit-content",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      {/* <Typography position='absolute' top='0' left='50%' sx={{ translate: '-50%' }}>Little Summary</Typography> */}
      <Box display="flex" justifyContent="space-between" overflow={"scroll"}>
        <Typography
          color="gray"
          mr="2.5rem"
          fontSize={{ xs: "0.9rem", md: "1rem" }}
        >
          {data[0].label}
        </Typography>
        <Typography color="gray" fontSize={{ xs: "0.9rem", md: "1rem" }}>
          $ {data[0].amount.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" overflow={"scroll"}>
        <Typography
          color="gray"
          mr="2.5rem"
          fontSize={{ xs: "0.9rem", md: "1rem" }}
        >
          {data[1].label}
        </Typography>
        <Typography color="gray" fontSize={{ xs: "0.9rem", md: "1rem" }}>
          $ {data[1].amount.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
      <Divider sx={{ my: "1rem" }}></Divider>
      <Box display="flex" justifyContent="space-between" overflow={"scroll"}>
        <Typography
          color="gray"
          mr="2.5rem"
          fontSize={{ xs: "0.9rem", md: "1rem" }}
        >
          {distance >= 0 ? "left" : "exdeeded"}
        </Typography>
        <Typography color="gray" fontSize={{ xs: "0.9rem", md: "1rem" }}>
          $ {distance.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
}
