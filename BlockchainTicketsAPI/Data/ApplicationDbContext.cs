using Microsoft.EntityFrameworkCore;
using BlockchainTicketsAPI.Models;

namespace BlockchainTicketsAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TestModel> TestTable { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map TestModel to testtable
            modelBuilder.Entity<TestModel>(entity =>
            {
                entity.ToTable("testtable");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.SampleField).HasColumnName("SampleField");
            });
        }
    }
}
