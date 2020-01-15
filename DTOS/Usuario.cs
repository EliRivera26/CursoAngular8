using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;
using System.Configuration;


namespace appusuario3.DTOS
{
    /*public class MyDBUsuario : DbContext
    {
        public MyDBUsuario(DbContextOptions<MyDBUsuario> options): base(options)
            {

            }

        public DbSet<Usuario>Usuario{ get; set; }
    }*/
 
    public class Usuario
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public long Telefono { get; set; }

        public int Edad { get; set; }
    }

    public class UsuarioIdentifier
    {
        public int Id { get; set; }
    }

}
