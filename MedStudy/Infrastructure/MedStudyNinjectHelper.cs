using System;
using System.Security.Cryptography.X509Certificates;
using MedStudy.Domain.Owner;
using MedStudy.Domain.Pet;
using Microsoft.Extensions.Configuration;
using Ninject;
using Ninject.Activation;
using Ninject.Extensions.Conventions;


namespace MedStudy.Infrastructure
{
  public class MedStudyWebNinjectHelper
  {
    public static void Setup(IKernel kernel, Func<IContext, object> scopeMethod, string connectionString)
    {

      kernel.Bind<ISqliteConnector>().ToMethod(x => new SqliteConnector(connectionString));
      kernel.Bind<IOwnerService>().ToMethod(x => new OwnerService(connectionString));
      kernel.Bind<IPetService>().ToMethod(x => new PetService(connectionString));

     
    }  

    
  }
}
