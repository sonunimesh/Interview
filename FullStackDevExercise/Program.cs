using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Hosting;

namespace FullStackDevExercise
{
  public class Program
  {
    public static void Main(string[] args)
    {
      BootstrapData();
      CreateHostBuilder(args).Build().Run();
    }

    private static void BootstrapData()
    {
      var mydb= new SqliteDbImplementation();

      using var connection = mydb.GetConnection();
      connection.Open();
      SetupDB(connection);
      CreateOwnersTable(connection);
      CreatePetsTable(connection);
      CreateAppointmentsTable(connection);
    }

    private static void SetupDB(SqliteConnection connection) {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"  PRAGMA foreign_keys = ON;";
    }

    private static void CreateOwnersTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS owners
        (
          id INTEGER PRIMARY KEY
          , first_name VARCHAR(50) NOT NULL
          , last_name VARCHAR(50) NOT NULL
        )
      ";
      createTable.ExecuteNonQuery();
      if(IsTableEmpty(connection,"owners"))
      {
 seedDataToOwnersTable(connection);
      }


    }


    private static void CreatePetsTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS pets
        (
          id INTEGER PRIMARY KEY
          , owner_id INT NOT NULL
          , type VARCHAR(50) NOT NULL
          , name VARCHAR(50) NOT NULL
          , age INT NOT NULL
          , FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE ON UPDATE NO ACTION
        )
      ";
      createTable.ExecuteNonQuery();
      if(IsTableEmpty(connection,"pets"))
      {
 seedDataToPetsTable(connection);
      }

    }
    private static void CreateAppointmentsTable(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS appointments
        (
          id INTEGER PRIMARY KEY
          , pet_id INT NOT NULL
          , date VARCHAR(50) NOT NULL
          , time VARCHAR(50) NOT NULL

          , FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE ON UPDATE NO ACTION
        )
      ";
      createTable.ExecuteNonQuery();
      if(IsTableEmpty(connection,"appointments"))
      {
 seedDataToAppointmentTable(connection);
      }

    }
    private static void seedDataToOwnersTable(SqliteConnection connection)
    {


                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();

                    insertCmd.CommandText = "INSERT INTO owners(first_name, last_name) VALUES('owner1_firstname','owner1_lastname')";
                    insertCmd.ExecuteNonQuery();


                    insertCmd.CommandText = "INSERT INTO owners(first_name, last_name) VALUES('owner2_firstname','owner2_lastname')";
                    insertCmd.ExecuteNonQuery();

                    insertCmd.CommandText = "INSERT INTO owners(first_name, last_name) VALUES('owner3_firstname','owner3_lastname')";
                    insertCmd.ExecuteNonQuery();

                    transaction.Commit();
                }
    }
     private static void seedDataToPetsTable(SqliteConnection connection)
    {

                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();

                    insertCmd.CommandText = "INSERT INTO pets(owner_id, type,name,age) VALUES((SELECT id from owners WHERE first_name='owner1_firstname'),'type1','tom1',1)";
                    insertCmd.ExecuteNonQuery();


                    insertCmd.CommandText = "INSERT INTO pets(owner_id, type,name,age) VALUES((SELECT id from owners WHERE first_name='owner2_firstname'),'type1','tom2',2)";
                    insertCmd.ExecuteNonQuery();

                    insertCmd.CommandText = "INSERT INTO pets(owner_id, type,name,age) VALUES((SELECT id from owners WHERE first_name='owner3_firstname'),'type2','jerry',1)";
                    insertCmd.ExecuteNonQuery();

                    transaction.Commit();
                }
    }
     private static void seedDataToAppointmentTable(SqliteConnection connection)
    {

                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();

                    insertCmd.CommandText = "INSERT INTO appointments(pet_id, date,time) VALUES((SELECT id from pets WHERE name='tom1'),'7/15/2020','11:30')";
                    insertCmd.ExecuteNonQuery();


                    insertCmd.CommandText = "INSERT INTO appointments(pet_id, date,time) VALUES((SELECT id from pets WHERE name='tom2'),'7/15/2020','16:00')";
                    insertCmd.ExecuteNonQuery();

                    insertCmd.CommandText = "INSERT INTO appointments(pet_id, date,time) VALUES((SELECT id from pets WHERE name='jerry'),'7/16/2020','13:00')";
                    insertCmd.ExecuteNonQuery();

                    transaction.Commit();
                }
    }
    private static bool IsTableEmpty(SqliteConnection connection,string tblName)
{
    var sql = string.Format("SELECT COUNT(*) FROM {0}", tblName);


       var cmd = connection.CreateCommand();
            cmd.CommandText = sql;
            var rows = Convert.ToInt64(cmd.ExecuteScalar());
            return rows == 0;


}

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
