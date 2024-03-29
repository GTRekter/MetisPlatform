using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;

namespace Metis.API.Models
{
    public class JwtOptions
    {
        public bool ValidateIssuerSigningKey { get; set; }
        public string IssuerSigningKey { get; set; }
        public bool ValidateIssuer { get; set; }
        public string Issuer { get; set; }
        public bool ValidateAudience { get; set; }
        public string Audience { get; set; }
        public bool SaveToken { get; set; }
        public int ExpirationMinutes { get; set; }
    }
}
