namespace Kudi.Constants;

public static class Categories
{
    public static readonly string[] All = [ "food", "housing", "transport", "utilities", "shopping", "entertainment", "health", "education", "others", "salary", "freelance", "business", "gifts"
    ];

    public static bool IsValid(string category) => All.Contains(category.Trim().ToLowerInvariant());
}