const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory' },
    sub_category: {
        type: String,
        // validate: {
        //     validator: async function (value) {
        //         if (!this.category) return true; // Skip validation if no category is selected
        //         const category = await mongoose.model('ExpenseCategory').findById(this.category);
        //         if (!category) return false; // Category not found
        //         return category.sub_category.some((sub) => sub.name === value);
        //     },
        //     message: (props) => `${props.value} is not a valid sub-category for the selected category.`
        // }
    },
    date: {
        type: Date, 
        default: Date.now,
        get: (date) => date.toLocaleDateString("en-US") // getter
       }
})

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);