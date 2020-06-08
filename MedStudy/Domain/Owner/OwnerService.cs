using MedStudy.Enterprise.Common;
using Microsoft.Data.Sqlite;
using NHibernate.Id.Insert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MedStudy.Domain.Owner
{


  public interface IOwnerService
  {
    OwnerModel GetOwner(int? id);

    IList<OwnerModel> GetOwners();

    IList<LookupItem> GetOwnersLookup();

    void Save(OwnerSaveModel saveModel);
  }
  public class OwnerService : IOwnerService
  {
    public OwnerService(string connectionString)
    {
      _connectionString = connectionString;
      _sqliteConnectionStringBuilder = new SqliteConnectionStringBuilder();
      _sqliteConnectionStringBuilder.DataSource = _connectionString;

    }

    private string _connectionString;
    private SqliteConnectionStringBuilder _sqliteConnectionStringBuilder;

    public IList<OwnerModel> GetOwners()
    {
      var owners = new List<OwnerModel>();
      using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
      {
        connection.Open();
        var retreiveCommand = connection.CreateCommand();
        retreiveCommand.CommandText = $"select * from owners";
        var reader = retreiveCommand.ExecuteReader();
        while (reader.Read())
        {
          owners.Add(BuildModelFromReaderRow(reader));
        }
      }
      return owners;
    }

    public void Save(OwnerSaveModel saveModel)
    {

      if (isAnEdit(saveModel))
      {
        using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
        {
          connection.Open();
          var saveRecord = connection.CreateCommand();
          saveRecord.CommandText = $"update owners set first_name = '{saveModel.first_name}', last_name = '{saveModel.last_name}' where id = {saveModel.id}";
          saveRecord.ExecuteNonQuery();
        }
      }

      if (isAnInsert(saveModel))
      {
        using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
        {
          connection.Open();
          var saveRecord = connection.CreateCommand();
          saveRecord.CommandText = $"insert into owners (first_name,last_name) values ('{saveModel.first_name}','{saveModel.last_name}')";
          saveRecord.ExecuteNonQuery();
        }
      }

    }

    public OwnerModel GetOwner(int? id)
    {
      if (id.HasValue && id.Value == 0) return new OwnerModel() { id = 0, first_name = string.Empty, last_name = string.Empty };
      using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
      {
        connection.Open();
        var retreiveCommand = connection.CreateCommand();
        retreiveCommand.CommandText = $"select * from owners where id={id}";
        var reader = retreiveCommand.ExecuteReader();
        reader.Read();
        return BuildModelFromReaderRow(reader);
      }

    }


    public IList<LookupItem> GetOwnersLookup()
    {
      var owners = new List<LookupItem>();
      using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
      {
        connection.Open();
        var retreiveCommand = connection.CreateCommand();
        retreiveCommand.CommandText = $"select * from owners";
        var reader = retreiveCommand.ExecuteReader();
        while (reader.Read())
        {
          owners.Add(BuildLookupItemFromReaderRow(reader));
        }
      }
      return owners;
    }


    private static LookupItem BuildLookupItemFromReaderRow(SqliteDataReader reader)
    {
      var id = reader.GetInt32(0);
      var first_name = reader.GetString(1);
      var last_name = reader.GetString(2);
      return new LookupItem(id,$"{first_name} {last_name}");
    }

    private static OwnerModel BuildModelFromReaderRow(SqliteDataReader reader)
    {
      return new OwnerModel()
      {
        id = (int)reader.GetInt32(0),
        first_name = reader.GetString(1),
        last_name = reader.GetString(2)
      };
    }

    private static bool isAnEdit(OwnerSaveModel saveModel)
    {
      return saveModel.id.HasValue && saveModel.id.Value > 0;
    }

    private static bool isAnInsert(OwnerSaveModel saveModel)
    {
      return saveModel.id.HasValue && saveModel.id.Value == 0;
    }

   
  }
}
