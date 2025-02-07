const mongoose = require("mongoose");

const IncomeCategorySchema = new mongoose.Schema({
  category: String,
  sub_category: [
    {
      name: String,
      expected_amount: {
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

if (mongoose.models.IncomeCategory) {
  mongoose.deleteModel("IncomeCategory");
}

export default mongoose.model("IncomeCategory", IncomeCategorySchema);
