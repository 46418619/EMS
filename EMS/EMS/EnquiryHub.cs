using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using EMS.Repository;

namespace SignalRChat
{
    public class EnquiryHub : Hub
    {
        public void UpdateEnquiryPanel(string Id, string Name, string EntryTime)
        {
            Clients.All.UpdateEnquiry(Id, Name, EntryTime);
        }
        public void UpdateResolveEnquiryPanel(string Id, string Name, string ResolveTime)
        {
            Clients.All.UpdateResolvePanel(Id, Name, ResolveTime);
        }
        
    }
}