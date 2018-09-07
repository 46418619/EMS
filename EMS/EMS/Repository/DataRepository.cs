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
            _ety.EnquiryDetails.Add(_enq);
            _ety.SaveChanges();
            return true;
        }
    }
}