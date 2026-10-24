using Microsoft.EntityFrameworkCore;
using Kudi.Data;
using Kudi.Dtos;
using Kudi.Entities;

namespace Kudi.Endpoints;

public static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/users").WithTags("Users");

        group.MapPost("/register", async (RegisterRequest req, AppDbContext db) =>
        {
            var email = req.Email.Trim().ToLowerInvariant();

            if (await db.Users.AnyAsync(u => u.Email == email))
            {
                return Results.Conflict(new { message = "Email already in use" });
            }

            var user = new User
            {
                Name = req.Name,
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password)
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Created($"/api/users/{user.Id}", new UserResponse(user.Id, user.Name, user.Email));
        });

        return app;
    }
}
