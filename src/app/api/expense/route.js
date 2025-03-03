import dbConnection from "@/lib/dbConnect";
import Expense from "@/models/expense";
import ExpenseCategory from "@/models/expenseCategory";

import { authenticateUser } from "@/app/login/actions";
import expense from "@/models/expense";

export async function GET(req) {
  await dbConnection();
  const user = await authenticateUser();

  console.log("user id: ", user.id);

  const startDate = req.nextUrl.searchParams.get("start");
  const endDate = req.nextUrl.searchParams.get("end");

  const expenses = await Expense.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    user_id: user.id,
  })
    .populate("category")
    .sort({ date: 1 });

  return Response.json(expenses, { status: 200 });
}

export async function POST(req) {
  await dbConnection();
  const user = await authenticateUser();

  const { name, amount, category, sub_category, date } = await req.json();

  const newExpense = new Expense({
    name: name,
    amount: amount,
    category: category[0],
    sub_category: sub_category[0],
    date: date,
    user_id: user.id,
  });

  await newExpense.save();

  //   When "sub_category" is not required
  //   if (sub_category.length) {
  //     await Expense.findByIdAndUpdate(newExpense._id, {
  //       sub_category: { ...sub_category[0] },
  //     });
  //   }

  return Response.json(newExpense, { status: 200 });
}

export async function PATCH(req) {
  await dbConnection();

  const { content } = await req.json();

  const updatedExpense = await expense.findByIdAndUpdate(content._id, content);

  return Response.json(updatedExpense, { status: 200 });
}

export async function DELETE(req) {
  await dbConnection();

  const { id } = await req.json();

  const deleteExpense = await Expense.findByIdAndDelete(id);

  return Response.json(deleteExpense, { status: 200 });
}
