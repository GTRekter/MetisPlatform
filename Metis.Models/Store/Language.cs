using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class Language
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Name { get; set; }
        [StringLength(maximumLength: 4, MinimumLength = 2)]
        public string Code { get; set; }
    }
}
