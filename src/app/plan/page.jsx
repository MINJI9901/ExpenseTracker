import SumBoard from "@/components/generic/SumBoard"
import PlanFrame from "@/components/plan/PlanFrame"
import { Box, Container, Typography } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Page = () => {
    return (
        <>
            <Box sx={{display: {md: "flex"}, justifyContent: "space-between", margin: "1rem"}}>
                <Container>
                    <CalendarMonthIcon></CalendarMonthIcon>
                    <Typography display="inline-block" margin="0.5rem">2025.01</Typography>
                </Container>
                <SumBoard/>
            </Box>
            <PlanFrame/>
        </>
    )
}

export default Page