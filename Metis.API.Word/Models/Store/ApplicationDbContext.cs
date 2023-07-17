using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Metis.API.Models.Store
{
    public class ApplicationDbContext
    {
        private readonly IMongoDatabase _database;
        public IMongoCollection<WordType> WordTypes { get; }
        public IMongoCollection<Word> Words { get; }

        public ApplicationDbContext(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
            WordTypes = _database.GetCollection<WordType>("WordTypes");
            Words = _database.GetCollection<Word>("Words");

            SeedWordTypes();
        }

        public void SeedWordTypes()
        {
            var wordTypes = new List<WordType>
            {
                new WordType { Id = 1, Name = "Noun", Description = "" },
                new WordType { Id = 2, Name = "Adverb", Description = "" },
                new WordType { Id = 3, Name = "Verb", Description = "" },
                new WordType { Id = 4, Name = "Pronoun", Description = "" },
                new WordType { Id = 5, Name = "Adjective", Description = "" }
            };

            WordTypes.InsertMany(wordTypes);
        }
    }
}