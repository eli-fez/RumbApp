using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.FAQs;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class FAQService : IFAQService
    {
        IDataProvider _data = null;
        ILookUpService _lookUp = null;
        public FAQService(IDataProvider data, ILookUpService lookUp)
        {
            _data = data;
            _lookUp = lookUp;
        }

        private FAQ MapSingleFAQ(IDataReader reader)
        {
            FAQ aFAQ = new FAQ();
            int startingIndex = 0;
            aFAQ.Id = reader.GetSafeInt32(startingIndex++);
            aFAQ.Question = reader.GetSafeString(startingIndex++);
            aFAQ.Answer = reader.GetSafeString(startingIndex++);
            aFAQ.FAQCategory = new LookUp();
            aFAQ.FAQCategory.Id = reader.GetSafeInt32(startingIndex++);
            aFAQ.FAQCategory.Name = reader.GetSafeString(startingIndex++);
            aFAQ.SortOrder = reader.GetSafeInt32(startingIndex++);
            aFAQ.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFAQ.DateModified = reader.GetSafeDateTime(startingIndex++);
           
            return aFAQ;
        }


        public int Add(FAQAddRequest request, int userId)
        {
            int id = 0;
            string procName = "[dbo].[FAQs_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(request, collection);
                    collection.AddWithValue("@CreatedBy", userId);
                    collection.AddWithValue("@ModifiedBy", userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection retunCollection)
                {
                    object objectId = retunCollection["@Id"].Value;
                    int.TryParse(objectId.ToString(), out id);
                });
            return id;
        }
        public void Update(FAQUpdateRequest request, int userId)
        {
            string procName = "[dbo].[FAQs_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(request, collection);
                    collection.AddWithValue("@ModifiedBy", userId);
                    collection.AddWithValue("@Id", request.Id);
                },
                returnParameters: null);
        }
        public FAQ GetById(int categoryId)
        {
            string procName = "[dbo].[FAQs_Select_ByCategoryId]";
            FAQ faq = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@CategoryId", categoryId);
            }, delegate (IDataReader reader, short set)
            {
                faq = MapSingleFAQ(reader);
            }
            );
            return faq;
        }
        public List<FAQ> GetAll()
        {
            List<FAQ> list = null;
            string procName = "[dbo].[FAQs_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FAQ aFAQ = MapSingleFAQ(reader);
                if (list == null)
                {
                    list = new List<FAQ>();
                }
                list.Add(aFAQ);
            }
            );
            return list;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[FAQs_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }
        private static void AddCommonParams(FAQAddRequest request, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Question", request.Question);
            collection.AddWithValue("@Answer", request.Answer);
            collection.AddWithValue("@CategoryId", request.CategoryId);
            collection.AddWithValue("@SortOrder", request.SortOrder);
        }
    }
}
