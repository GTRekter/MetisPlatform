using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class AddGrammarPointRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string Title { get; set; }
        [DataType(DataType.Text)]
        public string Description { get; set; }
        public int LanguageId { get; set; }
    }
}
