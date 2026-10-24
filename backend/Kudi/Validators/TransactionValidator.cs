using Kudi.Constants;
using Kudi.Dtos;

namespace Kudi.Validators;

public static class TransactionValidator
{
    public static Dictionary<string, string[]> Validate(TransactionRequest request)
    {
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            errors["title"] = ["Title is required"];
        }
        else if (request.Title.Trim().Length > 200)
        {
            errors["title"] = ["Title must be 200 char or fewer"];
        }

        if (string.IsNullOrWhiteSpace(request.Category))
        {
            errors["category"] = ["Category is required"];
        }
        else if (!Categories.IsValid(request.Category))
        {
            errors["category"] = [$"Category must be one of: {string.Join(", ", Categories.All)}"];
        }

        if (request.Amount is null or <= 0)
        {
            errors["amount"] = ["Amount is required and must be greater than 0"];
        }

        if (request.Date is null)
        {
            errors["date"] = ["Date is required (yyyy-MM-dd)"];
        }

        if (request.Type is null)
        {
            errors["type"] = ["Type is required ('expense' or 'income)"];
        }

        return errors;
    }
}