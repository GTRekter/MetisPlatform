using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Metis.Models.Store;
using System.Threading.Tasks;
using System.Text;

namespace Metis.Models.Managers
{
    public class AuthenticationManager
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly JwtOptions _jwtOptions;
        private readonly ApplicationDbContext _dataContext;
        public AuthenticationManager(UserManager<User> userManager, RoleManager<Role> roleManager, JwtOptions jwtOptions, ApplicationDbContext dataContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtOptions = jwtOptions;
            _dataContext = dataContext;
        }
        public async Task<string> GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = await GetUserValidClaims(user);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtOptions.IssuerSigningKey)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenDescription = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(tokenDescription); 
        }
        private async Task AddClaimToUser(string email, string claimName, string value)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var userClaim = new Claim(claimName, value);
            if (user != null)
            {
                var result = await _userManager.AddClaimAsync(user, userClaim);
                if (!result.Succeeded)
                {
                    throw new Exception("Could not add claim to user");
                }
            }
        }
        private async Task<IEnumerable<Claim>> GetAllClaimsByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return await _userManager.GetClaimsAsync(user);
        }
        private async Task<IEnumerable<Claim>> GetUserValidClaims(User user)
        {
            IdentityOptions _options = new IdentityOptions();
            var claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, _jwtOptions.Audience),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);
            claims.AddRange(userClaims);
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));
                // var role = await _roleManager.FindByNameAsync(userRole);
                // if (role != null)
                // {
                //     var roleClaims = await _roleManager.GetClaimsAsync(role);
                //     foreach (Claim roleClaim in roleClaims)
                //     {
                //         claims.Add(roleClaim);
                //     }
                // }
            }
            return claims;
        }

    }
}
