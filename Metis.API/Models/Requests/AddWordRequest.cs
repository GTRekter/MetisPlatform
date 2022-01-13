using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class AddWordRequest
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 1)]
        public string Text { get; set; }
        public string Romanization { get; set; }
        public int DictionaryId { get; set; }
        public int WordTypeId { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
        public IEnumerable<Translation> Translations { get; set; }
        public class Translation
        {
            public int DictionaryId { get; set; }
            public string Text { get; set; }
        }
    }
}
