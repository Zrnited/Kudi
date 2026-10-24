namespace Kudi.Dtos;

public record RegisterRequest(string Name, string Email, string Password);
public record UserResponse (int Id, string Name, string Email); //DO NOT return hashed password