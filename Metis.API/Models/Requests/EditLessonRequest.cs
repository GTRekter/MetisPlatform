using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class EditLessonRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Description { get; set; }
    }
}
