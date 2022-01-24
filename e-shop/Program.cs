using DBRepository;
using DBRepository.Interfaces;
using e_shop.Services.Interfaces;
using e_shop.Services.Implementations;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

builder.Services.AddMvc(options => options.EnableEndpointRouting = false);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = "ValidIssuer",
            ValidAudience = "ValidAudience",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("IssuerSigningSecretKey")),
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();

builder.Services.AddScoped<IProductRepository>(
    provider => new ProductRepository(builder.Configuration.GetConnectionString("DefaultConnection"), 
    provider.GetService<IRepositoryContextFactory>()));

builder.Services.AddScoped<IUserRepository>(
    provider => new UserRepository(builder.Configuration.GetConnectionString("DefaultConnection"),
    provider.GetService<IRepositoryContextFactory>()));

builder.Services.AddScoped<IOrderRepository>(
    provider => new OrderRepository(builder.Configuration.GetConnectionString("DefaultConnection"),
    provider.GetService<IRepositoryContextFactory>()));

builder.Services.AddScoped<IIdentityService, IdentityService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseWebpackDevMiddleware();
}

app.UseHsts();

app.UseStaticFiles();
app.UseAuthentication();

app.UseMvc(routes =>
{
    routes.MapRoute(name: "DefaultApi", template: "api/{controller}/{action}");
    routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
});

app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var factory = services.GetRequiredService<IRepositoryContextFactory>();

    factory.CreateDbContext(config.GetConnectionString("DefaultConnection")).Database.Migrate();
}

app.Run();
