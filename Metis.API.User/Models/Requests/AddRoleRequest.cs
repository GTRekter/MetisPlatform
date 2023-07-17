using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
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
