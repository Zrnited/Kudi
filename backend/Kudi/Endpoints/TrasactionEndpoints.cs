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

            var items = await db.Transactions.AsNoTracking().Where(t => t.UserId == userId).OrderByDescending(t => t.Date).ThenByDescending(t => t.Id).ToListAsync();

            return Results.Ok(items.Select(t => t.ToResponse()));
            // return Results.Ok(new TransactionResponse(t.Id, t.Title, t.Category, t.Amount, t.Date, t.Type, t.Note));
        });

        group.MapGet("/{id:int}", async (int id, ClaimsPrincipal principal, AppDbContext db) =>
        {
            var userId = principal.GetUserId();

            var t = await db.Transactions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            return t is null ? Results.NotFound() : Results.Ok(t.ToResponse());
        });

        group.MapPost("/", async (TransactionRequest request, ClaimsPrincipal principal, AppDbContext db) =>
        {
            var errors = TransactionValidator.Validate(request);
            if (errors.Count > 0) return Results.ValidationProblem(errors);

            var t = new Transaction
            {
                Title = request.Title!.Trim(),
                Category = request.Category!.Trim().ToLowerInvariant(),
                Amount = request.Amount!.Value,
                Date = request.Date!.Value,
                Type = request.Type!.Value,
                Note = string.IsNullOrWhiteSpace(request.Note) ? null : request.Note.Trim(),
                UserId = principal.GetUserId()
            };
            db.Transactions.Add(t);
            await db.SaveChangesAsync();

            return Results.Created($"/api/transactions/{t.Id}", t.ToResponse());
        });

        group.MapPut("/{id:int}", async (int id, TransactionRequest request, ClaimsPrincipal principal, AppDbContext db) =>
        {
            var errors = TransactionValidator.Validate(request);
            if (errors.Count > 0) return Results.ValidationProblem(errors);

            var userId = principal.GetUserId();

            var t = await db.Transactions.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (t is null) return Results.NotFound();

            t.Title = request.Title!.Trim();
            t.Category = request.Category!.Trim().ToLowerInvariant();
            t.Amount = request.Amount!.Value;
            t.Date = request.Date!.Value;
            t.Type = request.Type!.Value;
            t.Note = string.IsNullOrWhiteSpace(request.Note) ? null : request.Note.Trim();

            await db.SaveChangesAsync();
            return Results.Ok(t.ToResponse());
        });

        group.MapDelete("/{id:int}", async (int id, ClaimsPrincipal principal, AppDbContext db) =>
        {
            var userId = principal.GetUserId();

            var deleted = await db.Transactions.Where(t => t.Id == id && t.UserId == userId).ExecuteDeleteAsync();

            return deleted == 0 ? Results.NotFound() : Results.NoContent();
        });


        return app;
    }
}