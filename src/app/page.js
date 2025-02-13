"use client";
import { useState, useContext, useEffect } from "react";

import { Box } from "@mui/material";

import { getBreakdown } from "./actions";
import { getCategories } from "./actions";

import DateRangeSelector from "@/components/generic/DateRangeSelector";
import SumBoard from "@/components/generic/SumBoard";
import CategoryMenu from "@/components/generic/CategoryMenu";
import FigureTable from "@/components/main/FigureTable";
import Echart from "@/components/echarts/Echart";
import SummaryBox from "@/components/main/SummaryBox";

import { FilterContext } from "@/context/filterContext";

const now = new Date();

export default function Home() {
  console.log("renders");
  const { section, selectedDate, category } = useContext(FilterContext);

  const isExpense = section == "Expense";

  let expenseSum = 0;
  let incomeSum = 0;

  let plannedAmountPerCategory = {};
  let usedAmountPerCategory = {};

  const [dateRange, setDateRange] = useState({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(),
  });

  const [sumOfMoney, setSumOfMoney] = useState({ expenseSum: 0, incomeSum: 0 });
  const [plannedAmount, setPlannedAmount] = useState({});
  const [usedAmount, setUsedAmount] = useState({});
  const [categories, setCategories] = useState([]);
  // const [dateDifference, setDateDifference] = useState(0);

  const dateDifference = Math.floor(
    Math.abs(dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24)
  );

  const getData = async () => {
    const expenseBreakdownData = await getBreakdown("expense", dateRange);
    const incomeBreakdownData = await getBreakdown("income", dateRange);
    const expenseCategoryData = await getCategories("expense", dateRange.start);
    const incomeCategoryData = await getCategories("income", dateRange.start);

    // Set the total actual amount for the dateRange
    if (expenseBreakdownData.length) {
      if (category !== "all") {
        expenseBreakdownData.forEach((expense) =>
          expense.category.category === category
            ? (expenseSum += expense.amount)
            : ""
        );
      } else {
        expenseBreakdownData.forEach(
          (expense) => (expenseSum += expense.amount)
        );
      }
    }
    if (incomeBreakdownData.length) {
      if (category !== "all") {
        incomeBreakdownData.forEach((income) =>
          income.category.category === category
            ? (incomeSum += income.amount)
            : ""
        );
      } else {
        incomeBreakdownData.forEach((income) => (incomeSum += income.amount));
      }
    }

    // Set each total sum into state
    setSumOfMoney({ expenseSum: expenseSum, incomeSum: incomeSum });

    // Set each planned amount and actual amount in objects with key-value pairs of category-amount
    if (isExpense) {
      category !== "all"
        ? // If specific category is selected
          expenseCategoryData
            .filter((cate) => cate.category === category)[0]
            .sub_category.forEach((sub) => {
              // Calculate planned amount
              plannedAmountPerCategory[sub.name] = sub.budget;

              // Calculate used amount
              usedAmountPerCategory[sub.name] = expenseBreakdownData.reduce(
                (prev, curr) =>
                  prev + (curr.sub_category._id === sub._id ? curr.amount : 0),
                0
              );
            })
        : // If specific category is not set
          expenseCategoryData.forEach((category) => {
            // Calculate planned amount
            plannedAmountPerCategory[category.category] =
              category.sub_category.reduce(
                (prev, curr) => prev + parseFloat(curr.budget),
                0
              );

            // Calculate used amount
            usedAmountPerCategory[category.category] =
              expenseBreakdownData.reduce(
                (prev, curr) =>
                  prev + (curr.category._id == category._id ? curr.amount : 0),
                0
              );
          });
    } else {
      category !== "all"
        ? // If specific category is selected
          incomeCategoryData
            .filter((cate) => cate.category === category)[0]
            .sub_category.forEach((sub) => {
              // Calculate planned amount
              plannedAmountPerCategory[sub.name] = sub.expected_amount;

              // Calculate used amount
              usedAmountPerCategory[sub.name] = incomeBreakdownData.reduce(
                (prev, curr) =>
                  prev + (curr.sub_category._id === sub._id ? curr.amount : 0),
                0
              );
            })
        : // If specific category is not set
          incomeCategoryData.forEach((category) => {
            // Calculate planned amount
            plannedAmountPerCategory[category.category] =
              category.sub_category.reduce(
                (prev, curr) => prev + parseFloat(curr.expected_amount),
                0
              );

            // Calculate used amount
            usedAmountPerCategory[category.category] =
              incomeBreakdownData.reduce(
                (prev, curr) =>
                  prev + (curr.category._id == category._id ? curr.amount : 0),
                0
              );
          });
    }

    // Set each comparing values into states
    setPlannedAmount(plannedAmountPerCategory);
    setUsedAmount(usedAmountPerCategory);

    // Set categories state for category menu
    isExpense
      ? setCategories(expenseCategoryData.map((category) => category.category))
      : setCategories(incomeCategoryData.map((category) => category.category));
  };

  useEffect(() => {
    getData();
  }, [dateRange, section, category]);

  return (
    <>
      <Box display={{ md: "flex" }} gap="3rem" margin="1rem 2rem">
        <DateRangeSelector
          dateRangeState={dateRange}
          setDateRangeState={setDateRange}
        />
        <Box alignContent={"flex-end"}>
          <CategoryMenu categories={categories} />
        </Box>
      </Box>
      <Box
        display={{ md: "flex" }}
        justifyContent="space-between"
        margin="1rem"
      >
        <Box justifySelf="center">
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
        <FigureTable plannedAmount={plannedAmount} usedAmount={usedAmount} />
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignContent="center"
        mb="3rem"
      >
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
        <Box mt={{ xs: 0, md: "3rem" }} mx="auto">
          <SummaryBox
            data={[
              {
                label: isExpense ? "Budget" : "Expected Amount",
                amount: Object.values(plannedAmount).reduce(
                  (prev, curr) => prev + curr,
                  0
                ),
              },
              {
                label: isExpense ? "Spending" : "Earning",
                amount: Object.values(usedAmount).reduce(
                  (prev, curr) => prev + curr,
                  0
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
}
