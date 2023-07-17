using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Metis.API
{
    public class Program
    {
        protected static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
        protected static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });          
    }
}
