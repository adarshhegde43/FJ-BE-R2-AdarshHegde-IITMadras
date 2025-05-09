const express = require('express');
const { Op, fn, col } = require('sequelize');
const { Transaction, ExpenseCategory, IncomeSource } = require('../models');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.user.id; 

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Total income
        const totalIncome = await Transaction.sum('amount', {
        where: {
            userId,
            type: 'income',
            date: { [Op.between]: [startOfMonth, endOfMonth] }
        }
        }) || 0;

        // Total expenses
        const totalExpenses = await Transaction.sum('amount', {
        where: {
            userId,
            type: 'expense',
            date: { [Op.between]: [startOfMonth, endOfMonth] }
        }
        }) || 0;

        const savings = totalIncome - totalExpenses;

        // Expenses by category
        const expensesByCategory = await Transaction.findAll({
        attributes: [
            [col('ExpenseCategory.name'), 'category'],
            [fn('SUM', col('amount')), 'amount']
        ],
        include: [{ model: ExpenseCategory, attributes: [] }],
        where: {
            userId,
            type: 'expense',
            date: { [Op.between]: [startOfMonth, endOfMonth] }
        },
        group: ['ExpenseCategory.name']
        });

        // Income by source
        const incomeBySource = await Transaction.findAll({
        attributes: [
            [col('IncomeSource.name'), 'source'],
            [fn('SUM', col('amount')), 'amount']
        ],
        include: [{ model: IncomeSource, attributes: [] }],
        where: {
            userId,
            type: 'income',
            date: { [Op.between]: [startOfMonth, endOfMonth] }
        },
        group: ['IncomeSource.name']
        });

        res.json({
        total_income: totalIncome,
        total_expenses: totalExpenses,
        savings,
        expenses_by_category: expensesByCategory,
        income_by_source: incomeBySource
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
