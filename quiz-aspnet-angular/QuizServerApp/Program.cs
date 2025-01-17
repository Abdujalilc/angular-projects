using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QuizServerApp;
using System.Text;
using DotNetCore.AspNetCore;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

#region Add services to container
builder.Services.AddCors(o => o.AddPolicy("AllowOrigin", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

/*var connectionStringQuizDB = builder.Configuration.GetConnectionString("QuizDB");
var connectionStringUserDB = builder.Configuration.GetConnectionString("UserDB");
builder.Services.AddDbContext<QuizContext>(options => options.UseSqlServer(connectionStringQuizDB));
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(connectionStringUserDB));*/

string? connectionStringQuizDB = "Data Source=AppData\\QuizDB.db";
string? connectionStringUserDB = "Data Source=AppData\\UserDB.db";
builder.Services.AddSqlite<QuizContext>(connectionStringQuizDB);
builder.Services.AddSqlite<UserDbContext>(connectionStringUserDB);

builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<UserDbContext>();

SymmetricSecurityKey? signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.KEY_PHRASE));
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = signingKey,
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist";
});

WebApplication? app = builder.Build();
#endregion Add services to container

#region Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();

app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
});

app.Run();
#endregion Configure the HTTP request pipeline.