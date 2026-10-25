namespace Kudi.Entities;

public record BudgetItem
{
    public int Id { get; set; }
    public int BudgetId { get; set; }
    public required string Category { get; set; }
    public decimal AmountBudgeted { get; set; }
}

public class Budget
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public List<BudgetItem> Items { get; set; } = [];
    public int UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}