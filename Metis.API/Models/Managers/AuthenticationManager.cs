using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Metis.Models.Store;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Metis.Models.Managers
{
    public class AuthenticationManager
    {
        private readonly JwtOptions _jwtOptions;
        private readonly ApplicationDbContext _dataContext;
        public AuthenticationManager(JwtOptions jwtOptions, ApplicationDbContext dataContext)
        {
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
        public int? ValidateToken(string token)
        {
            if (token == null)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtOptions.IssuerSigningKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                return userId;
            }
            catch
            {
                return null;
            }
        }
        private async Task<IEnumerable<Claim>> GetUserValidClaims(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, _jwtOptions.Audience),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var userRoles = await _dataContext.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == user.Id);
            if (userRoles.Role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRoles.Role.Name));
            }
            return claims;
        }
    }
}