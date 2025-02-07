"use client";
import { useState, useContext, useEffect } from "react";
import { FilterContext } from "@/context/filterContext";

import { Box, Button, Grid2 } from "@mui/material";
import FormContainer from "@/components/new/FormContainer";
import BreakdownBoard from "@/components/new/BreakdownBoard";

import DateRangeSelector from "@/components/generic/DateRangeSelector";
import { getBreakdown } from "@/app/actions";

const Page = () => {
  const { section, selectedDate } = useContext(FilterContext);

  const [breakdownData, setBreakdownData] = useState([]);
  const [newBreakdownData, setNewBreakdownData] = useState({});

  const [dateRange, setDateRange] = useState({
    start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    end:
      selectedDate.getMonth() === new Date().getMonth()
        ? new Date()
        : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
  });

  const getBreakdownData = async (isNewAdded) => {
    const data = await getBreakdown(section, dateRange);
    // console.log(breakdownData.length)
    if (isNewAdded) {
      setNewBreakdownData(
        data.find(
          (item) => !breakdownData.map((item) => item._id).includes(item._id)
        )
      );
      console.log(
        data.find(
          (item) => !breakdownData.map((item) => item._id).includes(item._id)
        )
      );
    } else setNewBreakdownData({});

    setBreakdownData(data);
  };

  useEffect(() => {
    getBreakdownData();
  }, [dateRange, section]);

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 3 }}>
        <FormContainer getBreakdownData={getBreakdownData} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 9 }}>
        <Box mx="1rem" my={{ md: "1rem" }}>
          <DateRangeSelector
            dateRangeState={dateRange}
            setDateRangeState={setDateRange}
          />
          <BreakdownBoard
            getBreakdownData={getBreakdownData}
            breakdownData={breakdownData}
            newBreakdownData={newBreakdownData}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Page;
