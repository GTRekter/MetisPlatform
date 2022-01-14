using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Metis.Models.Store
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<WordType> WordTypes { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<GrammarPoint> GrammarPoints { get; set; }
        public DbSet<Statistic> Statistics { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            this.SeedLanguages(builder);
            this.SeedWordTypes(builder);
            this.SeedRoles(builder);
            this.SeedUsers(builder);

            builder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedOn)
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.LastUpdate)
                    .HasDefaultValueSql("getdate()");

                entity.HasOne(e => e.Language)
                    .WithMany(e => e.Users)
                    .HasForeignKey(e => e.LanguageId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(e => e.Role)
                    .WithMany(e => e.Users)
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(f => f.Lessons)
                    .WithMany(g => g.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserLesson",
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.NoAction),
                        j => j.HasOne<User>().WithMany().OnDelete(DeleteBehavior.NoAction));

                entity.ToTable("User");
            });
            
            builder.Entity<Role>(entity =>
            {
                entity.HasMany(e => e.Users)
                    .WithOne(e => e.Role)
                    .HasForeignKey(e => e.RoleId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable("Role");
            });

            builder.Entity<Word>(entity =>
            {
                entity.HasOne(e => e.WordType)
                    .WithMany(e => e.Words)
                    .HasForeignKey(e => e.WordTypeId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.Translations)
                    .WithOne(e => e.Word)
                    .HasForeignKey(e => e.WordId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.Lessons)
                    .WithMany(e => e.Words)
                    .UsingEntity<Dictionary<string, object>>(
                        "WordLesson",
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.NoAction),
                        j => j.HasOne<Word>().WithMany().OnDelete(DeleteBehavior.NoAction));

                entity.ToTable("Word");
            });

            builder.Entity<WordType>(entity =>
            {
                entity.HasMany(e => e.Words)
                    .WithOne(e => e.WordType)
                    .HasForeignKey(e => e.WordTypeId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable("WordType");
            });

            builder.Entity<Language>(entity =>
            {
                entity.HasMany(e => e.Users)
                    .WithOne(e => e.Language)
                    .HasForeignKey(e => e.LanguageId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(e => e.Lessons)
                    .WithOne(e => e.Language)
                    .HasForeignKey(e => e.LanguageId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable("Language");
            });

            builder.Entity<Translation>(entity =>
            {
                entity.HasOne(e => e.Word)
                    .WithMany(e => e.Translations)
                    .HasForeignKey(e => e.WordId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Language)
                    .WithMany(e => e.Trsanslations)
                    .HasForeignKey(e => e.LanguageId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable("Translation");
            });

            builder.Entity<Lesson>(entity =>
            {
                entity.HasMany(f => f.GrammarPoints)
                    .WithMany(g => g.Lessons)
                    .UsingEntity<Dictionary<string, object>>(
                        "LessonGrammarPoint",
                        j => j.HasOne<GrammarPoint>().WithMany().OnDelete(DeleteBehavior.NoAction),
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.NoAction));
                entity.ToTable("Lesson");

                entity.HasMany(f => f.Words)
                    .WithMany(g => g.Lessons)
                    .UsingEntity<Dictionary<string, object>>(
                        "LessonWord",
                        j => j.HasOne<Word>().WithMany().OnDelete(DeleteBehavior.Restrict),
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.Restrict));
                        
                entity.ToTable("Lesson");
            });

            builder.Entity<GrammarPoint>(entity =>
            {
                entity.HasMany(e => e.Lessons)
                    .WithMany(e => e.GrammarPoints)
                    .UsingEntity<Dictionary<string, object>>(
                        "LessonGrammarPoint",
                        j => j.HasOne<Lesson>().WithMany().OnDelete(DeleteBehavior.NoAction),
                        j => j.HasOne<GrammarPoint>().WithMany().OnDelete(DeleteBehavior.NoAction));

                entity.ToTable("GrammarPoint");
            });

            builder.Entity<Statistic>(entity =>
            {
                entity.Property(e => e.CreatedOn)
                    .HasDefaultValueSql("getdate()");

                entity.HasOne(e => e.User)
                    .WithMany(e => e.Statistics)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable("Statistic");
            });
        }
        private void SeedLanguages(ModelBuilder builder)
        {
            builder.Entity<Language>().HasData(new List<Language>(){
                new Language(){ Id = 1, Name = "English", Code = "en-US", Enabled = true },
                new Language(){ Id = 2, Name = "Korean", Code = "ko-KR", Enabled = true },
                new Language(){ Id = 3, Name = "Italian", Code = "it-IT", Enabled = true },
                new Language(){ Id = 4, Name = "Japanese", Code = "ja-JP", Enabled = true }
            });
        }
        private void SeedWordTypes(ModelBuilder builder)
        {
            builder.Entity<WordType>().HasData(new List<WordType>(){
                new WordType(){ Id = 1, Name = "Noun", Description = "" },
                new WordType(){ Id = 2, Name = "Adverb", Description = "" },
                new WordType(){ Id = 3, Name = "Verb", Description = "" },
                new WordType(){ Id = 4, Name = "Pronoum", Description = "" },
                new WordType(){ Id = 5, Name = "Adjective", Description = "" }
            });
        }
        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<Role>().HasData(new List<Role>(){
                new Role(){ Id = 1, Name = "Administrator", Description = "" },
                new Role(){ Id = 2, Name = "Teacher", Description = "" },
                new Role(){ Id = 3, Name = "Student", Description = "" }
            });
        }
        public void SeedUsers(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<User>();
            var user = new User
            {
                Id = 1,
                FirstName = "Admin",
                LastName = "Admin",
                LanguageId = 1,
                Email = "admin@metis.com",
                RoleId = 1
            }; 
            user.PasswordHash = hasher.HashPassword(user, "P@ssw0rd");   
            builder.Entity<User>().HasData(user);  
        }
    }
}