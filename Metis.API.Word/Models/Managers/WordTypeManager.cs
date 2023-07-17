using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using MongoDB.Driver;
using Metis.API.Models.Store;

namespace Metis.API.Models.Managers
{
    public class WordTypeManager
    {
        private readonly ApplicationDbContext _dataContext;

        public WordTypeManager(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<WordType> AddWordTypeAsync(WordType wordType)
        {
            await _dataContext.WordTypes.InsertOneAsync(wordType);
            return wordType;
        }

        public async Task RemoveWordTypeByIdAsync(int id)
        {
            var filter = Builders<WordType>.Filter.Eq(x => x.Id, id);
            await _dataContext.WordTypes.DeleteOneAsync(filter);
        }

        public async Task<IEnumerable<WordType>> GetWordTypesAsync()
        {
            var wordTypes = await _dataContext.WordTypes.Find(_ => true).ToListAsync();
            return wordTypes;
        }
    }
}
