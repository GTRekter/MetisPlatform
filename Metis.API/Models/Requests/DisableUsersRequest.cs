using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Metis.Models.Requests
{
    public class DisableUsersRequest
    {
        [Required]
        public IList<string> Emails { get; set; }
    }
}
