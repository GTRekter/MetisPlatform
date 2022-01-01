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
        public static async Task<IdentityResult> AddUser(UserManager<User> userManager, string name, string surname, string email, string password)
        {
            User user = new User { FirstName = name, LastName = surname, UserName = email, Email = email };
            return await userManager.CreateAsync(user, password);
        }
        public static async Task<IdentityResult> EditUser(UserManager<User> userManager, int id, string name, string surname, string email)
        {
            string userId = id.ToString();
            User user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.FirstName = name;
            user.LastName = surname;
            user.Email = email;
            return await userManager.UpdateAsync(user);
        }
        public static async Task<IdentityResult> EditUserPassword(UserManager<User> userManager, int id, string oldPassword, string newPassword)
        {
            string userId = id.ToString();
            User user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        }
        public static async Task<IdentityResult> AddUserToRole(UserManager<User> userManager, string userName, string roleName)
        {
            User user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await userManager.AddToRoleAsync(user, roleName);
        }
        public static async Task<IdentityResult> RemoveUserFromRole(UserManager<User> userManager, string userName, string roleName)
        {
            User user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            bool inRole = await userManager.IsInRoleAsync(user, roleName);
            if (inRole == true)
            {
                return await userManager.RemoveFromRoleAsync(user, roleName);
            }
            else
            {
                throw new Exception($"User not assigned to the {roleName} role");
            }
        }
        public static async Task<IdentityResult> DeleteUserById(UserManager<User> userManager, int id)
        {
            string userId = id.ToString();
            User user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await userManager.DeleteAsync(user);
        }
        public static async Task<IdentityResult> DeleteUser(UserManager<User> userManager, string userName)
        {
            User user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await userManager.DeleteAsync(user);
        }
        public static async Task DisableUser(UserManager<User> userManager, ApplicationDbContext context, string userName)
        {
            User user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.IsActive = false;
            context.Update(user);
            context.SaveChanges();
        }
        public static IEnumerable<User> GetUsers(UserManager<User> userManager)
        {
            return userManager.Users;
        }
        public static async Task<User> GetUserById(UserManager<User> userManager, int id)
        {
            return await userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        public static async Task<int> GetUsersCount(UserManager<User> userManager)
        {
            return await userManager.Users.CountAsync();
        }
        public static async Task<int> GetUsersBySearchQueryCount(UserManager<User> userManager, string searchQuery)
        {
            return await userManager.Users.Where(u => u.FirstName.Contains(searchQuery) || u.LastName.Contains(searchQuery) || u.UserName.Contains(searchQuery) || u.Email.Contains(searchQuery)).CountAsync();
        }
        public static async Task<IEnumerable<User>> GetUsersByPage(ApplicationDbContext context, int page, int itemsPerPage)
        {
            return await context.Users.Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.FirstName).ToListAsync();
        }
        public static async Task<IEnumerable<User>> GetUsersByPageAndSearchQuery(ApplicationDbContext context, int page, int itemsPerPage, string searchQuery)
        {
            return await context.Users.Where(u => u.FirstName.Contains(searchQuery) || u.LastName.Contains(searchQuery) || u.UserName.Contains(searchQuery) || u.Email.Contains(searchQuery)).Skip(page * itemsPerPage).Take(itemsPerPage).OrderBy(u => u.FirstName).ToListAsync();
        }
        // public static void SetDefaultLanguage(ApplicationDbContext context, int userId, int languageId)
        // {
        //     var user = context.Users.Where(u => u.Id == userId).FirstOrDefault();
        //     if (user != null)
        //     {
        //         user.LanguageId = languageId;
        //     }
        //     dataContext.Update(user);
        //     dataContext.SaveChanges();
        // }
    }
}