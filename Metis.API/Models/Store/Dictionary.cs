using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class Dictionary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(maximumLength: 25, MinimumLength = 2)]
        public string Code { get; set; }
        public bool Enabled { get; set; }


        [JsonIgnore]
        public ICollection<User> Users { get; set; }
        public ICollection<Word> Words { get; set; }
        public ICollection<GrammarPoint> GrammarPoints { get; set; }
        public ICollection<Translation> Trsanslations { get; set; }
    }
}
