using System;
using System.Reflection;
using Ninject;
using Ninject.Extensions.NamedScope;
using Ninject.Parameters;

namespace MedStudy.Enterprise.Common
{
    public static class Ioc
    {
        private static readonly MethodInfo _doGenericActionMethod = typeof(Ioc).GetMethod("DoGenericAction", BindingFlags.Static | BindingFlags.NonPublic);

        public static IKernel CurrentKernel { get; private set; }

        public static IKernel Initialize(IKernel kernel)
        {
            CurrentKernel = kernel;
            return kernel;
        }

        public static T Resolve<T>(params IParameter[] parameters)
        {
            return CurrentKernel.Get<T>(parameters);
        }

        public static object Resolve(Type type, params IParameter[] parameters)
        {
            return CurrentKernel.Get(type, parameters);
        }

        public static void Do(Type serviceType, Action<object> action)
        {
            _doGenericActionMethod.MakeGenericMethod(serviceType).Invoke(null, new object[] {action});
        }
        

        public static void Do<T>(Action<T> action)
        {
            DoGenericAction(action);
        }

        public static TResult Do<T, TResult>(Func<T, TResult> func)
        {
            var parameter = new NamedScopeParameter("Georges.Ioc InCallScope");
            using (parameter.Scope)
            using (var proxy = Resolve<DisposeNotifyingProxy<T>>(parameter))
                return func(proxy.Service);
        }

        private static void DoGenericAction<T>(Action<T> action)
        {
            Do((T service) =>
            {
                action(service);
                return 0;
            });
        }

        public class DisposeNotifyingProxy<T> : DisposeNotifyingObject
        {
            public DisposeNotifyingProxy(T service)
            {
                _service = service;
            }

            private readonly T _service;

            public T Service
            {
                get { return _service; }
            }
        }
    }
}
