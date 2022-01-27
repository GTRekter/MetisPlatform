using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class Word
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Text { get; set; }
        [Required]
        [MaxLength(255)]
        public string Romanization { get; set; }
        public string Description { get; set; }
        public string Example { get; set; }
        public string Enabled { get; set; }
        [Required]
        public int LanguageId { get; set; }
        [Required]
        public int WordTypeId { get; set; }

        [JsonIgnore]
        public Language Language { get; set; }    
        public WordType WordType { get; set; }
        [JsonIgnore]
        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<Translation> Translations { get; set; }
    }
}
