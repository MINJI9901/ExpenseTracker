import dbConnection from "@/lib/dbConnect";
import ExpenseCategory from "@/models/expenseCategory";
import { NextRequest } from 'next/server'
// import { NextRequest } from 'next/server';

export async function GET(req) {
    await dbConnection();

    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const month = parseInt(searchParams.get("month"));
    const year = parseInt(searchParams.get("year"));

    const startOfMonth = new Date(year, month, 2);
    const endOfMonth = new Date(year, month + 1, 2);
    console.log("start of month: ", startOfMonth);
    console.log("end of month: ", endOfMonth);

    const categoryData = await ExpenseCategory.find({
        date: {
            $gte: startOfMonth,
            $lt: endOfMonth
        }
    });
    console.log(categoryData)

    return Response.json(categoryData);
}

export async function POST(req) {
    await dbConnection();

    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const month = parseInt(searchParams.get("month"));
    const year = parseInt(searchParams.get("year"));
    console.log(parseInt(month) + 1)
    console.log(new Date(`${year}-${month + 1}-15`))

    const newCategory = new ExpenseCategory({
        category: '',
        sub_category: [{
            name: '',
            budget: '0',
        }],
        // date: new Date(`${year}-${parseInt(month) + 1}-15`)
        date: new Date(year, month, 15)
    })
    await newCategory.save();

    // const categoryData = await ExpenseCategory.find({});

    return Response.json(newCategory);
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