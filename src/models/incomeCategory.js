const mongoose = require('mongoose');

const IncomeCategorySchema = new mongoose.Schema({
    category: String,
    sub_category: [{
        name: String,
        expected_amount: Number,
    }]
})

export default mongoose.model('IncomeCategory', IncomeCategorySchema);