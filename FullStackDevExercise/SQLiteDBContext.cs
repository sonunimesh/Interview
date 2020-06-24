using FullStackDevExercise.Model;
using Microsoft.EntityFrameworkCore;

namespace FullStackDevExercise
{
    public class SQLiteDBContext: DbContext
    {
        public DbSet<owner> owners { get; set; }
         public DbSet<pet> pets { get; set; }
          public DbSet<appointment> appointments { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=dolittle.db");

    }
}
