using Microsoft.EntityFrameworkCore;
using target_teste.Data;
using target_teste.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddScoped<ILancamentoService, LancamentoService>();


builder.Services.AddDbContext<TargetTesteDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "TargetTeste",
    policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
));

//builder.Services.AddDbContext(options => options.use)

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("TargetTeste");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
