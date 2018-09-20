using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EMS.Models;
using EMS.Repository;

namespace EMS.Controllers
{
    public class HomeController : Controller
    {
                DataRepository _dr;
                public HomeController()
        {
            _dr = new DataRepository();
        }

        public ActionResult EnquiryDashboard()
        {
            List<EMS.Models.OutStandingEnquiryViewModel> ob = null;
            try
            {
                ob = _dr.GetOutStandingEnquiry();
                return View(ob);
            }
            catch (Exception ex)
            {
                return View(ob);
            }            
        }
    }
}