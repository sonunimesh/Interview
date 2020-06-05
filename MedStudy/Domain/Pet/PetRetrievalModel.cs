using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedStudy.Domain.Pet
{
  public class PetRetrievalModel
  {
    public int id { get; set; }

    public string owner_name { get; set; }

    public string type { get; set; }

    public string name { get; set; }

    public int age { get; set; }

  }
}
