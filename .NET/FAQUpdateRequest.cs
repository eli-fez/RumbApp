using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Models.Requests
{
    public class FAQUpdateRequest : FAQAddRequest, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
