using Kudi.Dtos;
using Kudi.Entities;

namespace Kudi.Services;

public interface IBudgetService
{
    Task<BudgetResponse> ToResponseAsync(Budget budget, int userId);
    Task<List<BudgetResponse>> ToResponseAsync(List<Budget> budgets, int userId);
}