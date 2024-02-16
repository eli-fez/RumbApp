using Rumb.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Models.Requests
{
    public class FAQAddRequest
    {
        
        [MaxLength(255)]
        public string Question { get; set; }
        
        [MaxLength(2000)]
        public string Answer { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
        
        public int SortOrder { get; set; }
    }

}
