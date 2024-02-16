using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Rumb.Models.Requests.EmailRequests;
using Rumb.Services.Email;
using Rumb.Web.Controllers;
using Rumb.Web.Models.Responses;
using System;
using Microsoft.AspNetCore.Http;
using Rumb.Models.AppSettings;
using Microsoft.AspNetCore.Authorization;

namespace Rumb.Web.Api.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private IEmailService _service = null;
        private BrevoApi _appKeys;

        public EmailApiController(IEmailService service, IOptions<BrevoApi> appKeys, ILogger<EmailApiController> logger) : base(logger)
        {
            _service = service;
            _appKeys = appKeys.Value;
        }
