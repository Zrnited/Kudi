using Kudi.Constants;

namespace Kudi.Endpoints;

public static class CategoryEndpoints
{
    public static IEndpointRouteBuilder MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/categories", () => Results.Ok(Categories.All)).WithTags("Categories").RequireAuthorization();

        return app;
    }
}