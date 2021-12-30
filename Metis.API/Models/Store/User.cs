using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Metis.Models.Store
{
    public class User: IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }

        public Dictionary Dictionary { get; set; }
        public ICollection<Lesson> Lessons { get; set; }

        public User()
        {
            this.EmailConfirmed = false;
            this.PhoneNumberConfirmed = false;
        }
    }
}
