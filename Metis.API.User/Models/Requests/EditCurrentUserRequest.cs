using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Metis.API.Models.Requests
{
    public class EditCurrentUserRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string FirstName { get; set; }
        [Required]
        [DataType(DataType.Text)]
        public string LastName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public int LanguageId { get; set; }
    }
}
