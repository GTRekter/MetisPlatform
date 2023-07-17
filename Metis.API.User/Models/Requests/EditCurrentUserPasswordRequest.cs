using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Metis.API.Models.Requests
{
    public class EditCurrentUserPasswordRequest
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string ConfirmNewPassword { get; set; }
    }
}
