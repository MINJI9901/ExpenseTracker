"use client";
import { useState, useContext, useEffect } from "react";

// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";

// MUI
import { Box, Button, Grid2 } from "@mui/material";

// COMPONENTS
import FormContainer from "@/components/new/FormContainer";
import BreakdownBoard from "@/components/new/BreakdownBoard";
import DateRangeSelector from "@/components/generic/DateRangeSelector";

// HOOKS
import { getBreakdown, getCategories } from "@/lib/api";
import { getCategoriesLocal, getBreakdownLocal } from "@/lib/localApi";

const now = new Date();

const Page = () => {
  // console.log("renders for NEW");
  const { section } = useContext(FilterContext);
  const { user } = useContext(UserContext);

  const [breakdownData, setBreakdownData] = useState([]);
  const [newBreakdownData, setNewBreakdownData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(),
  });

  const getBreakdownData = async (isNewAdded) => {
    setLoading(true);
    let data;

    if (user) {
      data = await getBreakdown(section, dateRange);
    } else {
      data = getBreakdownLocal(section, dateRange);
    }

    // Set newly added breakdown if exists
    if (isNewAdded) {
      setNewBreakdownData(
        data.find(
          (item) => !breakdownData.map((data) => data._id).includes(item._id)
        )
      );
    } else setNewBreakdownData({});

    setBreakdownData([...data]);
    setLoading(true);
  };

  const getCategoryData = async () => {
    if (user) {
      const data = await getCategories(section, dateRange.start);

      setCategoryData([...data]);
    } else {
      const data = getCategoriesLocal(section, dateRange.start);

      setCategoryData([...data]);
    }
  };

  useEffect(() => {
    getBreakdownData(false);
    getCategoryData();
  }, [section, user]);

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
            getData={() => {
              getBreakdownData();
              getCategoryData();
            }}
          />
          <BreakdownBoard
            getBreakdownData={getBreakdownData}
            breakdownData={breakdownData}
            newBreakdownData={newBreakdownData}
            categoryData={categoryData}
            loading={loading}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Page;
