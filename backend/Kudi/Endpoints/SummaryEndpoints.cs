using System.Globalization;
using System.Security.Claims;
using Kudi.Extensions;
using Kudi.Services;

namespace Kudi.Endpoints;

public static class SummaryEndpoints
{
    public static IEndpointRouteBuilder MapSummaryEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/summary", async (string? month, ClaimsPrincipal principal, ISummaryService service) =>
        {
            DateOnly currStart;

            if (string.IsNullOrEmpty(month))
            {
                var now = DateTime.UtcNow;
                currStart = new DateOnly(now.Year, now.Month, 1);
            }
            else if (DateTime.TryParseExact(month.Trim(), "M-yyyy", CultureInfo.InvariantCulture,
                         DateTimeStyles.None, out var parsed)
                     && parsed.Year is >= 2000 and <= 2100)
            {
                currStart = new DateOnly(parsed.Year, parsed.Month, 1);
            }
            else
            {
                return Results.ValidationProblem(new Dictionary<string, string[]>
                {
                    ["month"] = ["Use the format M-yyyy, e.g. 10-2026"]
                });
            }

            return Results.Ok(await service.GetSummaryAsync(principal.GetUserId(), currStart));
        }).WithTags("Summary").RequireAuthorization();

        return app;
    }
}