using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.API.Models
{
    public class AddWordRequest
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 1)]
        public string Text { get; set; }
        public string Romanization { get; set; }
        public int LanguageId { get; set; }
        public int WordTypeId { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
    }
}
