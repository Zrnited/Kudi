using System.Security.Claims;
using Kudi.Data;
using Kudi.Dtos;
using Kudi.Entities;
using Kudi.Extensions;
using Kudi.Validators;
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

            // var items = await db.Transactions.
        });


        return app;
    }
}