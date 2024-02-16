using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Core;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers.Users
{
    [Route("api/users")]
    [ApiController]
    public class UsersApiController : BaseApiController
    {
        private IUserService _userService = null;
        private IAuthenticationService<int> _authenticationService;
        IOptions<SecurityConfig> _options;

        public UsersApiController(IAuthenticationService<int> authService, IUserService userService, ILogger<UsersApiController> logger, IOptions<SecurityConfig> options) : base(logger)
        {
            _authenticationService = authService;
            _userService = userService;
            _options = options;
        }
