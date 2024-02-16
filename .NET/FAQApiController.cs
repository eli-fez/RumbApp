using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Rumb.Models;
using Rumb.Services;
using Rumb.Web.Controllers;
using Rumb.Web.Models.Responses;
using System.Collections.Generic;
using System.Data.SqlClient;
using System;
using v.Models.Domain.FAQs;
using Rumb.Models.Requests.Example;
using Rumb.Services.Interfaces;
using Rumb.Models.Requests;
using SendGrid;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using Microsoft.AspNetCore.Authorization;

namespace Rumb.Web.Api.Controllers

{
    [ApiController]
    [Route("api/faqs")]
    public class FAQApiController : BaseApiController
    {
        private IFAQService _service = null;
        private IAuthenticationService<int> _authService = null;
        public FAQApiController(IFAQService service, 
            IAuthenticationService<int> authService, 
            ILogger<FAQApiController> logger) : base(logger)
        {
            _service = service;

            _authService = authService;
        }
  [HttpGet]
[AllowAnonymous]
public ActionResult<ItemsResponse<FAQ>> GetAll()
{
    int code = 200;
    BaseResponse response = null;
    try
    {
        List<FAQ> list = _service.GetAll();
        if (list == null)
        {
            code = 404;
            response = new ErrorResponse("App resource not found");
        }
        else
        {
            response = new ItemsResponse<FAQ> { Items = list };
        }
    }
    catch (Exception ex)
    {
        code = 500;
        response = new ErrorResponse(ex.Message);
        Logger.LogError(ex, ex.Message);
    }
    return StatusCode(code, response);
}
[HttpGet("{categoryId:int}")]
public ActionResult<ItemResponse<FAQ>> GetById(int categoryId)
{
    int iCode = 200;
    BaseResponse response = null;
    try
    {
        FAQ faq = _service.GetById(categoryId);
        if (faq == null)
        {
            iCode = 404;
            response = new ErrorResponse("Application resource not found");
        }
        else
        {
            response = new ItemResponse<FAQ> { Item = faq };
        }
    }
    
    catch (Exception ex)
    {
        iCode = 500;
        Logger.LogError(ex, ex.Message);
        response = new ErrorResponse($"Generic Error: {ex.Message}");
    }
    return StatusCode(iCode, response);
}
[HttpPost]
public ActionResult<ItemResponse<int>> Add(FAQAddRequest request)
{
    ObjectResult result = null;

    try
    {
        int userId = _authService.GetCurrentUserId();
        int id = _service.Add(request, userId);
        ItemResponse<int> response = new ItemResponse<int>() { Item = id };

        result = Created201(response);
    }
    catch (Exception ex)
    {
        Logger.LogError(ex, ex.Message);
        ErrorResponse response = new ErrorResponse(ex.Message);

        result = StatusCode(500, response);
    }

    return result;
}    
 [HttpDelete("{id:int}")]
 public ActionResult<SuccessResponse> Delete(int id)
 {
     int code = 200;
     BaseResponse response = null;
     try
     {
         _service.Delete(id);
         response = new SuccessResponse();
     }
     catch (Exception ex)
     {
         code = 500;
         response = new ErrorResponse(ex.Message);
     }
     return StatusCode(code, response);
 }
 [HttpPut("{id:int}")]
 public ActionResult<int> Update(FAQUpdateRequest request)
 {
     int code = 200;
     BaseResponse response = null;

     try
     {
         var userId = _authService.GetCurrentUserId();
         _service.Update(request, userId);

         response = new SuccessResponse();
     }
     catch (Exception ex)
     {
         code = 500;
         response = new ErrorResponse(ex.Message);
     }

     return StatusCode(code, response);
 }
}
