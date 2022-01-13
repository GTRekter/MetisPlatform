using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class EditUserRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public int Id { get; set; }
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
        public int DictionaryId { get; set; }
        [Required]
        [DataType(DataType.Text)]
        public int RoleId { get; set; }
        public IEnumerable<Lesson> Lessons { get; set; }
        public class Lesson 
        {
            public int Id { get; set; }
        }
    }
}
