using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models.Requests.EmailRequests;
using Sabio.Services.Email;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Microsoft.AspNetCore.Http;
using Sabio.Models.AppSettings;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
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
