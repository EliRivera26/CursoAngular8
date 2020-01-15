using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace appusuario3.DTOS
{
    public class MySqlDatabase : IDisposable
    {
        public MySqlConnection Connection;

        public MySqlDatabase(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
            this.Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}