using Microsoft.EntityFrameworkCore;
using Models;

namespace QuizServerApp
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options)
        {
            
        }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Quiz> Quiz { get; set; }
    }
}
