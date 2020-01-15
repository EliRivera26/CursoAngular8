using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appusuario3.Data;
using appusuario3.DTOS;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using NHibernate;
using dto = appusuario3.DTOS;

namespace appusuario3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private ISession session;
        private readonly MyContext mycontext;

        public ValuesController(MyContext context)
        {
            mycontext = context;
            //session = SesionFactory.OpenSession;
            
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IList<Usuario>> Get()
        {
            var usuarios = mycontext.Usuarios.ToList();

            /*IQuery query = session.CreateQuery("FROM users");
            IList<Usuario> users = query.List<Usuario>();
            var usuarios = users.ToList();*/
            return usuarios;


            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Usuario> Get(int id)
        {
            var user = mycontext.Usuarios.Find(id);
            return user;
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Usuario> Post([FromBody] Usuario usuario)
        {
            mycontext.Add(usuario);
            mycontext.SaveChanges();

            return usuario;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Usuario value)
        {
            var user = mycontext.Usuarios.Find(id);
            mycontext.Entry(user).CurrentValues.SetValues(value);
            mycontext.SaveChanges();

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var user = mycontext.Usuarios.Find(id);

            if(user.Id > 0)
            {
                mycontext.Remove(user);
                mycontext.SaveChanges();
            }
            
        }
    }
}
