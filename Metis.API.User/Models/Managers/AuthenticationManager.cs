using System;
using System.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Metis.Models.Store;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

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
                    ValidateLifetime = true,
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
                new Claim("username", user.Email),
                new Claim(JwtRegisteredClaimNames.Aud, _jwtOptions.Audience),
                new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var role = await _dataContext.Roles.Find(r => r.Id == user.RoleId).FirstOrDefaultAsync();
            if (role != null)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }
            return claims;
        }
    }
}
