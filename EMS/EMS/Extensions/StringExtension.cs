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

        public static string ReplaceSpecialChar(this string Str)
        {
            if (string.IsNullOrEmpty(Str) == true)
                return "";
            Str = Str.Replace("{forwardslash}", "/")
                    .Replace("{and}", "&")
                    .Replace("{hash}", "#")
                    .Replace("{plus}", "+")
                    .Replace("{percent}", "%")
                    .Replace("{star}", "*")
                    .Replace("{greater}", "<")
                    .Replace("{small}", ">")
                    .Replace("{dot}", ".")
                    .Replace("{colon}", ":")
                    .Replace("{question}", "?")
                    .Replace("{backslash}", @"\");
            return Str;
        }

    }
}