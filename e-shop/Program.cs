using DBRepository;
using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

//var host = BuildWebHost(args);

//static IWebHost BuildWebHost(string[] args) =>
//    WebHost.CreateDefaultBuilder(args).Build();


builder.Services.AddMvc(options => options.EnableEndpointRouting = false);

builder.Services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
builder.Services.AddScoped<IProductRepository>(
    provider => new ProductRepository(builder.Configuration.GetConnectionString("DefaultConnection"), 
    provider.GetService<IRepositoryContextFactory>()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseWebpackDevMiddleware();
}

app.UseStaticFiles();
app.UseMvc(routes =>
{
    routes.MapRoute(name: "DefaultApi", template: "api/{controller}/{action}");
    routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
});

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var factory = services.GetRequiredService<IRepositoryContextFactory>();

    factory.CreateDbContext(config.GetConnectionString("DefaultConnection")).Database.Migrate();
}

app.Run();
