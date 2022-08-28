using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Premier;

namespace Premier.Data
{
    public class PremierContext : DbContext
    {
        public PremierContext (DbContextOptions<PremierContext> options)
            : base(options)
        {
        }

        public DbSet<Premier.Customer>? Customer { get; set; }
    }
}
