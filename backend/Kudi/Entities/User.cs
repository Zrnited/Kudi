namespace Kudi.Entities;

public class User
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; } //never store raw password
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}