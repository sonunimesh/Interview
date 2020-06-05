using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedStudy.Domain.Pet
{
  public class PetModel
  {
    public int id { get; set; }

    public int owner_id { get; set; }

    public string type { get; set; }

    public string name { get; set; }

    public int age { get; set; }
  }
}
