using Kudi.Entities;

namespace Kudi.Dtos;

public record TransactionRequest
(
    string? Title,
    string? Category,
    decimal? Amount,
    DateOnly? Date,
    TransactionType? Type,
    string? Note
);

public record TransactionResponse(
    int Id,
    string Title,
    string Category,
    decimal Amount,
    DateOnly Date,
    TransactionType Type,
    string? Note
);