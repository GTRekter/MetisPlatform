using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Metis.API.Models.Requests
{
    public class AddRoleRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        [DataType(DataType.Text)]
        public string Description { get; set; }
    }
}
