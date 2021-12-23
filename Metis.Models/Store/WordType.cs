using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Metis.Models.Store
{
    //public enum WordType
    //{
    //    Noun = 0,
    //    Adverb = 1,
    //    Verb = 2,
    //    Pronoum = 3
    //}
    public class WordType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
