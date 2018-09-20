using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMS.Models
{
    public class EnquiryDetailViewModel
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DOB { get; set; }
        public string Mobile { get; set; }
        public string Class { get; set; }
        public string Address { get; set; }
        public string Course { get; set; }
        public string Email { get; set; }
    }
    public class OutStandingEnquiryViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime EntryTime { get; set; }
        public DateTime? ResolvedTime { get; set; }
        public bool Resolved { get; set; }
        public string Class { get; set; }
        public string Course { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
    }
}