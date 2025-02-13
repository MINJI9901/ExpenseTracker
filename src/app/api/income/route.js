import dbConnection from "@/lib/dbConnect";
import Income from "@/models/income";
import IncomeCategory from "@/models/incomeCategory";

import { authenticateUser } from "@/app/login/actions";

export async function GET(req) {
  await dbConnection();
  const user = await authenticateUser();

  const startDate = req.nextUrl.searchParams.get("start");
  const endDate = req.nextUrl.searchParams.get("end");

  const income = await Income.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
    user_id: user.id,
  })
    .populate("category")
    .sort({ date: 1 });

  return Response.json(income, { status: 200 });
}

export async function POST(req) {
  await dbConnection();
  const user = await authenticateUser();

  const { name, amount, category, sub_category, date } = await req.json();

  const newIncome = new Income({
    name: name,
    amount: amount,
    category: category[0],
    date: date,
    user_id: user.id,
  });

  await newIncome.save();

  if (sub_category.length) {
    await Income.findByIdAndUpdate(newIncome._id, {
      sub_category: sub_category[0],
    });
  }

  return Response.json(newIncome);
}

export async function DELETE(req) {
  await dbConnection();

  const { id } = await req.json();

  const deleteIncome = await Income.findByIdAndDelete(id);

  return Response.json(deleteIncome, { status: 200 });
}
