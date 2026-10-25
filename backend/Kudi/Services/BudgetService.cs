using System.Globalization;
using Kudi.Data;
using Kudi.Dtos;
using Kudi.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kudi.Services;

internal record ExpenseRow(string Category, DateOnly Date, decimal Amount);

public class BudgetService(AppDbContext db) : IBudgetService
{
    public async Task<BudgetResponse> ToResponseAsync(Budget budget, int userId) => (
        await ToResponseAsync([budget], userId))[0];

    public async Task<List<BudgetResponse>> ToResponseAsync(List<Budget> budgets, int userId)
    {
        if (budgets.Count == 0) return [];

        var rangeStart = budgets.Min(b => b.StartDate);
        var rangeEnd = budgets.Max(b => b.EndDate);

        var expenses = await db.Transactions
        .AsNoTracking()
        .Where(t => t.UserId == userId
               && t.Type == TransactionType.Expense
               && t.Date >= rangeStart
               && t.Date <= rangeEnd)
        .Select(t => new ExpenseRow(t.Category, t.Date, t.Amount))
        .ToListAsync();

        return budgets.Select(b => Build(b, expenses)).ToList();
    }

    private static BudgetResponse Build(Budget b, List<ExpenseRow> expenses)
    {
        var inRange = expenses
            .Where(e => e.Date >= b.StartDate && e.Date <= b.EndDate)
            .ToList();

        var items = b.Items.Select(i =>
        {
            var used = inRange.Where(e => e.Category == i.Category).Sum(e => e.Amount);
            var pct = i.AmountBudgeted == 0 ? 0 : used / i.AmountBudgeted * 100;

            return new BudgetItemResponse(
                i.Category,
                i.AmountBudgeted,
                used > i.AmountBudgeted ? "over" : "on-track",
                used,
                i.AmountBudgeted - used,
                Math.Round(pct, 1).ToString("0.0", CultureInfo.InvariantCulture));
        }).ToList();

        return new BudgetResponse(
            b.Id,
            b.Title,
            b.StartDate,
            b.EndDate,
            items,
            items.Sum(i => i.AmountBudgeted),
            items.Sum(i => i.AmountUsed),
            b.CreatedAt);
    }
}