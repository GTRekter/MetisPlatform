using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Metis.Models.Store
{
    public class Role : IdentityRole<int>
    {
        public string Description { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}