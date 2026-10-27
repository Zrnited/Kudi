namespace Kudi.Dtos;

public record SummaryBreakdown(string Category, decimal LastMonthSpending, decimal CurrMonthSpending);

public record SummaryComparison(
    string Title,
    decimal LastTotalSpending,
    decimal CurrTotalSpending,
    string? PercentageChange,
    List<SummaryBreakdown> Breakdown
);

public record SummaryByCategory(string Category, decimal TotalSpent, string PercentageSpent);

public record SummaryResponse(
    string Period,
    SummaryComparison Comparison,
    List<SummaryByCategory> ByCategory
);