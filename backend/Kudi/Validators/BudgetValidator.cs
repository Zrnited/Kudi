using Kudi.Constants;
using Kudi.Dtos;

namespace Kudi.Validators;

public static class BudgetValidator
{
    public static Dictionary<string, string[]> Validate(BudgetRequest request)
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            errors["title"] = ["Title is required"];
        }
        else if (request.Title.Trim().Length > 200)
        {
            errors["title"] = ["Title must be 200 characters or fewer"];
        }

        if (request.StartDate is null)
        {
            errors["startDate"] = ["Start date is required (yyyy-MM-dd)"];
        }

        if (request.EndDate is null)
        {
            errors["endDate"] = ["End date is required (yyyy-MM-dd)"];
        }
        else if (request.StartDate is not null && request.EndDate < request.StartDate)
        {
            errors["endDate"] = ["End date can't be before start date"];
        }

        if (request.Budget is null || request.Budget.Count == 0)
        {
            errors["budget"] = ["At least one nudget item is required"];
            return errors;
        }

        var seen = new HashSet<string>();

        for (var i = 0; i < request.Budget.Count; i++)
        {
            var item = request.Budget[i];
            var key = $"budget[{i}]";

            if (item is null)
            {
                errors[key] = ["Budget item is required"];
                continue;
            }

            if (string.IsNullOrWhiteSpace(item.Category))
            {
                errors[$"{key}.category"] = ["Category is required"];
            }
            else if (!Categories.IsValid(item.Category))
            {
                errors[$"{key}.category"] = [$"Category must be one of: {string.Join(", ", Categories.All)}"];
            }
            else if (!seen.Add(item.Category.Trim().ToLowerInvariant()))
            {
                errors[$"{key}.category"] = ["Each category can only appear once per budget"];
            }

            if (item.AmountBudgeted is null or <= 0)
            {
                errors[$"{key}.amountBudgeted"] = ["Amount budgeted is required and must be greater than 0"];
            }
        }
        return errors;
    }
}