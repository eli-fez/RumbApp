using Microsoft.AspNetCore.Mvc.Razor;
using Rumb.Data;
using Rumb.Data.Providers;
using Rumb.Models;
using Rumb.Models.Domain;
using Rumb.Models.Domain.Users;
using Rumb.Models.Requests.EmailRequests;
using Rumb.Models.Requests.Users;
using Rumb.Services.Email;
using Rumb.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Rumb.Services
{
public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;
        private IEmailService _emailService;
        private ILookUpService _lookUpService;


        public UserService(IAuthenticationService<int> authService, IDataProvider dataProvider, IEmailService emailService, ILookUpService lookUpService)
        {
            _authenticationService = authService;
            _dataProvider = dataProvider;
            _emailService = emailService;
            _lookUpService = lookUpService;
        }
 public async Task ConfirmBusinessAsync(int userId, string firstName, string email)
 {
     if (userId != 0)
     {
         int statusId = 1;

         await _emailService.ApproveBusinessEmail(firstName, email);
         UpdateIsConfirmed(userId);
         UpdateUserStatus(userId, statusId);
     }
     else
     {
         throw new Exception("Business approval fialed, please try again or Refresh page.");
     }
 }
 public async Task RejectBusinessAsync(int userId, string firstName, string email)
 {
     if (userId != 0)
     {
         int statusId = 5;

         await _emailService.RejectBusinessEmail(firstName, email);

         UpdateUserStatus(userId, statusId);
     }
     else
     {
         throw new Exception("Rejected business has failed please try again or request a new link.");
     }
 }
public void UpdateIsConfirmed(int userId)
 {
     _dataProvider.ExecuteNonQuery(
     storedProc: "[dbo].[Users_Confirm]"
     , inputParamMapper: paramCollection =>
     {
         paramCollection.AddWithValue("@Id", userId);
     }
     , returnParameters: null);
 }
public void UpdateUserStatus(int id, int statusId)
 {
     _dataProvider.ExecuteNonQuery(
         storedProc: "[dbo].[Users_UpdateStatus]"
         , inputParamMapper: paramCollection =>
         {
             paramCollection.AddWithValue("@StatusId", statusId);
             paramCollection.AddWithValue("@Id", id);
         }
         , returnParameters: null);
 }
private UsersRoleStatus MapSingleRoleStatusId(IDataReader reader, ref int startingIndex)
    {
        UsersRoleStatus userRole = new UsersRoleStatus();
        userRole.Id = reader.GetSafeInt32(startingIndex++);
        userRole.FirstName = reader.GetSafeString(startingIndex++);
        userRole.Email = reader.GetSafeString(startingIndex++);
        userRole.Status = new LookUp();
        userRole.Status = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
        userRole.Role = new LookUp();
        userRole.Role = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
        userRole.DateCreated = reader.GetDateTime(startingIndex++);
        userRole.DateModified = reader.GetDateTime(startingIndex++);
        return userRole;
    }
 public Paged<User> GetAllPaginated(int pageIndex, int pageSize)
 {
     Paged<User> pagedList = null;
     List<User> list = null;
     int totalCount = 0;
     _dataProvider.ExecuteCmd("[dbo].[Users_SelectAll]", delegate(SqlParameterCollection col)
     {
         col.AddWithValue("@PageIndex", pageIndex);
         col.AddWithValue("@PageSize", pageSize);
     }, delegate (IDataReader reader, short set) 
     {
         User user = MapSingleUser(reader);
         

         if(list == null)
         {
             list = new List<User>();
         }
         list.Add(user);
         if (set == 0)
         {

             totalCount = reader.GetSafeInt32(reader.FieldCount - 1);
         }
     });
     if (list != null)
     {
         pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
     }
     return pagedList;
 }
public List<UsersRoleStatus> GetByRoleAndStatusId(int Status, int Role)
{
    List<UsersRoleStatus> usersRole = new();
    _dataProvider.ExecuteCmd("dbo.Users_SelectByRoleId_StatusId", delegate (SqlParameterCollection col)
    {
        col.AddWithValue("@RoleId", Role);
        col.AddWithValue("@StatusId", Status);
    }, delegate (IDataReader reader, short set)
    {

        int startingIndex = 0;
        usersRole.Add(MapSingleRoleStatusId(reader, ref startingIndex));

    });
    return usersRole;
}
}
