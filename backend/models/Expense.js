import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
            min: [0, 'Amount cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: [
                'Food & Dining',
                'Transportation',
                'Shopping',
                'Entertainment',
                'Bills & Utilities',
                'Healthcare',
                'Education',
                'Travel',
                'Personal',
                'Other',
            ],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            trim: true,
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
            default: Date.now,
        },
        paymentMethod: {
            type: String,
            required: [true, 'Please add a payment method'],
            enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other'],
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
