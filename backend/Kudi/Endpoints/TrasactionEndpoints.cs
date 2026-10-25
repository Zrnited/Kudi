using System.Security.Claims;
using Kudi.Data;
using Kudi.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Kudi.Endpoints;

public static class TransactionEndpoints
{
    public static IEndpointRouteBuilder MapTransactionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/transactions").WithTags("Transactions").RequireAuthorization();

        group.MapGet("/", async (ClaimsPrincipal principal, AppDbContext db) =>
        {
            var userId = principal.GetUserId();

            var items = await db.Transactions.AsNoTracking().Where(t => t.UserId == userId).OrderByDescending(t => t.Date).ThenByDescending(t => t.Id).ToListAsync();

            return Results.Ok(items.Select(t => t.ToResponse()));
            // return Results.Ok(new TransactionResponse(t.Id, t.Title, t.Category, t.Amount, t.Date, t.Type, t.Note));
        });

        return app;
    }
}