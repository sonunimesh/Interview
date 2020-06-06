using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedStudy.Infrastructure;
using Ninject;
using NUnit.Framework;
using MedStudy.Enterprise.Common;



namespace MedStudy.IntegrationTest
{
  public abstract class TestFixtureBase
  {


    [OneTimeSetUp]
    public void Setup()
    {
      /* hook up all the depencency injection for every test */
      LoadNinject();
    }

    private void LoadNinject()
    {
      var kernel = new StandardKernel();
      kernel.Load(new MedStudyNinjectTestModule());
      Ioc.Initialize(kernel);
    }
  }
}

