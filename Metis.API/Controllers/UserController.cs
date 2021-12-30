using System;
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
using Metis.Models.Store;
using Metis.Models.Requests;
using Metis.Models.Managers;
using Metis.Models;

namespace Metis.API.Controllers
{
    //[Authorize]
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

        // [HttpGet]
        // [AllowAnonymous]
        // public async Task<IActionResult> Login(string returnUrl = null)
        // {
        //     // Clear the existing external cookie to ensure a clean login process
        //     await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
        //     ViewData["ReturnUrl"] = returnUrl;
        //     return Ok();
        // }

        // [HttpPost]
        // [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> Login(LoginRequest model, string returnUrl = null)
        // {
        //     ViewData["ReturnUrl"] = returnUrl;
        //     if (ModelState.IsValid)
        //     {
        //         var user = _userManager.FindByEmailAsync(model.Email).Result;
        //         if ((user.IsActive.HasValue && !user.IsActive.Value) || !user.IsActive.HasValue)
        //         {
        //             ModelState.AddModelError("Error", "Invalid login attempt.");
        //             return View(model);
        //         }
        //         var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
        //         if (result.Succeeded)
        //         {
        //             return RedirectToLocal(returnUrl);
        //         }
        //         else
        //         {
        //             ModelState.AddModelError("Error", "Invalid login attempt.");
        //             return View(model);
        //         }
        //     }
        //     return View(model);
        // }

        // [HttpGet]
        // public async Task<IActionResult> LogOut()
        // {
        //     await _signInManager.SignOutAsync();
        //     return RedirectToAction(nameof(HomeController.Index), "Home");
        // }

        [HttpGet]
        [Route("GetRoles")]
        [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetRolesAsync()
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            var roles = RoleManager.GetRoles(_dataContext).Select(r => new { r.Id, r.Name });
            return Ok(roles);
        }

        [HttpGet]
        [Route("GetCurrentUsers")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUsersAsync()
        {
            var data = await _userManager.GetUserAsync(HttpContext.User);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetUsersAsync()
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            IEnumerable<User> users = UserManager.GetUsers(_userManager);         
            return Ok(users);
        }

        [HttpGet]
        [Route("GetUserById")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            User users = await UserManager.GetUserById(_userManager, id);         
            return Ok(users);
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("GetUsersByPage")]
        public async Task<IActionResult> GetUsersByPageAsync(int page, int itemsPerPage)
        {
            IEnumerable<User> users = await UserManager.GetUsersByPage(_dataContext, page, itemsPerPage);
            return Ok(users);
        }

        [HttpGet]
        [Route("GetUsersCount")]
        // [Authorize(Roles = "Country Admin,Administrator")]
        public async Task<IActionResult> GetUsersCountAsync()
        {
            // await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            int counter = UserManager.GetUsersCount(_userManager);         
            return Ok(counter);
        }

        [HttpPost]
        [Route("AddNewUser")]
        [Authorize(Roles = "Country Admin,Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddNewUserAsync(AddNewUserRequest model)
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });

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

        [HttpPost]
        [Route("EditUser")]
        [Authorize(Roles = "Country Admin,Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditUserAsync(EditUserRequest model)
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });

            var result = await UserManager.EditUser(_userManager, model.Id, model.FirstName, model.LastName, model.Email);
            if (!result.Succeeded)
            {
                var error = string.Join(",", result.Errors.Select(e => e.Description));
                throw new Exception(error);
            }

            var roles = RoleManager.GetRolesByUserId(_dataContext, model.Id).Select(r => r.Name);
            foreach (var role in roles)
            {
                result = await UserManager.RemoveUserFromRole(_userManager, model.Email, role);
                if (!result.Succeeded)
                {
                    var error = string.Join(",", result.Errors.Select(e => e.Description));
                    throw new Exception(error);
                }
            }

            result = await UserManager.AddUserToRole(_userManager, model.Email, model.Role);
            if (!result.Succeeded)
            {
                var error = string.Join(",", result.Errors.Select(e => e.Description));
                throw new Exception(error);
            }
            return Ok();
        }

        // [HttpPost]
        // [Authorize(Roles = "Country Admin,Administrator")]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> AddNewRole(AddNewRoleRequest model)
        // {
        //     var result = await Role.AddRole(_roleManager, model.Name, model.Description);
        //         if (!result.Succeeded)
        //         {
        //             var error = string.Join(",", result.Errors.Select(e => e.Description));
        //             throw new Exception(error);
        //         }
        //     return Ok();
        // }

        [HttpPost]
        [Route("DeleteUsers")]
        [Authorize(Roles = "Country Admin,Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteUsersAsync(DeleteUsersRequest model)
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
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

        [HttpPost]
        [Route("DisableUsers")]
        [Authorize(Roles = "Country Admin,Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DisableUsersAsync(DisableUsersRequest model)
        {
            await IsUserValidAsync(new string[] { "Country Admin", "Administrator" });
            for (int i = 0; i < model.Emails.Count(); i++)
            {
                await UserManager.DisableUser(_userManager, _dataContext, model.Emails[i]);
            }
            return Ok();
        }

        // [HttpPost]
        // [Authorize]
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
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordRequest model)
        {
            await UserManager.EditUserPassword(_userManager, model.UserId, model.OldPassword, model.NewPassword);
            return Ok();
        }



        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }
    }
}