﻿using Microsoft.EntityFrameworkCore;

namespace Metis.Models.Store
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        // public void OnModelCreating() {
        // TODO: Add has no key to Translations
        // }

        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Dictionary> Dictionaries { get; set; }
        // public DbSet<Translation> Translations { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
    }
}