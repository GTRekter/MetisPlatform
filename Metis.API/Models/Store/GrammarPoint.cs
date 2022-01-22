using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class GrammarPoint
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public int LanguageId { get; set; }
        [JsonIgnore]
        public Language Language { get; set; }
        [JsonIgnore]
        public ICollection<Lesson> Lessons { get; set; }
    }
}
