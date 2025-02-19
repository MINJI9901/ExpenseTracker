"use client";
import { useState, useContext, useEffect } from "react";
import { FilterContext } from "@/context/filterContext";

import { Box, Button, Grid2 } from "@mui/material";
import FormContainer from "@/components/new/FormContainer";
import BreakdownBoard from "@/components/new/BreakdownBoard";

import DateRangeSelector from "@/components/generic/DateRangeSelector";
import { getBreakdown, getCategories } from "@/app/actions";

import { createClient } from "@/utils/supabase/client";

const now = new Date();

const Page = () => {
  console.log("renders for NEW");
  const { section } = useContext(FilterContext);

  const [breakdownData, setBreakdownData] = useState([]);
  const [newBreakdownData, setNewBreakdownData] = useState({});
  const [categoryData, setCategoryData] = useState([]);

  //   const [dateRange, setDateRange] = useState({
  //     start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  //     end:
  //       selectedDate.getMonth() === new Date().getMonth()
  //         ? new Date()
  //         : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
  //   });
  const [dateRange, setDateRange] = useState({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(),
  });

  const authenticateUser = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    console.log("user data: ", data);

    return data?.user || error;
  };

  const getBreakdownData = async (isNewAdded) => {
    const user = await authenticateUser();
    if (user) {
      const data = await getBreakdown(section, dateRange);

      console.log("breakdown data: ", data);

      // Set newly added breakdown if exists
      if (isNewAdded) {
        setNewBreakdownData(
          data.find(
            (item) => !breakdownData.map((item) => item._id).includes(item._id)
          )
        );
      } else setNewBreakdownData({});

      setBreakdownData([...data]);
    }
  };

  const getCategoryData = async () => {
    const data = await getCategories(section, dateRange.start);
    console.log("category data: ", data);

    setCategoryData([...data]);
  };

  useEffect(() => {
    getBreakdownData(false);
    getCategoryData();
  }, [dateRange, section]);

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 3 }}>
        <FormContainer
          getBreakdownData={getBreakdownData}
          categoryData={categoryData}
          dateRange={dateRange}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 9 }}>
        <Box mx="1rem" my={{ md: "1rem" }}>
          <DateRangeSelector
            dateRangeState={dateRange}
            setDateRangeState={setDateRange}
            getData={getBreakdownData}
          />
          <BreakdownBoard
            getBreakdownData={getBreakdownData}
            breakdownData={breakdownData}
            newBreakdownData={newBreakdownData}
            categoryData={categoryData}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Page;
