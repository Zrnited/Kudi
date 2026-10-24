namespace Kudi.Entities;

public enum TransactionType
{
    Expense,
    Income
}

public class Transaction
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Category { get; set; }
    public decimal Amount { get; set; }
    public DateOnly Date { get; set; }
    public string? Note { get; set; }
    public TransactionType Type { get; set; }
    public int UserId { get; set; } //set by the server from the signed-in user
    public DateTime CreatedAt { get; set; }
}