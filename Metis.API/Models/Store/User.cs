using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Metis.Models.Store
{
    public class User: IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public int DictionaryId { get; set; }
        [JsonIgnore]
        public Dictionary Dictionary { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
        public User()
        {
            this.EmailConfirmed = false;
            this.PhoneNumberConfirmed = false;
        }
    }
}
