using Microsoft.Data.Sqlite;
namespace FullStackDevExercise
{
  public interface Db
{
  public SqliteConnection  GetConnection();
}
    public class SqliteDbImplementation : Db
    {

      public  SqliteConnection GetConnection()
      {
         var connectionStringBuilder = new SqliteConnectionStringBuilder();
      connectionStringBuilder.DataSource = "./dolittle.db";

      using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
      return connection;

      }

    }
}
