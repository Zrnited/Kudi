namespace Kudi.Dtos;

public record BudgetItemRequest(string? Category, decimal? AmountBudgeted);

public record BudgetRequest(
    string? Title,
    DateOnly? StartDate,
    DateOnly? EndDate,
    List<BudgetItemRequest>? Budget
);

public record BudgetItemResponse(
    string Category,
    decimal AmountBudgeted,
    string Status,
    decimal AmountUsed,
    decimal AmountRemaining,
    string PercentageUsed
);

public record BudgetResponse(
    int Id,
    string Title,
    DateOnly StartDate,
    DateOnly EndDate,
    List<BudgetItemResponse> Budget,
    decimal TotalBudgeted,
    decimal TotalSpent,
    DateTime CreatedAt
);