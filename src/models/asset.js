const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "AssetCategory" },
  date: {
    type: Date,
    default: Date.now,
    get: (date) => date.toLocaleDateString("en-US"), // getter
  },
  estimated_value: Number,
  user_id: String,
});

export default mongoose.model("Asset", AssetSchema);
