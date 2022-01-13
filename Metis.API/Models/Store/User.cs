using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public string PasswordHash { get; set; }
        public int DictionaryId { get; set; }
        public int RoleId { get; set; }
        
        public Role Role { get; set; }
        [JsonIgnore]
        public Dictionary Dictionary { get; set; }        
        public ICollection<Lesson> Lessons { get; set; }
    }
}
