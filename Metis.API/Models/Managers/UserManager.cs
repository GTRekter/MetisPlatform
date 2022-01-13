using System;
using System.Linq;
using System.Transactions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Metis.Models.Store;
using Microsoft.AspNetCore.Identity;

namespace Metis.Models.Managers
{
    public static class UserManager
    {
        public static async Task AddUserAsync(ApplicationDbContext dataContext, string name, string surname, string email, int roleId, int languageId, string password, IEnumerable<int> lessonsIds)
        {
            var hasher = new PasswordHasher<User>();
            var lessonsToAdd = await dataContext.Lessons.Where(d => lessonsIds.Contains(d.Id)).ToListAsync();
            User user = new User { 
                FirstName = name, 
                LastName = surname, 
                Email = email,
                Lessons = lessonsToAdd,
                Language = await dataContext.Languages.FirstOrDefaultAsync(d => d.Id == languageId),
                Role = await dataContext.Roles.FirstOrDefaultAsync(r => r.Id == roleId),
                PasswordHash = password
            };
            user.PasswordHash = hasher.HashPassword(user, password); 
            dataContext.Users.Add(user);
            await dataContext.SaveChangesAsync();
        }
        public static async Task EditUserAsync(ApplicationDbContext dataContext, int id, string name, string surname, string email, int roleId, int languageId, IEnumerable<int> lessonsIds)
        {
            string userId = id.ToString();
            User user = await dataContext.Users
                .Include(l => l.Lessons)
                .ThenInclude(u => u.Language)
                .FirstOrDefaultAsync(l => l.Id == id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            foreach (var lesson in user.Lessons)
            {
                if(!lessonsIds.Contains(lesson.Id))
                {
                    user.Lessons.Remove(lesson);
                }
            }
            foreach (var lesson in lessonsIds)
            {
                if(!user.Lessons.Any(w => w.Id == lesson))
                {
                    var lessonToAdd = await dataContext.Lessons.FirstOrDefaultAsync(w => w.Id == lesson);
                    user.Lessons.Add(lessonToAdd);
                }
            }
            user.FirstName = name;
            user.LastName = surname;
            user.Email = email;
            user.Language = await dataContext.Languages.FirstOrDefaultAsync(d => d.Id == languageId);
            user.Role = await dataContext.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
            dataContext.Update(user);
            await dataContext.SaveChangesAsync();
        }
        public static async Task DeleteUserByIdAsync(ApplicationDbContext dataContext, int id)
        {
            var userToRemove = await dataContext.Users.FindAsync(id);
            dataContext.Users.Remove(userToRemove);
            await dataContext.SaveChangesAsync();
        }
        
        public static async Task<User> GetUserByEmailAsync(ApplicationDbContext dataContext, string email)
        {
            return await dataContext.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
        public static async Task<int> GetUsersCountAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Users
                .CountAsync();
        }
        public static async Task<int> GetUsersCountAsync(ApplicationDbContext dataContext, string searchQuery)
        {
            return await dataContext.Users
                .Where(u => u.FirstName.Contains(searchQuery) 
                    || u.LastName.Contains(searchQuery) 
                    || u.Email.Contains(searchQuery))
                .CountAsync();
        }


        public static async Task<IEnumerable<User>> GetUsersAsync(ApplicationDbContext dataContext)
        {
            return await dataContext.Users
                .ToListAsync();
        }
        public static async Task<User> GetUserByIdAsync(ApplicationDbContext dataContext, int id)
        {
            return await dataContext.Users
                .Include(l => l.Lessons)
                    .ThenInclude(u => u.Language)
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
        }


        public static async Task<IEnumerable<User>> GetUsersByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage)
        {
            return await dataContext.Users
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.FirstName)
                .ToListAsync();
        }
        public static async Task<IEnumerable<User>> GetUsersByPageAsync(ApplicationDbContext dataContext, int page, int itemsPerPage, string searchQuery)
        {
            return await dataContext.Users
                .Where(u => u.FirstName.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.LastName.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase)
                    || u.Email.Contains(searchQuery, StringComparison.InvariantCultureIgnoreCase))
                .Skip(page * itemsPerPage)
                .Take(itemsPerPage)
                .OrderBy(u => u.FirstName)
                .ToListAsync();
        }
    

        public static async Task PasswordSignInAsync(ApplicationDbContext dataContext, string email, string password)
        {
            var user = await dataContext.Users
                .FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Password is incorrect");
            }
        }  
    }
}