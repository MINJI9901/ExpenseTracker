import dbConnection from "@/lib/dbConnect";
import Expense from "@/models/expense";

export async function GET(req) {
    await dbConnection();

    const startDate = req.nextUrl.searchParams.get('start');
    const endDate = req.nextUrl.searchParams.get('end');

    const expenses = await Expense.find({
        date: {
            $gte: startDate,
            $lte: endDate
        }
    })
    .populate('category')
    .sort({ date: 1 });
    
    return Response.json(expenses, {status: 200});
}


export async function POST(req) {
    await dbConnection();

    const {name, amount, category, sub_category, date} = await req.json();

    const newExpense = new Expense({
        name: name,
        amount: amount,
        category: category[0],
        date: date
    })

    await newExpense.save();

    if (sub_category.length) {
        await Expense.findByIdAndUpdate(newExpense._id, {sub_category: {...sub_category[0]}})
    }

    return Response.json(newExpense, {status: 200});
}

export async function DELETE(req) {
    await dbConnection();
    
    const { id } = await req.json();

    const deleteExpense = await Expense.findByIdAndDelete(id);

    return Response.json(deleteExpense, {status: 200})
}

    
    // if (searchParams.get('month')) {
    //     const month = parseInt(searchParams.get("month"));
    //     const year = parseInt(searchParams.get("year"));
    
    //     const newCategory = new ExpenseCategory({
    //         category: '',
    //         sub_category: [{
    //             name: '',
    //             budget: 0,
    //         }],
    //         // date: new Date(`${year}-${parseInt(month) + 1}-15`)
    //         date: new Date(year, month, 15)
    //     })
    //     await newCategory.save();

    //     return Response.json(newCategory);

    // } else {
    //     const { id } = await req.json();
    //     const newSubCategory = await ExpenseCategory.findByIdAndUpdate(id,
    //         {
    //             $push: {
    //                 sub_category: 
    //                 {
    //                     name: '',
    //                     budget: 0,
    //                 }
    //             }
    //         })

    //     return Response.json(newSubCategory);
    // }