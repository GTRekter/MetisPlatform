using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Metis.API.Models.Store;

namespace Metis.API.Models.Managers
{
    public class WordManager
    {
        private readonly ApplicationDbContext _dataContext;

        public WordManager(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddWordAsync(string text, string romanization, int languageId, int wordTypeId, string description, string example)
        {
            var word = new Word
            {
                Text = text.ToLower(),
                Romanization = romanization.ToLower(),
                Description = description,
                Example = example,
                WordTypeId = wordTypeId,
                LanguageId = languageId,
            };

            await _dataContext.Words.InsertOneAsync(word);
        }

        public async Task EditWordAsync(int id, string text, string romanization, int languageId, int wordTypeId, string description, string example)
        {
            var wordToEdit = await _dataContext.Words.Find(w => w.Id == id).FirstOrDefaultAsync();
            if (wordToEdit == null)
            {
                throw new Exception("Word not found");
            }

            wordToEdit.Text = text.ToLower();
            wordToEdit.Romanization = romanization.ToLower();
            wordToEdit.Description = description;
            wordToEdit.Example = example;
            wordToEdit.WordTypeId = wordTypeId;
            wordToEdit.LanguageId = languageId;

            await _dataContext.Words.ReplaceOneAsync(w => w.Id == id, wordToEdit);
        }

        public async Task DeleteWordByIdAsync(int id)
        {
            await _dataContext.Words.DeleteOneAsync(w => w.Id == id);
        }

        public async Task<int> GetWordsCountAsync(int? userId = null, string searchQuery = null)
        {
            var filter = Builders<Word>.Filter.Empty;

            if (userId.HasValue)
            {
                // var user = await _dataContext.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
                // var lessonIds = user?.Lessons ?? new List<int>();
                // filter &= Builders<Word>.Filter.In(w => w.LessonId, lessonIds);
                // find lessons with words that belong to the user
            }

            if (!string.IsNullOrEmpty(searchQuery))
            {
                var textFilter = Builders<Word>.Filter.Regex(w => w.Text, new BsonRegularExpression(searchQuery, "i"));
                var romanizationFilter = Builders<Word>.Filter.Regex(w => w.Romanization, new BsonRegularExpression(searchQuery, "i"));
                var descriptionFilter = Builders<Word>.Filter.Regex(w => w.Description, new BsonRegularExpression(searchQuery, "i"));
                filter &= Builders<Word>.Filter.Or(textFilter, romanizationFilter, descriptionFilter);
            }

            return (int)await _dataContext.Words.CountDocumentsAsync(filter);
        }

        public async Task<IEnumerable<Word>> GetWordsAsync(int? userId = null, int? wordTypeId = null)
        {
            var filter = Builders<Word>.Filter.Empty;

            if (userId.HasValue)
            {
                // var user = await _dataContext.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
                // var lessonIds = user?.Lessons ?? new List<int>();
                // filter &= Builders<Word>.Filter.In(w => w.LessonId, lessonIds);
                // find lessons with words that belong to the user
            }

            if (wordTypeId.HasValue)
            {
                filter &= Builders<Word>.Filter.Eq(w => w.WordTypeId, wordTypeId);
            }

            return await _dataContext.Words.Find(filter).ToListAsync();
        }


        public async Task<Word> GetWordByIdAsync(int id)
        {
            return await _dataContext.Words.Find(w => w.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Word> GetWordByTextAsync(string text)
        {
            return await _dataContext.Words.Find(w => w.Text == text).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Word>> GetWordsByLanguageId(int id)
        {
            return await _dataContext.Words.Find(w => w.LanguageId == id).ToListAsync();
        }

        public async Task<IEnumerable<Word>> GetWordsByPageAsync(int? userId = null, int page = 0, int itemsPerPage = 10, string searchQuery = null)
        {
            var filter = Builders<Word>.Filter.Empty;

            if (!string.IsNullOrEmpty(searchQuery))
            {
                filter &= Builders<Word>.Filter.Or(
                    Builders<Word>.Filter.Regex(w => w.Text, new BsonRegularExpression(searchQuery, "i")),
                    Builders<Word>.Filter.Regex(w => w.Romanization, new BsonRegularExpression(searchQuery, "i")),
                    Builders<Word>.Filter.Regex(w => w.Description, new BsonRegularExpression(searchQuery, "i"))
                );
            }

            if (userId.HasValue)
            {
                // var user = await _dataContext.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
                // var lessonIds = user?.Lessons ?? new List<int>();
                // filter &= Builders<Word>.Filter.In(w => w.LessonId, lessonIds);
                // find lessons with words that belong to the user
            }

            return await _dataContext.Words.Find(filter)
                .Skip(page * itemsPerPage)
                .Limit(itemsPerPage)
                .SortBy(w => w.Id)
                .ToListAsync();
        }

    }
}
