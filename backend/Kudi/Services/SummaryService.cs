using System.Globalization;
using Kudi.Data;
using Kudi.Dtos;
using Kudi.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kudi.Services;

public class SummaryService(AppDbContext db) : ISummaryService
{
    public async Task<SummaryResponse> GetSummaryAsync(int userId, DateOnly currStart)
    {
        var prevStart = currStart.AddMonths(-1);
        var nextStart = currStart.AddMonths(-1);

        var expenses = await db.Transactions.AsNoTracking().Where(t => t.UserId == userId && t.Type == TransactionType.Expense && t.Date >= prevStart && t.Date < nextStart).Select(t => new { t.Category, t.Date, t.Amount }).ToListAsync();

        var curr = expenses.Where(e => e.Date >= currStart).GroupBy(e => e.Category).ToDictionary(g => g.Key, g => g.Sum(e => e.Amount));

        var last = expenses.Where(e => e.Date < currStart).GroupBy(e => e.Category).ToDictionary(g => g.Key, g => g.Sum(e => e.Amount));

        var currTotal = curr.Values.Sum();
        var lastTotal = last.Values.Sum();

        var breakdown = curr.Keys.Union(last.Keys).Select(c => new SummaryBreakdown(c, last.GetValueOrDefault(c), curr.GetValueOrDefault(c))).OrderByDescending(b => b.CurrMonthSpending).ThenBy(b => b.Category).ToList();

        var byCategory = curr.OrderByDescending(kv => kv.Value).ThenBy(kv => kv.Key).Select(kv => new SummaryByCategory(kv.Key, kv.Value, Percent(kv.Value, currTotal))).ToList();

        var change = lastTotal == 0 ? null : Math.Round((currTotal - lastTotal) / lastTotal * 100, 1).ToString("0.0", CultureInfo.InvariantCulture);

        return new SummaryResponse(
            currStart.ToString("MMMM yyyy", CultureInfo.InvariantCulture), new SummaryComparison($"Compared to {prevStart.ToString("MMMM yyyy", CultureInfo.InvariantCulture)}", lastTotal, currTotal, change, breakdown), byCategory
        );
    }

    private static string Percent(decimal part, decimal total) => total == 0 ? "0.0" : Math.Round(part/total * 100, 1).ToString("0.0", CultureInfo.InvariantCulture);
}