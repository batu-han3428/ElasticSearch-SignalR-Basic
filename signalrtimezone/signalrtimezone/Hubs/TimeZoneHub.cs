using Microsoft.AspNetCore.SignalR;
using signalrtimezone.Services;

namespace signalrtimezone.Hubs
{
    public class TimeZoneHub : Hub
    {
        public TimeZoneHub(){}

        public async Task UpdateTimeZone(int companyId, string newTimeZone)
        {
            await Clients.Group(companyId.ToString()).SendAsync("ReceiveTimeZoneUpdate", newTimeZone);
        }

        public void UpdateTimeZoneForUser(int userId, string newTimeZone)
        {
            Clients.All.SendAsync("ReceiveTimeZoneUpdate", userId, newTimeZone);
        }

        public async Task JoinCompanyGroup(int companyId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, companyId.ToString());
        }

        public async Task LeaveCompanyGroup(int companyId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, companyId.ToString());
        }
    }
}
