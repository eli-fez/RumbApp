using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UsersRoleStatus : BaseUser
    {
        public string Email { get; set; }
        public bool isConfirmed { get; set; }
        public LookUp Status { get; set; }
        public LookUp Role { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
