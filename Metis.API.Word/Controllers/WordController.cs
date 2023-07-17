using System;
using System.IO;
using System.Text;
using System.Linq;
using System.Dynamic;
using System.Globalization;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using CsvHelper;
using Metis.API.Models.Managers;
using Metis.API.Models.Store;
using Metis.API.Models;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private readonly WordManager _wordManager;

        public WordController(ApplicationDbContext dataContext)
        {
            _wordManager = new WordManager(dataContext);
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
            await _wordManager.AddWordAsync(request.Text, request.Romanization, request.LanguageId, request.WordTypeId, request.Description, request.Example);
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
            await _wordManager.EditWordAsync(request.Id, request.Text, request.Romanization, request.LanguageId, request.WordTypeId, request.Description, request.Example);
            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("DeleteWordById")]
        public async Task<IActionResult> DeleteWordByIdAsync(int id)
        {
            await _wordManager.DeleteWordByIdAsync(id);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWords")]
        public async Task<IActionResult> GetWordsAsync()
        {
            IEnumerable<Word> words = await _wordManager.GetWordsAsync();
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByLanguageId")]
        public async Task<IActionResult> GetWordsByLanguageIdAsync(int id)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsByLanguageId(id);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUser")]
        public async Task<IActionResult> GetWordsByCurrentUserAsync(int userId)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsAsync(userId);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUserAndWordTypeId")]
        public async Task<IActionResult> GetWordsByCurrentUserAndWordTypeIdAsync(int userId, int wordTypeId)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsAsync(userId, wordTypeId);
            return Ok(words);
        }   

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordById")]
        public async Task<IActionResult> GetWordByIdAsync(int id)
        {
            var word = await _wordManager.GetWordByIdAsync(id);
            return Ok(word);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPage")]
        public async Task<IActionResult> GetWordsByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsByPageAsync(null, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUserAndPage")]
        public async Task<IActionResult> GetWordsByCurrentUserAndPageAsync(int userId, int page, int itemsPerPage)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsByPageAsync(userId, page, itemsPerPage);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsByPageAsync(null, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUserAndPageAndSearchQuery")]
        public async Task<IActionResult> GetWordsByCurrentUserAndPageAndSearchQueryAsync(int userId, int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<Word> words = await _wordManager.GetWordsByPageAsync(userId, page, itemsPerPage, searchQuery);
            return Ok(words);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsCount")]
        public async Task<IActionResult> GetWordsCountAsync()
        {
            int counter = await _wordManager.GetWordsCountAsync();
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUserCount")]
        public async Task<IActionResult> GetWordsByCurrentUserCountAsync(int userId)
        {
            int counter = await _wordManager.GetWordsCountAsync(userId);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsBySearchQueryCount")]
        public async Task<IActionResult> GetWordsBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await _wordManager.GetWordsCountAsync(null, searchQuery);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetWordsByCurrentUserAndSearchQueryCount")]
        public async Task<IActionResult> GetWordsByCurrentUserAndSearchQueryCountAsync(int userId, string searchQuery)
        {
            int counter = await _wordManager.GetWordsCountAsync(userId, searchQuery);
            return Ok(counter);
        }

        // [HttpPost]
        // [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        // [Route("ImportWordsFromFile")]
        // public async Task<IActionResult> ImportWordsFromFileAsync(IFormFile file) 
        // {
        //     using (var reader = new StreamReader(file.OpenReadStream()))
        //     using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        //     {
        //         var languages = await LanguageManager.GetLanguagesAsync(_dataContext);
        //         var wordTypes = await WordTypeManager.GetWordTypesAsync(_dataContext);
        //         IEnumerable<dynamic> records = csv.GetRecords<dynamic>();
        //         foreach (var record in records)
        //         {
        //             var dictionary = (IDictionary<string, object>)record;
        //             if(!dictionary.ContainsKey("Text") || !dictionary.ContainsKey("Romanization") || !dictionary.ContainsKey("Language") 
        //                 || !dictionary.ContainsKey("WordType") || !dictionary.ContainsKey("Description") || !dictionary.ContainsKey("Example"))
        //             {
        //                 return BadRequest("Missing fields in CSV file");
        //             }
        //             WordType wordTypeToRelate = wordTypes.FirstOrDefault(wt => wt.Name.Equals(record.WordType, StringComparison.InvariantCultureIgnoreCase));
        //             if(wordTypeToRelate == null )
        //             {
        //                 return BadRequest($"Invalid word type for word ${record.Text}. The supported word types are: ${wordTypes.Select(wt => wt.Name).Aggregate((a, b) => a + ", " + b)}");
        //             }
        //             Language languageToRelate = languages.FirstOrDefault(l => l.Code.Equals(record.Language, StringComparison.InvariantCultureIgnoreCase));
        //             if(languageToRelate == null)
        //             {
        //                 return BadRequest($"Invalid language for word ${record.Text}. the supported languages are: ${languages.Select(l => l.Code).Aggregate((a, b) => a + ", " + b)}");
        //             }
        //             var translations = new List<KeyValuePair<int,string>>();                 
        //             foreach (var language in languages)
        //             {
        //                 if(dictionary.ContainsKey(language.Code)) 
        //                 {
        //                     translations.Add(new KeyValuePair<int,string>(language.Id, dictionary[language.Code].ToString()));
        //                 }
        //             }         
        //             await _wordManager.AddWordAsync(_dataContext, record.Text, record.Romanization, languageToRelate.Id, wordTypeToRelate.Id, record.Description, record.Example, translations);
        //         }
        //     }
        //     return Ok();
        // }

        // [HttpGet]
        // [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        // [Route("DownloadImportTemplate")]
        // public async Task<IActionResult> DownloadImportTemplateAsync() 
        // {
        //     var languages = await LanguageManager.GetLanguagesAsync(_dataContext);
        //     var wordTypes = await WordTypeManager.GetWordTypesAsync(_dataContext);

        //     var records = new List<dynamic>();
        //     dynamic record = new ExpandoObject();
        //     record.Text = "Word";
        //     record.Romanization = "Romanization";
        //     record.Description = "Description";
        //     record.Language = $"Supported Languages {languages.Select(l => l.Code).Aggregate((a, b) => a + ", " + b)}";
        //     record.WordType = $"Supported Word Types {wordTypes.Select(wt => wt.Name).Aggregate((a, b) => a + ", " + b)}";
        //     record.Example = "Example";
        //     var recordDict = record as IDictionary<String, object>;
        //     foreach (var language in languages)
        //     {
        //         recordDict.Add(language.Code, $"{language.Name} translation");
        //     } 
        //     records.Add(record);
            
        //     using (var writer = new StringWriter())
        //     using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
        //     {
        //         csv.WriteRecords(records);          
        //         writer.ToString();
        //         writer.Flush();
        //         return File(Encoding.UTF8.GetBytes(writer.ToString()), "text/csv", "ImportTemplate.csv");
        //     }
        // }
    }
}