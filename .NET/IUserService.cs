using Rumb.Models;
using Rumb.Models.Domain.Users;
using Rumb.Models.Requests.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Rumb.Services
{
    public interface IUserService
  {
 void UpdateUserStatus(int id, int statusId);
 void UpdateIsConfirmed(int userId);
 List<UsersRoleStatus> GetByRoleAndStatusId(int statusId, int roleId);
 Task ConfirmBusinessAsync(int userId, string firstName, string email);
 Task RejectBusinessAsync(int userId, string firstName, string email);

  }

}
