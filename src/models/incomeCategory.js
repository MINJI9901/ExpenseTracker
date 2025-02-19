import mongoose from "mongoose";

const IncomeCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  sub_category: [
    {
      name: { type: String, required: true },
      expected_amount: {
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

if (mongoose.models.IncomeCategory) {
  mongoose.deleteModel("IncomeCategory");
}

export default mongoose.model("IncomeCategory", IncomeCategorySchema);
