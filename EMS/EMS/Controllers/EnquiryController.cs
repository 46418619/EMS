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
                if (_dr.SaveEnquiry(ob))
                {
                    return Json(new { Result = "success", Message = "", Id = ob.ID, Name = ob.FirstName + " " + ob.LastName });
                }
                else
                {
                    return Json(new { Result = "error", Message = "Error Occured" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "error", Message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult ResolveEnquiry(int id, string comment)
        {
            try
            {
                var result = _dr.ResolveEnquiry(id, comment);
                return Json(new { Result = "success", Message = "", Id = result.ID, Name = result.Name });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "error", Message = ex.Message });
            }
        }
    }
}