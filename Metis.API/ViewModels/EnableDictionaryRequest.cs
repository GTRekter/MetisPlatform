using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Metis.Models.Store;

namespace Metis.API.ViewModels
{
    public class EnableDictionaryRequest
    {
        public int IdDictionary { get; set; }
        public bool Primary { get; set; }
    }
}
