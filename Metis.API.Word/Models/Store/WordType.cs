using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Metis.API.Models.Store
{
    public class WordType
    {
        [BsonId]
        [BsonRepresentation(BsonType.Int32)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
