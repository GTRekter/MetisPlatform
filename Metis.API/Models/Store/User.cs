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
        public string PasswordHash { get; set; }
        public int LanguageId { get; set; }
        public int RoleId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedOn { get; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime LastUpdate { get; }

        public Role Role { get; set; }
        [JsonIgnore]
        public Language Language { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
    }
}
