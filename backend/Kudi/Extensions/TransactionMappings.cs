using Kudi.Dtos;
using Kudi.Entities;

namespace Kudi.Extensions;

public static class TransactionMappings
{
    public static TransactionResponse ToResponse(this Transaction t) =>
        new(t.Id, t.Title, t.Category, t.Amount, t.Date, t.Type, t.Note);
}