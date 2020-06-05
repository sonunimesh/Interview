using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedStudy.Enterprise.Common
{
  public class LookupItem
  {

    public LookupItem(int id, string display)
    {
      Id = id;
      Display = display;
    }

    public int Id { get; set; }

    public string Display { get; set; }
  }
}
