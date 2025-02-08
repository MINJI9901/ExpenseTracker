import mongoose from "mongoose";

const AssetCategorySchema = new mongoose.Schema({
  category: String,
  user_id: String,
});

export default mongoose.model("AssetCategory", AssetCategorySchema);
