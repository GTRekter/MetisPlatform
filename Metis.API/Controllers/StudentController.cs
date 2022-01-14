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
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Metis.API.Controllers
{
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class StudentController : BaseController
    {
        private readonly IConfiguration _configuration;
        public StudentController(ApplicationDbContext dataContext, IConfiguration configuration)
            : base(dataContext)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("AddStudent")]
        public async Task<IActionResult> AddStudentAsync(AddStudentRequest model)
        {
            int passwordlength = int.Parse(_configuration["Identity:AutoGeneratedPasswordLength"]);
            int numberOfNonAlphanumericCharacters = new Random().Next(1, passwordlength - 1);
            string password = Password.Generate(passwordlength, numberOfNonAlphanumericCharacters);

            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            await UserManager.AddUserAsync(_dataContext, model.FirstName, model.LastName, model.Email, model.Enabled, role.Id, model.LanguageId, password, model.Lessons.Select(d => d.Id));

            var apiKey = _configuration["SendGrid:Key"];
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress("ivan.porta.web@gmail.com", "Ivan Porta"));
            msg.AddTo(new EmailAddress(model.Email, $"{model.FirstName} {model.LastName}"));
            msg.SetTemplateId("d-91d610861edb4a2cb48075c7f9c2b9fd");
            var dynamicTemplateData = new 
            {
                FirstName = model.FirstName,
                Password = password
            };
            msg.SetTemplateData(dynamicTemplateData);
            await client.SendEmailAsync(msg);

            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("EditStudent")]
        public async Task<IActionResult> EditStudentAsync(EditStudentRequest model)
        {   
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            User user = await UserManager.GetUserByEmailAsync(_dataContext, model.Email);
            if(user == null)
            {
                return NotFound();
            }
            if(user.RoleId != role.Id)
            {
                return BadRequest();
            }
            await UserManager.EditUserAsync(_dataContext, model.Id, model.FirstName, model.LastName, model.Email, model.Enabled, model.LanguageId, model.Lessons.Select(d => d.Id));
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetStudents")]
        public async Task<IActionResult> GetStudentsAsync()
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            IEnumerable<User> users = await UserManager.GetUsersAsync(_dataContext, role.Id);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetStudentById")]
        public async Task<IActionResult> GetStudentByIdAsync(int id)
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            User user = await UserManager.GetUserByIdAsync(_dataContext, id);
            if(user == null)
            {
                return NotFound();
            }
            if(user.RoleId != role.Id)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetStudentsByPage")]
        public async Task<IActionResult> GetStudentsByPageAsync(int page, int itemsPerPage)
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            IEnumerable<User> users = await UserManager.GetUsersByPageAsync(_dataContext, role.Id, page, itemsPerPage);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetStudentsByPageAndSearchQuery")]
        public async Task<IActionResult> GetStudentsByPageAndSearchQueryAsync(int page, int itemsPerPage, string searchQuery)
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            IEnumerable<User> users = await UserManager.GetUsersByPageAsync(_dataContext, role.Id, page, itemsPerPage, searchQuery);
            return Ok(users);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetStudentsCount")]
        public async Task<IActionResult> GetStudentsCountAsync()
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            int counter = await UserManager.GetUsersCountAsync(_dataContext, role.Id);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        [Route("GetActiveStudentsCount")]
        public async Task<IActionResult> GetActiveStudentsCountAsync()
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            int counter = await UserManager.GetActiveUsersCountAsync(_dataContext, role.Id);
            return Ok(counter);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        [Route("GetStudentsBySearchQueryCount")]
        public async Task<IActionResult> GetStudentsBySearchQueryCountAsync(string searchQuery)
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            int counter = await UserManager.GetUsersCountAsync(_dataContext, role.Id, searchQuery);
            return Ok(counter);
        }

        [HttpDelete]
        [Route("DeleteStudentById")]
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator, Teacher")]
        public async Task<IActionResult> DeleteStudentByIdAsync(int id)
        {
            Role role = await RoleManager.GetRoleByNameAsync(_dataContext, "Student");
            User user = await UserManager.GetUserByIdAsync(_dataContext, id);
            if(user == null)
            {
                return NotFound();
            }
            if(user.RoleId != role.Id)
            {
                return BadRequest();
            }
            await UserManager.DeleteUserByIdAsync(_dataContext, id);
            return Ok();
        }
    }
}