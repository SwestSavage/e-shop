using DBRepository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMvc(options => options.EnableEndpointRouting = false);

builder.Services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
builder.Services.AddScoped<IProductRepository>(
    provider => new ProductRepository(builder.Configuration.GetConnectionString("DefaultConnection"), 
    provider.GetService<IRepositoryContextFactory>()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();
app.UseMvc();

app.Run();
