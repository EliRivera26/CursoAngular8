using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace appusuario3
{
    public class SesionFactory
    {
        private static volatile ISessionFactory isesionFactory;
        private static object synRoot = new Object();
        //string static connectionstring = "server=127.0.0.1; database=dbusers; uid=root; pwd=";
        public static ISession OpenSession
        {
            get
            {
                if(isesionFactory == null)
                {
                    lock (synRoot)
                    {
                        if(isesionFactory == null)
                        {
                            isesionFactory = BuildSessionFactory();
                        }
                    }
                }
                return isesionFactory.OpenSession();
            }
        }
        private static ISessionFactory BuildSessionFactory()
        {
            try
            {

                string connectionString = "Server=localhost;port=3306;Database=dbusers;Uid=elizabeth;pwd='Eli109301';CharSet=utf8;Allow User Variables=True";
                return Fluently.Configure()
                    .Database(MsSqlConfiguration.MsSql2012
                    .ConnectionString(connectionString))
                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Program>())
                    .ExposeConfiguration(BuildSchema)
                    .BuildSessionFactory();
            }
            catch (FluentConfigurationException e)
            {
                Console.Write(e.Message);
                throw;

            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                throw;

            }
        }
        private static AutoPersistenceModel CreateMappings()
        {
            return AutoMap
                .Assembly(Assembly.GetCallingAssembly())
                .Where(testc => testc.Namespace == "appusuario3");
        }
        private static void BuildSchema(Configuration config)
        {

        }
    }
}
