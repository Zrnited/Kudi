using Kudi.Dtos;

namespace Kudi.Services;

public interface ISummaryService
{
    Task<SummaryResponse> GetSummaryAsync(int userId, DateOnly monthStart);
}