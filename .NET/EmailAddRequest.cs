using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Models.Requests.EmailRequests
{
    public class EmailAddRequest
    {
        public string Subject { get; set; }
        public string Message { get; set; }
        public string RecieverEmail { get; set; }
        public string RecieverName { get; set; }
    }
}
