using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using QuizServerApp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace VirtualDars.Quiz.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public UserManager<IdentityUser> _userManager { get; set; }
        public SignInManager<IdentityUser> _signInManager { get; set; }

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Models.Credentials credentials)
        {
            IdentityUser? user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };

            IdentityResult? result = await _userManager.CreateAsync(user, credentials.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _signInManager.SignInAsync(user, false);
            return Ok(CreateToken(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.Credentials credentials)
        {
            SignInResult? result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, false, false);
            if (!result.Succeeded)
            {
                return BadRequest();
            }

            IdentityUser? user = await _userManager.FindByEmailAsync(credentials.Email);
            return Ok(CreateToken(user));
        }

        private string CreateToken(IdentityUser user)
        {
            SymmetricSecurityKey? signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constants.KEY_PHRASE));
            SigningCredentials? signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            Claim[]? claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };
            JwtHeader? header = new JwtHeader(signingCredentials);
            JwtPayload? payLoad = new JwtPayload(claims);
            JwtSecurityToken? jwt = new JwtSecurityToken(header, payLoad);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

    }
}