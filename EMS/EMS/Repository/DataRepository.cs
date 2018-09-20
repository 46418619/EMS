using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EMS.Data;
using EMS.Models;
using EMS.Extensions;

namespace EMS.Repository
{
    public class DataRepository
    {
        EMSEntities _ety = null;
        public DataRepository()
        {
            _ety = new EMSEntities();
        }

        public bool SaveEnquiry(EnquiryDetailViewModel ob)
        {
            var _enq = new EnquiryDetail();
            _enq.FirstName = ob.FirstName.ToStringValue();
            _enq.LastName = ob.LastName.ToStringValue();
            _enq.DOB = ob.DOB.ToStringValue();
            _enq.Mobile = ob.Mobile.ToStringValue();
            _enq.Class = ob.Class.ToStringValue();
            _enq.Address = ob.Address.ToStringValue();
            _enq.Email = ob.Email.ToStringValue();
            _enq.EntryTime = DateTime.Now;
            _enq.ResolvedTime = null;
            _enq.Dated = DateTime.Now;
            _enq.Resolved = false;
            _ety.EnquiryDetails.Add(_enq);
            _ety.SaveChanges();
            ob.ID = _enq.ID;
            return true;
        }

        public List<OutStandingEnquiryViewModel> GetOutStandingEnquiry()
        {
            var model = _ety.EnquiryDetails.ToList();
            model = model.Where(x => x.Dated.Value == DateTime.Now.Date).ToList();
            return model.Select(x =>
                new OutStandingEnquiryViewModel
                {
                    ID = x.ID,
                    Name = x.FirstName.ToStringValue() + " " + x.LastName.ToStringValue(),
                    EntryTime = x.EntryTime.Value,
                    Resolved = x.Resolved == null ? false : (x.Resolved.Value == null ? false : x.Resolved.Value),
                    ResolvedTime = x.ResolvedTime
                }).ToList();
        }
        public OutStandingEnquiryViewModel ResolveEnquiry(int id,string comment)
        {
            var ob = _ety.EnquiryDetails.FirstOrDefault(x => x.ID == id);
            ob.ResolvedTime = DateTime.Now;
            ob.Resolved = true;
            ob.Comment = comment.ToStringValue();
            _ety.SaveChanges();
            return new OutStandingEnquiryViewModel { 
                Name = ob.FirstName.ToStringValue() + " " + ob.LastName.ToStringValue(),
                ID=ob.ID
            };
        }
    }
}