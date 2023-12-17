using Microsoft.AspNetCore.SignalR;
using Nest;
using signalrtimezone.Hubs;
using signalrtimezone.Models;

namespace signalrtimezone.Services
{
    public class TimeZoneService: ITimeZoneService
    {
        private readonly IElasticClient _elasticClient;
        private readonly IHubContext<TimeZoneHub> _hubContext;
        public int CompanyId { get; set; }

        public TimeZoneService(IElasticClient elasticClient, IHubContext<TimeZoneHub> hubContext)
        {
            _elasticClient = elasticClient;
            _hubContext = hubContext;
        }

        public void AddOrUpdateTimeZoneDocument(TimeZoneModel timeZoneDocument)
        {
            var companyId = timeZoneDocument.CompanyId;

            var existingDocument = _elasticClient.Get<TimeZoneModel>(companyId.ToString(), g => g.Index("timezones"));

            if (existingDocument.Found)
            {
                var updateResponse = _elasticClient.Update<TimeZoneModel, object>(companyId.ToString(), u => u
                    .Index("timezones")
                    .DocAsUpsert(true)
                    .Doc(new { timeZoneDocument.CompanyId, timeZoneDocument.TimeZone }));

                if (!updateResponse.IsValid)
                {
                    throw new Exception($"Elasticsearch belge güncelleme hatası: {updateResponse.DebugInformation}");
                }
                else
                {
                    _hubContext.Clients.Group(companyId.ToString()).SendAsync("ReceiveTimeZoneUpdate", timeZoneDocument.TimeZone);
                }
            }
            else
            {
                var indexResponse = _elasticClient.Index(timeZoneDocument, i => i
                    .Index("timezones")
                    .Id(companyId));

                if (!indexResponse.IsValid)
                {
                    throw new Exception($"Elasticsearch belge ekleme hatası: {indexResponse.DebugInformation}");
                }
                else
                {
                    _hubContext.Clients.Group(companyId.ToString()).SendAsync("ReceiveTimeZoneUpdate", timeZoneDocument.TimeZone);
                }
            }
        }

        public TimeZoneModel GetTimeZoneDocument(int companyId)
        {
            var searchResponse = _elasticClient.Search<TimeZoneModel>(s => s
                .Index("timezones")
                .Query(q => q
                    .Term(t => t
                        .Field(f => f.CompanyId)
                        .Value(companyId)
                    )
                )
            );

            if (searchResponse.IsValid && searchResponse.Documents.Any())
            {
                return searchResponse.Documents.First();
            }

            return null;
        }

        public void SetCompanyId(int companyId)
        {
            CompanyId = companyId;
        }

        public int GetCompanyId()
        {
            return CompanyId;
        }
    }
}
