using NHibernate.Id.Insert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.ServiceModel.Channels;
using Remotion.Linq.Parsing.ExpressionVisitors.Transformation.PredefinedTransformations;
using MedStudy.Domain.Owner;
using Microsoft.Data.Sqlite;
using NHibernate.SqlCommand;

namespace MedStudy.Domain.Pet
{

  public interface IPetService
  {
    List<PetRetrievalModel> GetPets();

    PetResponseModel GetPetResponse(int? id);

    void Save(PetSaveModel model);
  }


  public class PetService : IPetService
  {

    public PetService(string connectionString)
    {

      _connectionString = connectionString;
      _sqliteConnectionStringBuilder = new SqliteConnectionStringBuilder();
      _sqliteConnectionStringBuilder.DataSource = _connectionString;

    }

    private string _connectionString;
    private SqliteConnectionStringBuilder _sqliteConnectionStringBuilder;


    public List<PetRetrievalModel> GetPets()
    {
      var pets = new List<PetRetrievalModel>();
      using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
      {
        connection.Open();
        var retreiveCommand = connection.CreateCommand();
        retreiveCommand.CommandText = @"select
                                         pet.id,
	                                       pet.type,
	                                       pet.name,
	                                       owner.first_name || ' ' || owner.last_name as owner,
	                                       pet.age
                                    from pets pet
                                    inner join owners owner
                                    on pet.owner_id = owner.id";
        var reader = retreiveCommand.ExecuteReader();
        while (reader.Read())
        {
          pets.Add(BuildModelFromReaderRow(reader));
        }
      }

      return pets;
    }

    public PetResponseModel GetPetResponse(int? id)
    {
      var ownersService = new OwnerService(_connectionString);
      var response = new PetResponseModel();
      response.Owners = ownersService.GetOwnersLookup();
      response.Pet = GetPet(id);
      return response;
    }

    public void Save(PetSaveModel model)
    {
      /* edit record */
      if (model.id.HasValue && model.id.Value > 0)
      {
        using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
        {
          connection.Open();
          var updateRecord = connection.CreateCommand();
          updateRecord.CommandText = $"update pets set owner_id={model.owner_id}," +
            $" type='{model.type}', name='{model.name}', age={model.age}" +
            $" where id={model.id}";
          updateRecord.ExecuteNonQuery();
        }

      }
      /* new record */
      if (model.id.HasValue && model.id.Value == 0)
      {
        using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
        {
          connection.Open();
          var updateRecord = connection.CreateCommand();
          updateRecord.CommandText = $"insert into pets (owner_id,type,name,age) " +
            $" values ({model.owner_id},'{model.type}','{model.name}',{model.age})";
          updateRecord.ExecuteNonQuery();
        }
      }
    }

    private PetModel GetPet(int? id)
    {
      if (!id.HasValue) return null;
      using (var connection = new SqliteConnection(_sqliteConnectionStringBuilder.ConnectionString))
      {
        connection.Open();
        var retreiveCommand = connection.CreateCommand();
        retreiveCommand.CommandText = $"select * from pets where id={id}";
        var reader = retreiveCommand.ExecuteReader();
        reader.Read();
        return BuildPetModelFromReaderRow(reader);
      }
    }

    private static PetModel BuildPetModelFromReaderRow(SqliteDataReader reader)
    {
      return new PetModel()
      {
        id = reader.GetInt16(0),
        owner_id = reader.GetInt32(1),
        type = reader.GetString(2),
        name = reader.GetString(3),
        age = reader.GetInt32(4)
      };
    }

    private static PetRetrievalModel BuildModelFromReaderRow(SqliteDataReader reader)
    {
      return new PetRetrievalModel()
      {
        id = reader.GetInt32(0),
        type = reader.GetString(1),
        name = reader.GetString(2),
        owner_name = reader.GetString(3),
        age = reader.GetInt32(4)
      };
    }


  }

}
