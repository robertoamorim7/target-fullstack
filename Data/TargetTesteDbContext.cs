using Microsoft.EntityFrameworkCore;
using target_teste.Models;

namespace target_teste.Data
{
    public class TargetTesteDbContext : DbContext
    {
        public TargetTesteDbContext(DbContextOptions<TargetTesteDbContext> options) : base(options) { }

        public DbSet<Lancamento> Lancamentos { get; set;}
        //public DbSet<Lancamento> Lancamentos => Set<Lancamento>();
        //public string DbPath { get; set; }

    }
}
