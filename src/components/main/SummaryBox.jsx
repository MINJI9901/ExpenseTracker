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
        width: "15rem",
        height: "fit-content",
        padding: "3rem 2rem",
        position: "relative",
      }}
    >
      {/* <Typography position='absolute' top='0' left='50%' sx={{ translate: '-50%' }}>Little Summary</Typography> */}
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="700" color="gray">
          {data[0].label}
        </Typography>
        <Typography fontWeight="700" color="gray">
          $ {data[0].amount.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="700" color="gray">
          {data[1].label}
        </Typography>
        <Typography fontWeight="700" color="gray">
          $ {data[1].amount.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
      <Divider sx={{ my: "1rem" }}></Divider>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="700" color="gray">
          {distance >= 0 ? "left" : "exdeeded"}
        </Typography>
        <Typography fontWeight="700" color="gray">
          $ {distance.toLocaleString({ maximumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
}
