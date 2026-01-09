import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, expensesRes] = await Promise.all([
                api.get('/expenses/stats'),
                api.get('/expenses?limit=5'),
            ]);
            setStats(statsRes.data);
            setRecentExpenses(expensesRes.data.slice(0, 5));
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
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
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">Here's your expense overview</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-primary-100 text-sm font-medium">Total Expenses</p>
                                <p className="text-3xl font-bold mt-2">
                                    {formatCurrency(stats?.totalExpenses || 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Categories</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {stats?.byCategory?.length || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">This Month</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {stats?.monthlyExpenses?.[stats.monthlyExpenses.length - 1]?.count || 0}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">transactions</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Expenses */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
                            <Link to="/expenses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                View All →
                            </Link>
                        </div>

                        {recentExpenses.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No expenses yet</p>
                                <Link to="/expenses" className="btn-primary mt-4 inline-block">
                                    Add Your First Expense
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentExpenses.map((expense) => (
                                    <div key={expense._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{expense.description}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`badge ${getCategoryColor(expense.category)}`}>
                                                    {expense.category}
                                                </span>
                                                <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                {formatCurrency(expense.amount)}
                                            </p>
                                            <p className="text-xs text-gray-500">{expense.paymentMethod}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category Breakdown */}
                    <div className="card">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h2>

                        {stats?.byCategory?.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No data available</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stats?.byCategory?.slice(0, 5).map((cat) => (
                                    <div key={cat._id}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{cat._id}</span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {formatCurrency(cat.total)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${(cat.total / stats.totalExpenses) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Action */}
                <div className="mt-8 text-center">
                    <Link to="/expenses" className="btn-primary inline-flex items-center gap-2">
                        <span className="text-xl">+</span>
                        Add New Expense
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
