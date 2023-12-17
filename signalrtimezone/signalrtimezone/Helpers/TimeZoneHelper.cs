using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using signalrtimezone.Services;
using NodaTime;
using System;
using Nest;


namespace signalrtimezone.Helpers
{
    public class TimeZoneHelper : IActionFilter
    {
        private readonly ITimeZoneService _timeZoneService;

        public TimeZoneHelper(ITimeZoneService timeZoneService)
        {
            _timeZoneService = timeZoneService;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            int companyId = _timeZoneService.GetCompanyId();

            var timeZoneClaim = _timeZoneService.GetTimeZoneDocument(companyId);

            if (timeZoneClaim != null)
            {
                if (context.Result is OkObjectResult result1)
                {
                    ModifyDatesInRequest(result1.Value, timeZoneClaim.TimeZone);
                }
            }
        }
        private void ModifyDatesInRequest(object request, string timeZone)
        {
            if (request != null)
            {
                Type requestType = request.GetType();

                if (requestType.IsGenericType && requestType.GetGenericTypeDefinition() == typeof(List<>))
                {
                    IEnumerable<object> list = (IEnumerable<object>)request;

                    foreach (var item in list)
                    {
                        Type itemType = item.GetType();

                        foreach (var property in itemType.GetProperties())
                        {
                            if (property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(DateTimeOffset))
                            {
                                var originalValue = property.GetValue(item);

                                if (originalValue != null)
                                {
                                    DateTime convertedDate;

                                    if (originalValue is DateTime)
                                    {
                                        var originalDate = (DateTime)originalValue;
                                        var originalLocalDateTime = LocalDateTime.FromDateTime(originalDate);
                                        var dateTimeZone = DateTimeZoneProviders.Tzdb.GetZoneOrNull(timeZone);
                                        var convertedInstant = originalLocalDateTime.InZoneLeniently(dateTimeZone).ToInstant();
                                        convertedDate = DateTime.SpecifyKind(convertedInstant.ToDateTimeUtc(), DateTimeKind.Utc);
                                        property.SetValue(item, convertedDate);
                                    }
                                    else if (originalValue is DateTimeOffset)
                                    {
                                        var originalOffset = (DateTimeOffset)originalValue;
                                        var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZone);
                                        convertedDate = TimeZoneInfo.ConvertTime(originalOffset, timeZoneInfo).DateTime;
                                        DateTimeOffset convertedDateTimeOffset = new DateTimeOffset(convertedDate, timeZoneInfo.GetUtcOffset(convertedDate));
                                        property.SetValue(item, convertedDateTimeOffset);
                                    }
                                    else
                                    {
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        public void OnActionExecuting(ActionExecutingContext context) { }
    }
}
