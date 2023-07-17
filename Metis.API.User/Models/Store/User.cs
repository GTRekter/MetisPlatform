using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Metis.API.Models.Store
{
    public class User
    {
       [BsonId]
        [BsonRepresentation(BsonType.Int32)]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }
        
        [MaxLength(255)]
        public string MiddleName { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        
        public bool Enabled { get; set; }
        
        [Required]
        public string PasswordHash { get; set; }
        
        public int LanguageId { get; set; }
        
        public int RoleId { get; set; }
        
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedOn { get; set; }
        
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime LastUpdate { get; set; }
    }
}
