using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class AddLessonRequest
    {
        [Required]
        [DataType(DataType.Text)]
        public string Title { get; set; }
        [DataType(DataType.Text)]
        public string Description { get; set; }
        public int LanguageId { get; set; }
        public IEnumerable<Word> Words { get; set; }
        public IEnumerable<GrammarPoint> GrammarPoints { get; set; }
        public class Word 
        {
            public int Id { get; set; }
        }
        public class GrammarPoint
        {
            public int Id { get; set; }
        }
    }
}
