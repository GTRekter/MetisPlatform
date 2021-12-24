using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class Translation
    {
        [Required]
        public int IdPrimaryWord { get; set; }
        [Required]
        public int IdSecondaryWord { get; set; }
    }
}
