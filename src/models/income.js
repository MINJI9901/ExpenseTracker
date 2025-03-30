import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IncomeCategory",
    required: true,
  },
  sub_category: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    expected_amount: { type: Number, required: true },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    // get: (date) => date.toLocaleDateString("en-US") // getter
  },
  user_id: { type: String, required: true },
});

if (mongoose.models.Income) {
  mongoose.deleteModel("Income");
}

export default mongoose.model("Income", IncomeSchema);
