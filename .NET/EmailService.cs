using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Task = System.Threading.Tasks.Task;
using Microsoft.AspNetCore.Routing.Template;
using Rumb.Models.AppSettings;
using Rumb.Models.Domain;
using Rumb.Models.Requests;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using Rumb.Models.Requests.EmailRequests;
using Microsoft.Extensions.Hosting;
using Rumb.Models.Requests.Users;
using Rumb.Models.Domain.Users;
namespace Rumb.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly BrevoApi _brevo;
        private readonly AppKeys _appKeys;
        public EmailService(IWebHostEnvironment environment, IOptions<BrevoApi> brevo, IOptions<AppKeys> appKeys)
        {
            _environment = environment;
            _appKeys = appKeys.Value;
            _brevo = brevo.Value;
        }
 public async Task ApproveBusinessEmail(string receiverName, string receiverEmail)
 {
     try
     {
         SendSmtpEmailSender Email = new SendSmtpEmailSender(_brevo.SenderName, _brevo.SenderEmail);
         string ToEmail = receiverEmail;
         string ToName = receiverName;
         SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(ToEmail, ToName);
         List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
         To.Add(smtpEmailTo);

         var sendSmtpEmail = new SendSmtpEmail(Email, To)
         {
             Subject = $"Thank you {receiverName}, your business is now approved!",
             TextContent = LoadHtmlTemplate("businessApproval.html")
         };
         await SendEmailAsync(sendSmtpEmail);
     }
     catch
     {
         throw new Exception(" Failed to send email, please try again ");
     }
 }
 public async Task BusinessAccountRequest(UserAddRequest model, string tokenId)
 {
     try
     {
         SendSmtpEmailSender Email = new SendSmtpEmailSender(_brevo.SenderName, _brevo.SenderEmail);
         SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo();
         List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
         To.Add(smtpEmailTo);

         var sendSmtpEmail = new SendSmtpEmail(Email, To)
         {
             Subject = $"{model.FirstName}, is trying to register their business.",
             TextContent = LoadHtmlTemplateBusinessConfirm("businessConfirmation.html", model.FirstName, tokenId)
         };
         await SendEmailAsync(sendSmtpEmail);
     }
     catch
     {
         throw new Exception(" Failed to register, please try again ");
     }
 }
 public async Task RejectBusinessEmail(string recieverName, string recieverEmail)
 {
     try
     {
         SendSmtpEmailSender Email = new SendSmtpEmailSender(_brevo.SenderName, _brevo.SenderEmail);
         string ToEmail = recieverEmail;
         string ToName = recieverName;
         SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(ToEmail, ToName);
         List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
         To.Add(smtpEmailTo);

         var sendSmtpEmail = new SendSmtpEmail(Email, To)
         {
             Subject = $"Thank you {recieverName} for your business request",
             TextContent = LoadHtmlTemplate("businessRejection.html")
         };
         await SendEmailAsync(sendSmtpEmail);
     }
     catch
     {
         throw new Exception(" Failed to send request, please try again ");
     }
 }
 private string LoadHtmlTemplateBusinessConfirm(string templateFileName, string firstName = null, string tokenId = null)
 {
     try
     {
         string templatePath = Path.Combine(_environment.WebRootPath, "EmailTemplates", templateFileName);
         if (File.Exists(templatePath))
         {
             if (tokenId != null)
             {
                 string customLink = $"{_appKeys.DomainUrl}/business/confirmation";
                 string customScript = File.ReadAllText(templatePath).Replace("Confirm-Link-Insert", customLink).Replace("Business-Name", firstName);

                 return customScript;
             }
             else
             {
                 throw new Exception("authentication token could not be found");
             }

         }
         else
         {
             throw new Exception("Email failed, resubmit request");
         }
     }
     catch
     {
         throw new Exception("An error occurred while processing the business account request for user.");

     }
 }
 public async Task ContactUsConfirm(EmailAddRequest model)
 {
     SendSmtpEmailSender Email = new SendSmtpEmailSender(_brevo.SenderName, _brevo.SenderEmail);
     string ToEmail = model.RecieverEmail;
     string ToName = model.RecieverName;
     SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(ToEmail, ToName);
     List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
     To.Add(smtpEmailTo);

     var sendSmtpEmail = new SendSmtpEmail(Email, To)
     {
         Subject = $"Thank you {model.RecieverName}, for contacting us!",
         TextContent = LoadHtmlTemplate("contactUsTemplate.html")
     };
     await SendEmailAsync(sendSmtpEmail);
 }
  public async Task ContactUsAdmin(EmailAddRequest model)
  {
      SendSmtpEmailSender Email = new SendSmtpEmailSender(model.RecieverName, model.RecieverEmail);
      string ToEmail = _brevo.SenderEmail;
      string ToName = _brevo.SenderName;
      SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(ToEmail, ToName);
      List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
      To.Add(smtpEmailTo);

      var sendSmtpEmail = new SendSmtpEmail(Email, To)
      {
          Subject = $"{model.RecieverName}, is trying to contact us",
          TextContent = $"{model.RecieverName} said {model.Message}",
      };
      await SendEmailAsync(sendSmtpEmail);
  }
 private string LoadHtmlTemplate(string templateFileName, string businessName = null, string firstName = null, string tokenId = null)
 {
     try
     {
         string templatePath = Path.Combine(_environment.WebRootPath, "EmailTemplates", templateFileName);
         if (File.Exists(templatePath))
         {
             if (tokenId != null)
             {
                 string customLink = $"{_appKeys.DomainUrl}/confirmuser?tokenId={tokenId}";
                 string customScript = File.ReadAllText(templatePath).Replace("Confirm-Link-Insert", customLink).Replace("Users-First-Name", firstName);

                 return customScript;
             }
             else if (businessName != null)
             {
                 return File.ReadAllText(templatePath).Replace("Business-Name", businessName);
             }
             else { return File.ReadAllText(templatePath); }
         }
         else
         {
             return string.Empty;
         }
     }
     catch (Exception ex)
     {
         return ex.Message;
     }
   private async Task SendEmailAsync(SendSmtpEmail email)
     {
     Configuration.Default.ApiKey["api-key"] = _brevo.ApiKey;
     var apiInstance = new TransactionalEmailsApi();
     CreateSmtpEmail result = await apiInstance.SendTransacEmailAsync(email);
     }
   }
 }
