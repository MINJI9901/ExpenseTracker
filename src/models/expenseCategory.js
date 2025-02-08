import mongoose from "mongoose";

const ExpenseCategorySchema = new mongoose.Schema({
  category: String,
  sub_category: [
    {
      name: String,
      budget: {
        type: Number,
        default: 0,
      },
    },
  ],
  date: {
    type: Date,
    // get: (date) => date.toLocaleDateString("en-US")
  },
  user_id: String,
});

// delete mongoose.models.ExpenseCategory;
if (mongoose.models.ExpenseCategory) {
  mongoose.deleteModel("ExpenseCategory");
}

export default mongoose.model("ExpenseCategory", ExpenseCategorySchema);
