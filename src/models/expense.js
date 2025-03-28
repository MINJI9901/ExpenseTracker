import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseCategory",
    required: true,
  },
  sub_category: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    budget: { type: Number, required: true },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    // get: (date) => date.toLocaleDateString("en-US") // getter
  },
  user_id: { type: String, required: true },
});

// delete mongoose.models.Expense;
if (mongoose.models.Expense) {
  mongoose.deleteModel("Expense");
}

export default mongoose.model("Expense", ExpenseSchema);

// validate: {
//     validator: async function (value) {
//         if (!this.category) return true; // Skip validation if no category is selected
//         const category = await mongoose.model('ExpenseCategory').findById(this.category);
//         if (!category) return false; // Category not found
//         return category.sub_category.some((sub) => sub.name === value);
//     },
//     message: (props) => `${props.value} is not a valid sub-category for the selected category.`
// }
