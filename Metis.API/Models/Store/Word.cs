using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class Word
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Text { get; set; }
        public string Romanization { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
        public int DictionaryId { get; set; }
        public int WordTypeId { get; set; }
        [JsonIgnore]
        public Dictionary Dictionary { get; set; }    
        public WordType WordType { get; set; }
        public ICollection<Translation> Translations { get; set; }
    }
}
