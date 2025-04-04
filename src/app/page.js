"use client";
import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Box } from "@mui/material";
// CONTEXTS
import { FilterContext } from "@/context/filterContext";
import { UserContext } from "@/context/UserContext";
// HOOKS
import { getBreakdown, getCategories } from "../lib/api";
import { getBreakdownLocal, getCategoriesLocal } from "@/lib/localApi";
// COMPONENTS
import DateRangeSelector from "@/components/generic/DateRangeSelector";
import SumBoard from "@/components/generic/SumBoard";
import CategoryMenu from "@/components/generic/CategoryMenu";
import FigureTable from "@/components/main/FigureTable";
import Echart from "@/components/echarts/Echart";
import SummaryBox from "@/components/main/SummaryBox";
// SUPABASE
import { createClient } from "@/utils/supabase/client";

const now = new Date();

let expenseBreakdownData;
let incomeBreakdownData;
let expenseCategoryData;
let incomeCategoryData;

export default function Home() {
  // console.log("renders");
  // CONTEXTS
  const { section } = useContext(FilterContext);
  const { user, setUser } = useContext(UserContext);

  // CURRENT SECTION CONDITION
  const isExpense = section == "Expense";

  // SUMS FOR SUMBOARD
  let expenseSum = 0;
  let incomeSum = 0;

  // AMOUNT TO COMPARE
  let plannedAmountPerCategory = {};
  let usedAmountPerCategory = {};

  // TO CHECK WHETHER IT IS REDIRECTED
  const searchParams = useSearchParams();
  const isRedirected = searchParams.get("redirected") === "true";

  // STATES
  const [dateRange, setDateRange] = useState({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(),
  });
  const [sumOfMoney, setSumOfMoney] = useState({ expenseSum: 0, incomeSum: 0 });
  const [plannedAmount, setPlannedAmount] = useState({});
  const [usedAmount, setUsedAmount] = useState({});
  const [categories, setCategories] = useState([]);

  const dateDifference = Math.floor(
    Math.abs(dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24)
  );

  const configureData = (selectedCategory) => {
    // Set the total actual amount for the dateRange
    if (expenseBreakdownData.length) {
      if (selectedCategory !== "all" && section === "Expense") {
        expenseBreakdownData.forEach((expense) =>
          expense.category.category === selectedCategory
            ? (expenseSum += parseFloat(expense.amount))
            : ""
        );
      } else {
        expenseBreakdownData.forEach(
          (expense) => (expenseSum += parseFloat(expense.amount))
        );
      }
    }
    if (incomeBreakdownData.length) {
      if (selectedCategory !== "all" && section === "Income") {
        incomeBreakdownData.forEach((income) =>
          income.category.category === selectedCategory
            ? (incomeSum += parseFloat(income.amount))
            : ""
        );
      } else {
        incomeBreakdownData.forEach(
          (income) => (incomeSum += parseFloat(income.amount))
        );
      }
    }

    // Set each total sum into state
    setSumOfMoney({ expenseSum: expenseSum, incomeSum: incomeSum });

    // Set each planned amount and actual amount in objects with key-value pairs of category-amount
    // if (isExpense) {
    if (selectedCategory !== "all") {
      // If specific category is selected
      (isExpense ? expenseCategoryData : incomeCategoryData)
        .filter((cate) => cate.category === selectedCategory)[0]
        .sub_category.forEach((sub) => {
          // Calculate planned amount
          plannedAmountPerCategory[sub.name] =
            sub[isExpense ? "budget" : "expected_amount"];

          // Calculate used amount
          usedAmountPerCategory[sub.name] = (
            isExpense ? expenseBreakdownData : incomeBreakdownData
          ).reduce(
            (prev, curr) =>
              prev +
              (curr.sub_category._id === sub._id ? parseFloat(curr.amount) : 0),
            0
          );
        });
    } else {
      // If specific category is not set
      (isExpense ? expenseCategoryData : incomeCategoryData).forEach(
        (category) => {
          // Calculate planned amount
          plannedAmountPerCategory[category.category] =
            category.sub_category.reduce(
              (prev, curr) =>
                prev +
                parseFloat(curr[isExpense ? "budget" : "expected_amount"]),
              0
            );

          // Calculate used amount
          usedAmountPerCategory[category.category] = (
            isExpense ? expenseBreakdownData : incomeBreakdownData
          ).reduce(
            (prev, curr) =>
              prev +
              (curr.category._id == category._id ? parseFloat(curr.amount) : 0),
            0
          );
        }
      );
    }

    // Set each comparing values into states
    setPlannedAmount(plannedAmountPerCategory);
    setUsedAmount(usedAmountPerCategory);
  };

  // GETTING THE DATA TO DISPLAY AND COMPARE
  const getData = async () => {
    if (user) {
      expenseBreakdownData = await getBreakdown("expense", dateRange);
      incomeBreakdownData = await getBreakdown("income", dateRange);
      expenseCategoryData = await getCategories("expense", dateRange.start);
      incomeCategoryData = await getCategories("income", dateRange.start);
    } else {
      expenseBreakdownData = getBreakdownLocal("expense", dateRange);
      incomeBreakdownData = getBreakdownLocal("income", dateRange);
      expenseCategoryData = getCategoriesLocal("expense", dateRange.start);
      incomeCategoryData = getCategoriesLocal("income", dateRange.start);
    }

    // Set categories state for category menu
    isExpense
      ? setCategories(expenseCategoryData.map((category) => category.category))
      : setCategories(incomeCategoryData.map((category) => category.category));

    configureData("all");
  };

  // TO UPDATE USER AFTER REDIRECTING FROM LOGIN
  const getAndSetUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return false;
    }

    setUser(data?.user);
  };

  useEffect(() => {
    if (isRedirected) {
      getAndSetUser();
    }
  }, []);

  useEffect(() => {
    getData();
  }, [section, user]);

  const summaryBox = (
    <SummaryBox
      data={[
        {
          label: isExpense ? "Budget" : "Expected Amount",
          amount: Object.values(plannedAmount).reduce(
            (prev, curr) => prev + parseFloat(curr),
            0
          ),
        },
        {
          label: isExpense ? "Spending" : "Earning",
          amount: Object.values(usedAmount).reduce(
            (prev, curr) => prev + parseFloat(curr),
            0
          ),
        },
      ]}
    />
  );

  return (
    <Box px="1rem">
      <Box display={{ md: "flex" }} gap="3rem" margin="1rem 2rem">
        <DateRangeSelector
          dateRangeState={dateRange}
          setDateRangeState={setDateRange}
          getData={getData}
        />
        <Box alignContent={"flex-end"}>
          <CategoryMenu categories={categories} configureData={configureData} />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        gap={3}
        margin="1rem auto"
      >
        <Box
          justifySelf="center"
          alignSelf={"center"}
          // width={{ xs: "80%", md: "40%" }}
          mx={"auto"}
        >
          <SumBoard
            text={`Total ${section}\nFor ${dateDifference} Days`}
            sumOfMoney={
              isExpense ? sumOfMoney.expenseSum : sumOfMoney.incomeSum
            }
          />
          <SumBoard
            isSub={true}
            text={`Total ${
              isExpense ? "Earnings" : "Spendings"
            }\nFor ${dateDifference} Days`}
            sumOfMoney={
              isExpense ? sumOfMoney.incomeSum : sumOfMoney.expenseSum
            }
          />
        </Box>
        {/* <Box width={{ xs: "90%", md: "100%" }} mx={"auto"}> */}
        <FigureTable plannedAmount={plannedAmount} usedAmount={usedAmount} />
        {/* </Box> */}
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignContent="center"
        mb="3rem"
      >
        <Box
          display={"block"}
          width={{ xs: "90%", md: "30%" }}
          mt={{ xs: 0, md: "3rem" }}
          mb={{ xs: "3rem", md: 0 }}
          mx="auto"
        >
          {summaryBox}
        </Box>
        <Box display={{ sm: "flex" }}>
          <Echart
            title={`Usage For Earnings`}
            standardData={sumOfMoney.incomeSum}
            comparedData={usedAmount}
          />
          <Echart
            title={`Usage For\nWhole Budget`}
            standardData={plannedAmount}
            comparedData={usedAmount}
          />
        </Box>
      </Box>
    </Box>
  );
}
