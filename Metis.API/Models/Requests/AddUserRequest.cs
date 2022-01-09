using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class AddUserRequest
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
        [DataType(DataType.Text)]
        public string Role { get; set; }
        [Obsolete]
        public string Password { get; set; }
        public IEnumerable<Dictionary> Dictionaries { get; set; }
        public class Dictionary 
        {
            public int Id { get; set; }
        }
    }
}
