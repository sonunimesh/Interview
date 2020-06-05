using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Data.Sqlite;
using Ninject;
using Ninject.Activation;
using System;
using MedStudy.Infrastructure;
using System.Threading;
using System.Runtime.CompilerServices;
using Ninject.Infrastructure.Disposal;
using System.IO;
using FullStackDevExercise.Ninject;

namespace FullStackDevExercise
{
  public class Startup
  {

    private static readonly string MedStudyDoLittleConnectionStringKey = "ConnectionStrings:Main.ConnectionString";

    private IKernel Kernel { get; set; }

    public IConfiguration Configuration { get; }

    private object Resolve(Type type)
    {
      return Kernel.Get(type);
    }

    private readonly AsyncLocal<Scope> scopeProvider = new AsyncLocal<Scope>();

    private object RequestScope(IContext context)
    {
      return scopeProvider.Value;
    }



    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;

    }

    /* we hook up the ninject ioc container here */
    /* everything only stays around for one request and then goes away via the named scope of the */
    
    private static void SetupNinjectHelpers(StandardKernel kernel, Func<IContext, object> RequestScope,
         IConfigurationRoot configBuilder)
    {
      MedStudyWebNinjectHelper.Setup(kernel, RequestScope, GetMedStudyConnectionString(configBuilder));
    }


    private static string GetMedStudyConnectionString(IConfigurationRoot configBuilder)
    {
      return configBuilder.GetValue<string>(MedStudyDoLittleConnectionStringKey);
    }

    private sealed class Scope : DisposableObject
    {
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews();
      services.AddRequestScopingMiddleware(() => scopeProvider.Value = new Scope());
      services.AddCustomControllerActivation(Resolve);
      services.AddCustomViewComponentActivation(Resolve);
      // In production, the Angular files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/dist";
      });




    }



    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      IConfigurationBuilder builder = new ConfigurationBuilder();
      IConfigurationRoot configBuilder = null;
      string settingFile = Path.Combine(Directory.GetCurrentDirectory(), "appSettings.json");
      builder.AddJsonFile(settingFile);
      configBuilder = builder.Build();
      var kernel = new StandardKernel();
      SetupNinjectHelpers(kernel, RequestScope, configBuilder);
      Kernel = RegisterApplicationComponents(app, kernel);

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      if (!env.IsDevelopment())
      {
        app.UseSpaStaticFiles();
      }

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        // To learn more about options for serving an Angular SPA from ASP.NET Core,
        // see https://go.microsoft.com/fwlink/?linkid=864501

        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseAngularCliServer(npmScript: "start");
        }
      });
    }

    private IKernel RegisterApplicationComponents(IApplicationBuilder app, IKernel kernel)
    {
      // Register application services
      foreach (var ctrlType in app.GetControllerTypes()) kernel.Bind(ctrlType).ToSelf().InScope(RequestScope);
      /* .core bindings */


      return kernel;
    }
  }
}
