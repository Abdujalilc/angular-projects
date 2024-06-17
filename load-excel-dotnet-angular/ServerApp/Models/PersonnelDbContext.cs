using Microsoft.EntityFrameworkCore;

namespace ServerApp.Models
{
    public class PersonnelDbContext : DbContext
    {
        public PersonnelDbContext(DbContextOptions<PersonnelDbContext> options) : base(options)
        {

        }

        public DbSet<Personnel> Personnels { get; set; }
    }
}
