using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Models.Domain.FAQs
{
    public class FAQ
    {
        public int Id {get; set;}
        public string Question {get; set; }
        public string Answer {get; set; }
        public int CategoryId {get; set; }
        public int SortOrder {get; set; }
        public DateTime DateCreated {get; set; }
        public DateTime DateModified {get; set; }
   
        public LookUp FAQCategory { get; set; }

    }
}
