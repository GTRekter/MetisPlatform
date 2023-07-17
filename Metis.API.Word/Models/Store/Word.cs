using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Metis.API.Models.Store
{
    public class Word
    {
        [BsonId]
        [BsonRepresentation(BsonType.Int32)]
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
    }
}
