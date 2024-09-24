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

        public DbSet<User> users { get; set; }
        public DbSet<Role> roles { get; set; }
        public DbSet<Permission> permissions { get; set; }
        public DbSet<Event> events { get; set; }
        public DbSet<Ticket> tickets { get; set; }
        public DbSet<UserRole> userroles { get; set; }
        public DbSet<RolePermission> rolepermissions { get; set; }
        public DbSet<Feedback> feedbacks { get; set; }
        public DbSet<Wallet> wallets { get; set; }
        public DbSet<Notification> notifications { get; set; }
        public DbSet<Transaction> transactions { get; set; }
        public DbSet<TicketLog> ticketlogs { get; set; }
        public DbSet<EventCategory> eventcategories { get; set; }
        public DbSet<EventCategoryMapping> eventcategorymappings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.userid);
                entity.Property(e => e.firebaseuid).IsRequired();
                entity.Property(e => e.username).IsRequired().HasMaxLength(255);
                entity.Property(e => e.email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.passwordhash).IsRequired();
                entity.Property(e => e.roleid).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
                entity.HasKey(e => e.roleid);
                entity.Property(e => e.rolename).IsRequired().HasMaxLength(255);
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("permissions");
                entity.HasKey(e => e.permissionid);
                entity.Property(e => e.permissionname).IsRequired().HasMaxLength(255);
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("events");
                entity.HasKey(e => e.eventid);
                entity.Property(e => e.eventname).IsRequired().HasMaxLength(255);
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("tickets");
                entity.HasKey(e => e.ticketid);
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("userroles");
                entity.HasKey(e => e.userroleid);
                entity.Property(e => e.userid).IsRequired();
                entity.Property(e => e.roleid).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.ToTable("rolepermissions");
                entity.HasKey(e => e.rolepermissionid);
                entity.Property(e => e.roleid).IsRequired();
                entity.Property(e => e.permissionid).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedbacks");
                entity.HasKey(e => e.feedbackid);
                entity.Property(e => e.feedbackcontent).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Wallet>(entity =>
            {
                entity.ToTable("wallets");
                entity.HasKey(e => e.walletid);
                entity.Property(e => e.walletaddress).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("notifications");
                entity.HasKey(e => e.notificationid);
                entity.Property(e => e.notificationcontent).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.ToTable("transactions");
                entity.HasKey(e => e.transactionid);
                entity.Property(e => e.transactiontype).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<TicketLog>(entity =>
            {
                entity.ToTable("ticketlogs");
                entity.HasKey(e => e.ticketlogid);
                entity.Property(e => e.action).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<EventCategory>(entity =>
            {
                entity.ToTable("eventcategories");
                entity.HasKey(e => e.eventcategoryid);
                entity.Property(e => e.categoryname).IsRequired().HasMaxLength(255);
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });

            modelBuilder.Entity<EventCategoryMapping>(entity =>
            {
                entity.ToTable("eventcategorymappings");
                entity.HasKey(e => e.eventcategorymappingid);
                entity.Property(e => e.eventid).IsRequired();
                entity.Property(e => e.categoryid).IsRequired();
                entity.Property(e => e.createdat).IsRequired();
                entity.Property(e => e.updatedat).IsRequired();
            });
        }
    }
}
