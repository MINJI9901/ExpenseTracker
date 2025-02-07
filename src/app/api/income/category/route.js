import dbConnection from "@/lib/dbConnect";
import IncomeCategory from "@/models/incomeCategory";
import Income from "@/models/income";
import { NextRequest } from "next/server";
// import { NextRequest } from 'next/server';

import { authenticateUser } from "@/app/login/actions";

export async function GET(req) {
  await dbConnection();
  const user = await authenticateUser();

  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const month = parseInt(searchParams.get("month"));
  const year = parseInt(searchParams.get("year"));

  const startOfMonth = new Date(year, month, 1, 9, 0, 0);
  const endOfMonth = new Date(year, month + 1, 1, 9, 0, 0);
  console.log("start of month: ", startOfMonth);
  console.log("end of month: ", endOfMonth);

  const categoryData = await IncomeCategory.find({
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    user_id: user.id,
  });

  return Response.json(categoryData);
}

export async function POST(req) {
  await dbConnection();
  const user = await authenticateUser();

  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);

  if (searchParams.get("month")) {
    const month = parseInt(searchParams.get("month"));
    const year = parseInt(searchParams.get("year"));

    console.log(searchParams);

    const newCategory = new IncomeCategory({
      category: "",
      sub_category: [
        {
          name: "",
          expected_amount: 0,
        },
      ],
      // date: new Date(`${year}-${parseInt(month) + 1}-15`)
      date: new Date(year, month, 15),
      user_id: user.id,
    });
    await newCategory.save();

    return Response.json(newCategory);
  } else {
    const { id } = await req.json();
    const newSubCategory = await IncomeCategory.findByIdAndUpdate(id, {
      $push: {
        sub_category: {
          name: "",
          expected_amount: 0,
        },
      },
    });

    return Response.json(newSubCategory);
  }

  // const categoryData = await IncomeCategory.find({});
}

export async function PUT(req) {
  await dbConnection();

  const { id, content } = await req.json();
  let updatedCategory;

  if (content.category) {
    updatedCategory = await IncomeCategory.findByIdAndUpdate(
      id,
      { $set: content },
      { new: true }
    );
  } else {
    updatedCategory = await IncomeCategory.findOneAndUpdate(
      { _id: id, "sub_category._id": content._id },
      {
        $set: {
          "sub_category.$.name": content.name,
          "sub_category.$.expected_amount": content.expected_amount,
        },
      }
    );
  }

  return Response.json(updatedCategory, { status: 200 });
}

export async function DELETE(req) {
  await dbConnection();

  const { id } = await req.json();

  if (typeof id !== "object") {
    const deletedCategory = await IncomeCategory.findByIdAndDelete(id);
    const deletedIncome = await Income.deleteMany({
      category: deletedCategory,
    });

    console.log("deleted income for the category: ", deletedIncome);

    return Response.json(deletedCategory, { status: 200 });
  } else {
    const { categoryId, subCategoryId } = id;
    const category = await IncomeCategory.findByIdAndUpdate(
      categoryId,
      { $pull: { sub_category: { _id: subCategoryId } } },
      { new: true }
    );

    const deletedIncome = await Income.deleteMany({
      "sub_category._id": subCategoryId,
    });

    console.log("deleted income for the sub-category: ", deletedIncome);

    return Response.json(category, { status: 200 });
  }
}
