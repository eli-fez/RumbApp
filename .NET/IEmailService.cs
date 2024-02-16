using Rumb.Models;
using Rumb.Models.Domain.Users;
using Rumb.Models.Requests.EmailRequests;
using Rumb.Models.Requests.InviteMembers;
using Rumb.Models.Requests.Users;
using System.Threading.Tasks;

namespace Rumb.Services.Email
{
    public interface IEmailService
    {
        Task ContactUsConfirm(EmailAddRequest model);
        Task BusinessAccountRequest(UserAddRequest userModel, string token);
        Task ApproveBusinessEmail(string firstName, string email);
        Task RejectBusinessEmail(string firstName, string email);
    }
}  
