const mongoose = require('mongoose');

const ExpenseCategorySchema = new mongoose.Schema({
    category: String,
    sub_category: [{
        name: String,
        budget: Number,
    }],
    date: {
        type: Date,
        // get: (date) => date.toLocaleDateString("en-US")
       }
})

// delete mongoose.models.ExpenseCategory;
if (mongoose.models.ExpenseCategory) {
    mongoose.deleteModel('ExpenseCategory');
}

export default mongoose.model('ExpenseCategory', ExpenseCategorySchema);