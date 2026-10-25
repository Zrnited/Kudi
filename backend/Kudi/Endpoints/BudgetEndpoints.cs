using System.Security.Claims;
using Kudi.Data;
using Kudi.Dtos;
using Kudi.Entities;
using Kudi.Extensions;
using Kudi.Services;
using Kudi.Validators;
using Microsoft.EntityFrameworkCore;

namespace Kudi.Endpoints;

public static class BudgetEndpoints
{
    public static IEndpointRouteBuilder MapBudgetEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/budgets")
            .WithTags("Budgets")
            .RequireAuthorization();

        // READ all (current user only, newest period first)
        group.MapGet("/", async (ClaimsPrincipal principal, AppDbContext db, IBudgetService service) =>
        {
            var userId = principal.GetUserId();

            var list = await db.Budgets
                .AsNoTracking()
                .Include(b => b.Items)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.StartDate)
                .ThenByDescending(b => b.Id)
                .ToListAsync();

            return Results.Ok(await service.ToResponseAsync(list, userId));
        });

        // READ one
        group.MapGet("/{id:int}", async (int id, ClaimsPrincipal principal, AppDbContext db, IBudgetService service) =>
        {
            var userId = principal.GetUserId();

            var budget = await db.Budgets
                .AsNoTracking()
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            return budget is null
                ? Results.NotFound()
                : Results.Ok(await service.ToResponseAsync(budget, userId));
        });

        // CREATE
        group.MapPost("/", async (BudgetRequest req, ClaimsPrincipal principal, AppDbContext db, IBudgetService service) =>
        {
            var errors = BudgetValidator.Validate(req);
            if (errors.Count > 0) return Results.ValidationProblem(errors);

            var userId = principal.GetUserId();

            var budget = new Budget
            {
                Title = req.Title!.Trim(),
                StartDate = req.StartDate!.Value,
                EndDate = req.EndDate!.Value,
                UserId = userId,
                Items = ToItems(req)
            };

            db.Budgets.Add(budget);
            await db.SaveChangesAsync();

            return Results.Created($"/api/budgets/{budget.Id}", await service.ToResponseAsync(budget, userId));
        });

        // UPDATE (replaces the budget items with the ones sent)
        group.MapPut("/{id:int}", async (int id, BudgetRequest req, ClaimsPrincipal principal, AppDbContext db, IBudgetService service) =>
        {
            var errors = BudgetValidator.Validate(req);
            if (errors.Count > 0) return Results.ValidationProblem(errors);

            var userId = principal.GetUserId();

            var budget = await db.Budgets
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            if (budget is null) return Results.NotFound();

            budget.Title = req.Title!.Trim();
            budget.StartDate = req.StartDate!.Value;
            budget.EndDate = req.EndDate!.Value;

            budget.Items.Clear();
            budget.Items.AddRange(ToItems(req));

            await db.SaveChangesAsync();

            return Results.Ok(await service.ToResponseAsync(budget, userId));
        });

        // DELETE (items are removed by the database cascade)
        group.MapDelete("/{id:int}", async (int id, ClaimsPrincipal principal, AppDbContext db) =>
        {
            var userId = principal.GetUserId();

            var deleted = await db.Budgets
                .Where(b => b.Id == id && b.UserId == userId)
                .ExecuteDeleteAsync();

            return deleted == 0 ? Results.NotFound() : Results.NoContent();
        });

        return app;
    }

    private static List<BudgetItem> ToItems(BudgetRequest req) =>
        req.Budget!.Select(i => new BudgetItem
        {
            Category = i.Category!.Trim().ToLowerInvariant(),
            AmountBudgeted = i.AmountBudgeted!.Value
        }).ToList();
}