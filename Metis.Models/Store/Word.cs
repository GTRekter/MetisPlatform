using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Metis.Models.Store
{
    public class Word
    {
        [ForeignKey("WordId")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int DictionaryId { get; set; }
        [Required]
        public int WordTypeId { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Text { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
        public ICollection<Translation> Translations { get; set; }
    }
}
