using appusuario3.DTOS;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appusuario3.Mappings
{
    public class UserMapping: ClassMap<Usuario>

    {
        public UserMapping()
        {
            Table("users");
            Id(x => x.Id);
            Map(x => x.Nombre).Not.Nullable();
            Map(x => x.Apellido).Not.Nullable();
            Map(x => x.Telefono).Not.Nullable();
            Map(x => x.Edad).Not.Nullable();
            
        }
    }
}
