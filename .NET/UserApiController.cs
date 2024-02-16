using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Rumb.Models;
using Rumb.Models.Domain.Users;
using Rumb.Models.Requests.Users;
using Rumb.Services;
using Rumb.Web.Controllers;
using Rumb.Web.Core;
using Rumb.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rumb.Web.Api.Controllers.Users
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
