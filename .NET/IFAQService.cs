using Rumb.Models.Domain.FAQs;
using Rumb.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rumb.Services.Interfaces
{
    public interface IFAQService
    {
        int Add(FAQAddRequest request, int userId);
        void Delete(int id);
        FAQ GetById(int categoryId);
        List<FAQ> GetAll();
        void Update(FAQUpdateRequest request, int userId);
    }
}
