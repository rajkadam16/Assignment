import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ExpenseModal from '../components/ExpenseModal';
import { toast } from 'react-toastify';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [expenses, filters]);

    const fetchExpenses = async () => {
        try {
            const { data } = await api.get('/expenses');
            setExpenses(data);
        } catch (error) {
            toast.error('Failed to load expenses');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...expenses];

        if (filters.search) {
            filtered = filtered.filter((exp) =>
                exp.description.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category) {
            filtered = filtered.filter((exp) => exp.category === filters.category);
        }

        if (filters.startDate) {
            filtered = filtered.filter((exp) => new Date(exp.date) >= new Date(filters.startDate));
        }

        if (filters.endDate) {
            filtered = filtered.filter((exp) => new Date(exp.date) <= new Date(filters.endDate));
        }

        setFilteredExpenses(filtered);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: '',
            startDate: '',
            endDate: '',
        });
    };

    const handleAddExpense = async (formData) => {
        try {
            const { data } = await api.post('/expenses', formData);
            setExpenses([data, ...expenses]);
            toast.success('Expense added successfully!');
        } catch (error) {
            toast.error('Failed to add expense');
            throw error;
        }
    };

    const handleEditExpense = async (formData) => {
        try {
            const { data } = await api.put(`/expenses/${editingExpense._id}`, formData);
            setExpenses(expenses.map((exp) => (exp._id === data._id ? data : exp)));
            toast.success('Expense updated successfully!');
            setEditingExpense(null);
        } catch (error) {
            toast.error('Failed to update expense');
            throw error;
        }
    };

    const handleDeleteExpense = async (id) => {
        console.log("Delete button clicked for ID:", id);

        if (!window.confirm('Are you sure you want to delete this expense?')) {
            console.log("Delete cancelled by user");
            return;
        }

        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(expenses.filter((exp) => exp._id !== id));
            toast.success('Expense deleted successfully!');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete expense');
        }
    };

    const exportToCSV = () => {
        const headers = ['Date', 'Description', 'Category', 'Amount', 'Payment Method'];
        const rows = filteredExpenses.map((exp) => [
            new Date(exp.date).toLocaleDateString('en-IN'),
            exp.description,
            exp.category,
            exp.amount,
            exp.paymentMethod,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success('Expenses exported to CSV!');
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Food & Dining': 'bg-orange-100 text-orange-700',
            'Transportation': 'bg-blue-100 text-blue-700',
            'Shopping': 'bg-pink-100 text-pink-700',
            'Entertainment': 'bg-purple-100 text-purple-700',
            'Bills & Utilities': 'bg-yellow-100 text-yellow-700',
            'Healthcare': 'bg-red-100 text-red-700',
            'Education': 'bg-indigo-100 text-indigo-700',
            'Travel': 'bg-green-100 text-green-700',
            'Personal': 'bg-teal-100 text-teal-700',
            'Other': 'bg-gray-100 text-gray-700',
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
                        <p className="text-gray-600 mt-2">
                            {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} • Total:{' '}
                            <span className="font-bold text-primary-600">{formatCurrency(totalAmount)}</span>
                        </p>
                    </div>
                    <div className="flex gap-3 mt-4 sm:mt-0">
                        <button onClick={exportToCSV} className="btn-secondary" disabled={filteredExpenses.length === 0}>
                            📥 Export CSV
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                            + Add Expense
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="card mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search description..."
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field">
                                <option value="">All Categories</option>
                                <option value="Food & Dining">Food & Dining</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Bills & Utilities">Bills & Utilities</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Travel">Travel</option>
                                <option value="Personal">Personal</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="input-field"
                            />
                        </div>
                    </div>
                    {(filters.search || filters.category || filters.startDate || filters.endDate) && (
                        <div className="mt-4">
                            <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Expenses List */}
                {filteredExpenses.length === 0 ? (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">💸</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses found</h3>
                        <p className="text-gray-600 mb-6">
                            {expenses.length === 0
                                ? 'Start tracking your expenses by adding your first one!'
                                : 'Try adjusting your filters'}
                        </p>
                        {expenses.length === 0 && (
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                                Add Your First Expense
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredExpenses.map((expense) => (
                            <div key={expense._id} className="card hover:shadow-lg transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{expense.description}</h3>
                                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                                    <span className={`badge ${getCategoryColor(expense.category)}`}>{expense.category}</span>
                                                    <span className="text-sm text-gray-500">•</span>
                                                    <span className="text-sm text-gray-600">{formatDate(expense.date)}</span>
                                                    <span className="text-sm text-gray-500">•</span>
                                                    <span className="text-sm text-gray-600">{expense.paymentMethod}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingExpense(expense);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteExpense(expense._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Expense Modal */}
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingExpense(null);
                }}
                onSave={editingExpense ? handleEditExpense : handleAddExpense}
                expense={editingExpense}
            />
        </>
    );
};

export default Expenses;
