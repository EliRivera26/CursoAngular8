using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appusuario3.DTOS;
using Microsoft.EntityFrameworkCore;




namespace appusuario3.Data
{
    public class MyContext: DbContext
    {
        public MyContext (DbContextOptions<MyContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

           
            modelBuilder.Entity<Usuario>().ToTable("users");
            


        }
    }
}
    

