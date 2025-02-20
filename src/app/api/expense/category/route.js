import dbConnection from "@/lib/dbConnect";
import ExpenseCategory from "@/models/expenseCategory";
import Expense from "@/models/expense";
import { NextRequest } from "next/server";
// import { NextRequest } from 'next/server';

import { authenticateUser } from "@/app/login/actions";

export async function GET(req) {
  await dbConnection();
  const user = await authenticateUser();
  console.log("user in GET: ", user);

  // const reqUrl = req.url;
  // const { searchParams } = new URL(reqUrl);
  // const month = parseInt(searchParams.get("month"));
  // const year = parseInt(searchParams.get("year"));

  const month = parseInt(req.nextUrl.searchParams.get("month"));
  const year = parseInt(req.nextUrl.searchParams.get("year"));

  const startOfMonth = new Date(year, month, 1, 9, 0, 0);
  const endOfMonth = new Date(year, month + 1, 1, 9, 0, 0);

  const categoryData = await ExpenseCategory.find({
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
    user_id: user ? user.id : null,
  });

  return Response.json(categoryData);
}

export async function POST(req) {
  await dbConnection();
  const user = await authenticateUser();

  // const reqUrl = req.url;
  // const { searchParams } = new URL(reqUrl);

  // const { month, year } = req.nextUrl.searchParams.get("data")

  if (req.nextUrl.searchParams.get("month")) {
    const month = parseInt(req.nextUrl.searchParams.get("month"));
    const year = parseInt(req.nextUrl.searchParams.get("year"));

    const newCategory = new ExpenseCategory({
      category: " ",
      sub_category: [
        {
          name: " ",
          budget: 0,
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
    const newSubCategory = await ExpenseCategory.findByIdAndUpdate(id, {
      $push: {
        sub_category: {
          name: "",
          budget: 0,
        },
      },
    });

    return Response.json(newSubCategory);
  }

  // const categoryData = await ExpenseCategory.find({});
}

export async function PATCH(req) {
  await dbConnection();

  const { id, content } = await req.json();
  let updatedCategory;

  if (content.category) {
    updatedCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      { $set: content },
      { new: true }
    );
  } else {
    updatedCategory = await ExpenseCategory.findOneAndUpdate(
      { _id: id, "sub_category._id": content._id },
      {
        $set: {
          "sub_category.$.name": content.name,
          "sub_category.$.budget": content.budget,
        },
      }
    );
  }

  return Response.json(updatedCategory, { status: 200 });
}

export async function PUT(req) {
  await dbConnection();

  const newData = await req.json();

  console.log("newData: ", newData);

  const data = await ExpenseCategory.insertMany(newData);

  return Response.json(data, { status: 200 });
}

export async function DELETE(req) {
  await dbConnection();

  const { id } = await req.json();

  if (typeof id !== "object") {
    const deletedCategory = await ExpenseCategory.findByIdAndDelete(id);
    const deletedExpenses = await Expense.deleteMany({
      category: deletedCategory,
    });

    console.log("deleted expenses for the category: ", deletedExpenses);

    return Response.json(deletedCategory, { status: 200 });
  } else {
    const { categoryId, subCategoryId } = id;
    const category = await ExpenseCategory.findByIdAndUpdate(
      categoryId,
      { $pull: { sub_category: { _id: subCategoryId } } },
      { new: true }
    );

    const deletedExpenses = await Expense.deleteMany({
      "sub_category._id": subCategoryId,
    });

    console.log("deleted expenses for the sub-category: ", deletedExpenses);

    return Response.json(category, { status: 200 });
  }
}

// 'use server'

// import { redirect } from 'next/navigation'
// import { revalidatePath } from 'next/cache'

// export async function createPost(id: string) {
//   try {
//     // Call database
//   } catch (error) {
//     // Handle errors
//   }

//   revalidatePath('/posts') // Update cached posts
//   redirect(`/post/${id}`) // Navigate to the new post page
// }
