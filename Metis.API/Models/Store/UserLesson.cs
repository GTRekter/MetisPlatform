using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;

namespace Metis.Models.Store
{
    public class UserLesson
    {
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public byte[] Cover { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime AssignedOn { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public Lesson Lesson { get; set; }
    }
}
