using Architecture.Database;
using Architecture.Domain;
using Architecture.Model;
using DotNetCore.Extensions;
using DotNetCore.Results;
using DotNetCore.Security;
using DotNetCore.Validation;
using System.Security.Claims;

namespace Architecture.Application;

public sealed class AuthService : IAuthService
{
    private readonly IAuthFactory _authFactory;
    private readonly IAuthRepository _authRepository;
    private readonly IHashService _hashService;
    private readonly IJwtService _jwtService;

    public AuthService(IAuthFactory authFactory, IAuthRepository authRepository, IHashService hashService, IJwtService jwtService)
    {
        _authFactory = authFactory;
        _authRepository = authRepository;
        _hashService = hashService;
        _jwtService = jwtService;
    }

    public async Task<IResult<Auth>> AddAsync(AuthModel model)
    {
        IResult validation = new AuthModelValidator().Validation(model);

        if (validation.Failed)
        {
            return validation.Fail<Auth>();
        }

        if (await _authRepository.AnyByLoginAsync(model.Login))
        {
            return Result<Auth>.Fail("Login exists!");
        }

        Auth auth = _authFactory.Create(model);

        string password = _hashService.Create(auth.Password, auth.Salt);

        auth.UpdatePassword(password);

        await _authRepository.AddAsync(auth);

        return auth.Success();
    }

    public async Task DeleteAsync(long id)
    {
        await _authRepository.DeleteAsync(id);
    }

    public async Task<IResult<TokenModel>> SignInAsync(SignInModel model)
    {
        IResult<TokenModel> failResult = Result<TokenModel>.Fail("Invalid login or password!");

        IResult validation = new SignInModelValidator().Validation(model);

        if (validation.Failed)
        {
            return failResult;
        }

        Auth auth = await _authRepository.GetByLoginAsync(model.Login);

        if (auth is null)
        {
            return failResult;
        }

        string password = _hashService.Create(model.Password, auth.Salt);

        if (auth.Password != password)
        {
            return failResult;
        }

        return CreateToken(auth);
    }

    private IResult<TokenModel> CreateToken(Auth auth)
    {
        List<Claim> claims = new List<Claim>();

        claims.AddSub(auth.Id.ToString());

        claims.AddRoles(auth.Roles.ToArray());

        string token = _jwtService.Encode(claims);

        return new TokenModel(token).Success();
    }
}
