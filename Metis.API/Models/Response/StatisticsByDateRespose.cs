using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Metis.Models.Store;

namespace Metis.Models.Responses
{
    public class StatisticsByDateRespose
    {
        public string Date { get; set; }
        public int Correct { get; set; }
        public int Incorrect { get; set; }
    }
}
