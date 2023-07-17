using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Metis.API.Models.Requests
{
    public class DisableUsersRequest
    {
        [Required]
        public IList<string> Emails { get; set; }
    }
}
