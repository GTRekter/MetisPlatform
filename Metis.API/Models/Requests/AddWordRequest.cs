using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class AddWordRequest
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Text { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Romanization { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
    }
}
