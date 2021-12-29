using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
// using Newtonsoft.Json;
using Metis.Models;
using Metis.Models.Store;

namespace Metis.Middleware
{
    public class MetisMiddleware
    {
        private readonly RequestDelegate _next;
        #region Constructor
        public MetisMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        #endregion
        #region Public Methods
        public async Task InvokeAsync(HttpContext httpContext, ApplicationDbContext dataContext, UserManager<User> userManager, IAntiforgery antiforgery)
        {
            // Anti Forgety Token
            SetAntiForgeryTokenCookie(httpContext, antiforgery);

            // Logging Request
            string parameters = string.Empty;
            var currentUser = await userManager.GetUserAsync(httpContext.User);
            // string action = httpContext.Request.RouteValues["Action"]?.ToString();
            // if (currentUser != null && action != null)
            // {
            //     parameters = await GetRequestParameters(httpContext.Request);
            //     LogTable.Write(dataContext, currentUser.Id, null, null, action, parameters);
            // }

            // Move forward into the pipeline
            await _next(httpContext);

            // TODO:  Logging Response
            //parameters = await GetResponseParameters(httpContext.Response);
            //LogTable.Write(dataContext, currentUser.Id, null, null, action, parameters);
        }
        private void SetAntiForgeryTokenCookie(HttpContext httpContext, IAntiforgery antiforgery)
        {
            var tokens = antiforgery.GetAndStoreTokens(httpContext);
            httpContext.Response.Cookies.Append("CSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
        }
        // private async Task<string> GetRequestParameters(HttpRequest request)
        // {
        //     string parameters = null;
        //     if (request.Method == "POST")
        //     {
        //         request.EnableBuffering();

        //         Dictionary<string, object> values = await GetInputsFromStream(request.Body, request.ContentLength);
        //         parameters = string.Join(", ", values.Select(p => $"{p.Key}: {p.Value}").ToArray());
        //     }
        //     else
        //     {
        //         parameters = string.Join(",", request.Query.Select(p => $"{p.Key}:{p.Value}").ToArray());
        //     }
        //     return parameters;
        // }
        // private async Task<string> GetResponseParameters(HttpResponse response)
        // {
        //     if(response.ContentLength != null)
        //     {
        //         Dictionary<string, object> values = await GetInputsFromStream(response.Body, response.ContentLength);
        //         return string.Join(", ", values.Select(p => $"{p.Key}: {p.Value}").ToArray());
        //     }
        //     return "Web page loaded";
        // }
        // private async Task<Dictionary<string, object>> GetInputsFromStream(Stream stream, long? contentLength)
        // {
        //     stream.Seek(0, SeekOrigin.Begin);

        //     var buffer = new byte[Convert.ToInt32(contentLength)];
        //     await stream.ReadAsync(buffer, 0, buffer.Length);
        //     var bodyAsText = Encoding.UTF8.GetString(buffer);

        //     stream.Seek(0, SeekOrigin.Begin);

        //     return JsonConvert.DeserializeObject<Dictionary<string, object>>(bodyAsText);
        // }
        #endregion
    }
    public static class MetisMiddlewareExtensions
    {
        public static IApplicationBuilder UseMetisMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<MetisMiddleware>();
        }
    }
}