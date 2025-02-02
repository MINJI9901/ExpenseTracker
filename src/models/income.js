const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'IncomeCategory' },
    sub_category: { 
        id: String,
        name: String,
        budget: Number,
     },
    date: {
        type: Date, 
        default: Date.now,
        // get: (date) => date.toLocaleDateString("en-US") // getter
       }
})

export default mongoose.model('Income', IncomeSchema);