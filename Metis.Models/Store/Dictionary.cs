using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class Dictionary
    {
        [ForeignKey("DictionaryId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Name { get; set; }
        [StringLength(maximumLength: 25, MinimumLength = 25)]
        public string Code { get; set; }
        public bool Primary { get; set; }
        public bool Enabled { get; set; }
    }
}
