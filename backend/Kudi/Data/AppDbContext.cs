using Kudi.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kudi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Budget> Budgets => Set<Budget>();
    public DbSet<BudgetItem> BudgetItems => Set<BudgetItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(e =>
        {
            e.Property(u => u.Name).HasMaxLength(100).IsRequired();
            e.Property(u => u.Email).HasMaxLength(255).IsRequired();
            e.HasIndex(u => u.Email).IsUnique(); //prevents duplication
        });

        modelBuilder.Entity<Transaction>(e =>
        {
            e.Property(t => t.Title).HasMaxLength(200).IsRequired();
            e.Property(t => t.Category).HasMaxLength(50).IsRequired();
            e.Property(t => t.Amount).HasPrecision(18, 2);
            e.Property(t => t.Note).HasMaxLength(1000);
            e.Property(t => t.Type).HasConversion<string>().HasMaxLength(20);

            e.HasOne<User>().WithMany().HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(t => new { t.UserId, t.Date });
        });

        modelBuilder.Entity<Budget>(e =>
        {
            e.Property(b => b.Title).HasMaxLength(200).IsRequired();
            e.HasOne<User>().WithMany().HasForeignKey(b => b.UserId).OnDelete(DeleteBehavior.Cascade);

            e.HasMany(b => b.Items).WithOne().HasForeignKey(i => i.BudgetId).OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(b => new { b.UserId, b.StartDate });
        });

        modelBuilder.Entity<BudgetItem>(e =>
        {
            e.Property(i => i.Category).HasMaxLength(50).IsRequired();
            e.Property(i => i.AmountBudgeted).HasPrecision(18, 2);
            e.HasIndex(i => new { i.BudgetId, i.Category }).IsUnique();
        });
    }
}
