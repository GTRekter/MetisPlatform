using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.OpenApi.Models;
using Metis.Models.Store;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace Metis.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Metis.API"));
            });
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 6;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            // services.ConfigureApplicationCookie(options =>
            // {
            //     options.Cookie.HttpOnly = true;
            //     options.Cookie.Expiration = TimeSpan.FromDays(150);
            //     options.LoginPath = "/Account/Login";
            //     options.LogoutPath = "/Account/Logout";
            //     options.AccessDeniedPath = "/Account/AccessDenied";
            //     options.SlidingExpiration = true;
            // });

            // services.AddAntiforgery(options =>
            // {
            //     // Antiforgety settings
            //     options.HeaderName = "X-CSRF-TOKEN";
            // });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer((options) =>
            {
                options.Authority = Configuration["jwt:Authority"];
                options.Audience = Configuration["jwt:Audience"];
                options.Events = new JwtBearerEvents()
                {
                    OnChallenge = (context) =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";
                        if (string.IsNullOrEmpty(context.Error))
                        {
                            context.Error = "invalid_token";
                        }
                        if (string.IsNullOrEmpty(context.ErrorDescription))
                        {
                            context.ErrorDescription = "This request requires a valid JWT access token to be provided";
                        }
                        if (context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            var authenticationException = context.AuthenticateFailure as SecurityTokenExpiredException;
                            context.Response.Headers.Add("x-token-expired", authenticationException.Expires.ToString("o"));
                            context.ErrorDescription = $"The token expired on {authenticationException.Expires.ToString("o")}";
                        }
                        return context.Response.WriteAsync(JsonSerializer.Serialize(new
                        {
                            error = context.Error,
                            error_description = context.ErrorDescription
                        }));
                    }
                };
            });

            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new RequestCulture("en-US");
                options.SupportedCultures = new List<CultureInfo> { new CultureInfo("ko-KR") };
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Metis.API", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Metis.API v1"));
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
