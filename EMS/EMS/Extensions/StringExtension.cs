using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMS.Extensions
{
    public static class StringExtension
    {
        public static string ToStringValue(this object obj)
        {
            if (obj == null)
                return string.Empty;
            else
                return obj.ToString().Trim();
        }

    }
}