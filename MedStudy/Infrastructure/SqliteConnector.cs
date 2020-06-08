using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedStudy.Infrastructure
{
  public enum CommandExecuteType
  {
    ExecuteNonQuery,
    ExecuteReader
  }
  /* inversion of control sqlite wrapper connector class to allow unit testing */

  public interface ISqliteConnector
  {
    void Connect();
    void Disconnect();

    SqliteDataReader GetReader(string sql);

    void ExecuteNonQuery(string sql);

  }


  public class SqliteConnector : ISqliteConnector
  {
    public SqliteConnector(string connectionString)
    {
      _connectionString = connectionString;
    }

    private string _connectionString;
    private SqliteConnection _sqliteConnection;
    public void Connect()
    {
      var builder = new SqliteConnectionStringBuilder();
      builder.DataSource = _connectionString;
      _sqliteConnection = new SqliteConnection(builder.ConnectionString);
      _sqliteConnection.Open();
    }

    public void Disconnect()
    {
      if( _sqliteConnection.State == System.Data.ConnectionState.Open)
      {
        _sqliteConnection.Close();
      }
    }

    public void ExecuteNonQuery(string sql)
    {
      var command = _sqliteConnection.CreateCommand();
      command.ExecuteNonQuery();
    }

    public SqliteDataReader GetReader(string sql)
    {
      var command = _sqliteConnection.CreateCommand();
      command.CommandText = sql;
      return command.ExecuteReader();
    }
  }
}
