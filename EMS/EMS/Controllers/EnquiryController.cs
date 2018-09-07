using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EMS.Models;
using EMS.Repository;

namespace EMS.Controllers
{
    public class EnquiryController : Controller
    {
        DataRepository _dr;
        public EnquiryController()
        {
            _dr = new DataRepository();
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(EnquiryDetailViewModel ob)
        {
            try
            {
                _dr.SaveEnquiry(ob);
                return Json(new { Result = "success", Message = "" });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "error", Message = ex.Message });
            }
        }
    }
}