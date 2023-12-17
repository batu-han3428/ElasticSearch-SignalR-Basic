using signalrtimezone.Models;
using System.ComponentModel.Design;

namespace signalrtimezone.Services
{
    public interface ITimeZoneService
    {
        void AddOrUpdateTimeZoneDocument(TimeZoneModel timeZoneDocument);
        TimeZoneModel GetTimeZoneDocument(int companyId);
        void SetCompanyId(int companyId);
        int GetCompanyId();
    }
}
