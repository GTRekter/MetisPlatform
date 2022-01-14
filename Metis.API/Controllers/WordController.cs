using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Metis.Models.Managers;
using Metis.Models.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Metis.API.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using CsvHelper;
using System.Globalization;
using System;
using System.Dynamic;
using System.Text;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddWord")]
        public async Task<IActionResult> AddWordAsync(AddWordRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            await WordManager.AddWordAsync(_context, request.Text, request.Romanization, request.LanguageId, request.WordTypeId, request.Description, request.Example, request.Translations.Select(t => new KeyValuePair<int,string>(t.LanguageId, t.Text)));
            return Ok();
        }
        
        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditWord")]
        public async Task<IActionResult> EditWordAsync(EditWordRequest request)
        {
            if (request == null)
            {
                return NotFound();
            }
            var translationsToAdd = new List<KeyValuePair<int, string>>();
            var translationsToEdit = new List<KeyValuePair<int, string>>();
            foreach (var translation in request.Translations)
            {
                if (translation.Id == null)
                {
                    translationsToAdd.Add(new KeyValuePair<int, string>(translation.LanguageId, translation.Text));
                }
                else
                {
                    translationsToEdit.Add(new KeyValuePair<int, string>((int)translation.Id, translation.Text));
                }
            }    
            await WordManager.EditWordAsync(_context, request.Id, request.Text, request.Romanization, request.LanguageId, request.WordTypeId, request.Description, request.Example, translationsToAdd, translationsToEdit);
            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteWordById")]
        public async Task<IActionResult> DeleteWordByIdAsync(int id)
        {
            await WordManager.DeleteWordByIdAsync(_context, id);
            return Ok();
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWords")]
        public async Task<IActionResult> GetWordsAsync()
        {
            IEnumerable<Word> words = await WordManager.GetWordsAsync(_context);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByLanguageId")]
        public async Task<IActionResult> GetWordsByLanguageIdAsync(int id)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByLanguageId(_context, id);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserId")]
        public async Task<IActionResult> GetWordsByUserIdAsync(int id)
        {
            IEnumerable<Word> words = await WordManager.GetWordsAsync(_context, id);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndWordTypeId")]
        public async Task<IActionResult> GetWordsByUserIdAndWordTypeIdAsync(int id, int wordTypeId)
        {
            IEnumerable<Word> words = await WordManager.GetWordsAsync(_context, id, wordTypeId);
            return Ok(words);
        }   

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordById")]
        public async Task<IActionResult> GetWordByIdAsync(int id)
        {
            var word = await WordManager.GetWordByIdAsync(_context, id);
            return Ok(word);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPage")]
        public async Task<IActionResult> GetWordsByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAsync(_context, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndPage")]
        public async Task<IActionResult> GetWordsByUserIdAndPageAsync(int id, int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAsync(_context, id, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAsync(_context, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByUserIdAndPageAndSearchQueryAsync(int id, int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await WordManager.GetWordsByPageAsync(_context, id, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsCount")]
        public async Task<IActionResult> GetWordsCountAsync()
        {
            int counter = await WordManager.GetWordsCountAsync(_context);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdCount")]
        public async Task<IActionResult> GetWordsByUserIdCountAsync(int id)
        {
            int counter = await WordManager.GetWordsCountAsync(_context, id);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsBySearchQueryCount")]
        public async Task<IActionResult> GetWordsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await WordManager.GetWordsCountAsync(_context, searchQuery);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByUserIdAndSearchQueryCount")]
        public async Task<IActionResult> GetWordsByUserIdAndSearchQueryCountAsync(int id, string searchQuery)
        {
            int counter = await WordManager.GetWordsCountAsync(_context, id, searchQuery);
            return Ok(counter);
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("ImportWordsFromFile")]
        public async Task<IActionResult> ImportWordsFromFileAsync(IFormFile file) 
        {
            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var languages = await LanguageManager.GetLanguagesAsync(_context);
                var wordTypes = await WordTypeManager.GetWordTypesAsync(_context);
                IEnumerable<dynamic> records = csv.GetRecords<dynamic>();
                foreach (var record in records)
                {
                    var dictionary = (IDictionary<string, object>)record;
                    if(!dictionary.ContainsKey("Text") || !dictionary.ContainsKey("Romanization") || !dictionary.ContainsKey("Language") 
                        || !dictionary.ContainsKey("WordType") || !dictionary.ContainsKey("Description") || !dictionary.ContainsKey("Example"))
                    {
                        return BadRequest("Missing fields in CSV file");
                    }
                    WordType wordTypeToRelate = wordTypes.FirstOrDefault(wt => wt.Name.Equals(record.WordType, StringComparison.InvariantCultureIgnoreCase));
                    if(wordTypeToRelate == null )
                    {
                        return BadRequest($"Invalid word type for word ${record.Text}. The supported word types are: ${wordTypes.Select(wt => wt.Name).Aggregate((a, b) => a + ", " + b)}");
                    }
                    Language languageToRelate = languages.FirstOrDefault(l => l.Code.Equals(record.Language, StringComparison.InvariantCultureIgnoreCase));
                    if(languageToRelate == null)
                    {
                        return BadRequest($"Invalid language for word ${record.Text}. the supported languages are: ${languages.Select(l => l.Code).Aggregate((a, b) => a + ", " + b)}");
                    }
                    var translations = new List<KeyValuePair<int,string>>();                 
                    foreach (var language in languages)
                    {
                        if(dictionary.ContainsKey(language.Code)) 
                        {
                            translations.Add(new KeyValuePair<int,string>(language.Id, dictionary[language.Code].ToString()));
                        }
                    }         
                    await WordManager.AddWordAsync(_context, record.Text, record.Romanization, languageToRelate.Id, wordTypeToRelate.Id, record.Description, record.Example, translations);
                }
            }
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("DownloadImportTemplate")]
        public async Task<IActionResult> DownloadImportTemplateAsync() 
        {
            var languages = await LanguageManager.GetLanguagesAsync(_context);
            var wordTypes = await WordTypeManager.GetWordTypesAsync(_context);

            var records = new List<dynamic>();
            dynamic record = new ExpandoObject();
            record.Text = "Word";
            record.Romanization = "Romanization";
            record.Description = "Description";
            record.Language = $"Supported Languages {languages.Select(l => l.Code).Aggregate((a, b) => a + ", " + b)}";
            record.WordType = $"Supported Word Types {wordTypes.Select(wt => wt.Name).Aggregate((a, b) => a + ", " + b)}";
            record.Example = "Example";
            var recordDict = record as IDictionary<String, object>;
            foreach (var language in languages)
            {
                recordDict.Add(language.Code, $"{language.Name} translation");
            } 
            records.Add(record);
            
            using (var writer = new StringWriter())
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(records);          
                writer.ToString();
                writer.Flush();
                return File(Encoding.UTF8.GetBytes(writer.ToString()), "text/csv", "ImportTemplate.csv");
            }
        }
    }
}