import express from 'express';
import { body, validationResult } from 'express-validator';
import Expense from '../models/Expense.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/expenses
// @desc    Get all expenses for logged in user with filters
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { search, category, startDate, endDate, minAmount, maxAmount } = req.query;

        // Build query
        const query = { userId: req.user._id };

        if (search) {
            query.description = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = parseFloat(minAmount);
            if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
        }

        const expenses = await Expense.find(query).sort({ date: -1 });

        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/expenses/stats
// @desc    Get expense statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        // Total expenses
        const totalExpenses = await Expense.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        // Expenses by category
        const byCategory = await Expense.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { total: -1 } },
        ]);

        // Monthly expenses (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyExpenses = await Expense.aggregate([
            { $match: { userId, date: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        res.json({
            totalExpenses: totalExpenses[0]?.total || 0,
            byCategory,
            monthlyExpenses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/expenses
// @desc    Create new expense
// @access  Private
router.post(
    '/',
    protect,
    [
        body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('date').optional().isISO8601().withMessage('Invalid date format'),
        body('paymentMethod').notEmpty().withMessage('Payment method is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { amount, category, description, date, paymentMethod } = req.body;

            const expense = await Expense.create({
                userId: req.user._id,
                amount,
                category,
                description,
                date: date || Date.now(),
                paymentMethod,
            });

            res.status(201).json(expense);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// @route   GET /api/expenses/:id
// @desc    Get single expense
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Make sure user owns expense
        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/expenses/:id
// @desc    Update expense
// @access  Private
router.put(
    '/:id',
    protect,
    [
        body('amount').optional().isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
        body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
        body('date').optional().isISO8601().withMessage('Invalid date format'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const expense = await Expense.findById(req.params.id);

            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }

            // Make sure user owns expense
            if (expense.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const { amount, category, description, date, paymentMethod } = req.body;

            expense.amount = amount !== undefined ? amount : expense.amount;
            expense.category = category || expense.category;
            expense.description = description || expense.description;
            expense.date = date || expense.date;
            expense.paymentMethod = paymentMethod || expense.paymentMethod;

            const updatedExpense = await expense.save();

            res.json(updatedExpense);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Make sure user owns expense
        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await expense.deleteOne();

        res.json({ message: 'Expense removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
