using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class Translation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Text { get; set; }
        [Required]
        public int WordId { get; set; }
        [Required]
        public int LanguageId { get; set; }
        [Required]
        [JsonIgnore]
        public Word Word { get; set; }
        [Required]
        public Language Language { get; set; }

    }
}
