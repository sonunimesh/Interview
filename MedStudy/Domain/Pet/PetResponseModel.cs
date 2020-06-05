using MedStudy.Enterprise.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedStudy.Domain.Pet
{
  public class PetResponseModel
  {
    public IList<LookupItem> Owners { get; set; }
    public PetModel Pet { get; set; }
  }
}
