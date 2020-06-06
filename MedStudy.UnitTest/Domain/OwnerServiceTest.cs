using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedStudy.Domain.Owner;

namespace MedStudy.UnitTest.Domain
{
  [TestFixture]
  public class OwnerServiceTest
  {


    private IOwnerService _ownerService;

    [Test]
    public void ShouldBeAbleToGetAllOwnersBack()
    {
      _ownerService = new OwnerService(string.Empty);
      
    }



  }
}
