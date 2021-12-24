using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Metis.Models.Store;

namespace Metis.API.ViewModels
{
    public class AddWordWithTranslationsRequest
    {
        public Word Word { get; set; }
        public IEnumerable<Word> Translations { get; set; }
    }
}
