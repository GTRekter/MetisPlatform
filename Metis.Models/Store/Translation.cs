using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class Translation
    {
        public int IdPrimaryWord { get; set; }
        public int IdSecondaryWord { get; set; }
    }
}
