import mongoose from "mongoose";

const ExpenseCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  sub_category: [
    {
      name: { type: String, required: true },
      budget: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true,
    // get: (date) => date.toLocaleDateString("en-US")
  },
  user_id: { type: String, required: true },
});

// delete mongoose.models.ExpenseCategory;
if (mongoose.models.ExpenseCategory) {
  mongoose.deleteModel("ExpenseCategory");
}

export default mongoose.model("ExpenseCategory", ExpenseCategorySchema);
