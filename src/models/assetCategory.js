const mongoose = require('mongoose');

const AssetCategorySchema = new mongoose.Schema({
    category: String
})

export default mongoose.model('AssetCategory', AssetCategorySchema);