﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Metis.Models.Store;
using Metis.Models.Requests;
using Metis.Models.Managers;
using Metis.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Globalization;
using System.Text;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager, IConfiguration configuration)
            : base(dataContext, userManager, roleManager)
        {
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("LoginUser")]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            var user = _userManager.FindByEmailAsync(model.Email).Result;
            if(user == null)
            {
                // User userToAdd = new User { FirstName = "", LastName = "", UserName = "admin@metis.com", Email = "admin@metis.com" };
                // await _userManager.CreateAsync(userToAdd, "P@ssw0rd");
                // await _userManager.AddToRoleAsync(userToAdd, "Administrator");
                // await UserManager.AddUser(_userManager, "", "", model.Email, "P@ssw0rd");
                // await UserManager.AddUserToRole(_userManager, model.Email, "Administrator");

                return BadRequest("User not found");
            }
            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
            if (result.Succeeded)
            {
                var jwtOptions = new JwtOptions();
                _configuration.GetSection(nameof(JwtOptions)).Bind(jwtOptions); 
                var authenticationManager = new AuthenticationManager(_userManager, _roleManager, jwtOptions, _dataContext);
                var token = await authenticationManager.GenerateToken(user);
                return Ok(token);
            }
            else
            {
                return BadRequest("Invalid login attempt.");
            }  
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddUser")]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUserAsync(AddUserRequest model)
        {
            int numberOfNonAlphanumericCharacters = new Random().Next(1, _userManager.Options.Password.RequiredLength - 1);
            int passwordlength = int.Parse(_configuration["Identity:AutoGeneratedPasswordLength"]);
            string password = Password.Generate(passwordlength, numberOfNonAlphanumericCharacters);

            IdentityResult result = await UserManager.AddUser(_userManager, model.FirstName, model.LastName, model.Email, password);
            if (!result.Succeeded)
            {
                var error = string.Join(",", result.Errors.Select(e => e.Description));
                throw new Exception(error);
            }
            result = await UserManager.AddUserToRole(_userManager, model.Email, model.Role);
            if (!result.Succeeded)
            {
                var error = string.Join(",", result.Errors.Select(e => e.Description));
                throw new Exception(error);
            }

            var smptServer = _configuration["Email:SmptServer"];
            var smptPort = int.Parse(_configuration["Email:SmptPort"]);
            var enableSsl = bool.Parse(_configuration["Email:EnableSsl"]);
            var smptUsername = _configuration["Email:SmptUsername"];
            var smptPassword = _configuration["Email:SmptPassword"];
            var sender = _configuration["Email:Sender"];
            Email email = new Email(smptServer, smptPort, enableSsl, smptUsername, smptPassword, sender);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "email.html");
            string message = System.IO.File.ReadAllText(filePath);
            message = message.Replace("{{TEMPORARYPASSWORD}}", password);
            email.Send(new string[] { model.Email }, message, "Temporary password", true, System.Net.Mail.MailPriority.High);

            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetCurrentUsers")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCurrentUsersAsync()
        {
            var data = await _userManager.GetUserAsync(HttpContext.User);
            return Ok(data);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetUsers")]
        [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetUsersAsync()
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            IEnumerable<User> users = UserManager.GetUsers(_userManager);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetUserById")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            User users = await UserManager.GetUserById(_userManager, id);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetUsersByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<User> users = await UserManager.GetUsersByPage(_dataContext, page, itemsPerPage);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetUsersByPageAndSearchQuery")]
        public async Task<IActionResult> GetUsersByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            IEnumerable<User> users = await UserManager.GetUsersByPageAndSearchQuery(_dataContext, page, itemsPerPage, searchQuery);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetUsersCount")]
        public async Task<IActionResult> GetUsersCountAsync()
        {
            int counter = await UserManager.GetUsersCount(_userManager);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetUsersBySearchQueryCount")]
        public async Task<IActionResult> GetUsersBySearchQueryCountAsync(string searchQuery)
        {
            int counter = await UserManager.GetUsersBySearchQueryCount(_userManager, searchQuery);
            return Ok(counter);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditUser")]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditUserAsync(EditUserRequest model)
        {
            var result = await UserManager.EditUser(_userManager, model.Id, model.FirstName, model.LastName, model.Email);

            // var roles = RoleManager.GetRolesByUserId(_dataContext, model.Id).Select(r => r.Name);
            // foreach (var role in roles)
            // {
            //     result = await UserManager.RemoveUserFromRole(_userManager, model.Email, role);
            //     if (!result.Succeeded)
            //     {
            //         var error = string.Join(",", result.Errors.Select(e => e.Description));
            //         throw new Exception(error);
            //     }
            // }

            // result = await UserManager.AddUserToRole(_userManager, model.Email, model.Role);
            // if (!result.Succeeded)
            // {
            //     var error = string.Join(",", result.Errors.Select(e => e.Description));
            //     throw new Exception(error);
            // }
            return Ok();
        }

        [HttpPost]
        [Route("DeleteUsers")]
        [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> DeleteUsersAsync(DeleteUsersRequest model)
        {
            IdentityResult result = null;
            for (int i = 0; i < model.Emails.Count(); i++)
            {
                result = await UserManager.DeleteUser(_userManager, model.Emails[i]);
                if (!result.Succeeded)
                {
                    var error = string.Join(",", result.Errors.Select(e => e.Description));
                    throw new Exception(error);
                }
            }
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteUserById")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        public async Task<IActionResult> DeleteUserByIdAsync(int id)
        {
            await UserManager.DeleteUserById(_userManager, id);
            return Ok();
        }

        // [HttpPost]
        // [Route("DisableUsers")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> DisableUsersAsync(DisableUsersRequest model)
        // {
        //     for (int i = 0; i < model.Emails.Count(); i++)
        //     {
        //         await UserManager.DisableUser(_userManager, _dataContext, model.Emails[i]);
        //     }
        //     return Ok();
        // }

        // [HttpPost]
        // [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        // public JsonResult SetDefaultLanguage([FromBody] SetDefaultLanguageRequest request)
        // {
        //     BaseResponseViewModel viewModel = new BaseResponseViewModel();
        //     try
        //     {
        //         Models.Data.User.SetDefaultLanguage(_dataContext, request.UserId, request.LanguageId);
        //     }
        //     catch (Exception ex)
        //     {
        //         viewModel.Result = Models.Enums.ResultEnum.Error;
        //         viewModel.ErrorMessage = ex.Message;
        //     }
        //     return new JsonResult(viewModel);
        // }

        [HttpPost]
        [Route("ChangePassword")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordRequest model)
        {
            await UserManager.EditUserPassword(_userManager, model.UserId, model.OldPassword, model.NewPassword);
            return Ok();
        }
    }
}