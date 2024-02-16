using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Models.Domain.Users
{
    public class User : BaseUser
    {
        public string Email { get; set; }
        public bool isConfirmed { get; set; }  
        public string Status { get; set; }
        public string Role { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
