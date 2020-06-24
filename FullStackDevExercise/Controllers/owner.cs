using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using FullStackDevExercise.Model;
namespace FullStackDevExercise.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class OwnersController : ControllerBase
    {
      Db _db;
    public OwnersController(Db db)
      {
        _db=db;
      }
      [HttpGet]

        public async Task<List<owner>> GetOwners()
        {

          if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                List<owner> owners = new List<owner>();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT id,first_name,last_name from owners;";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {
                      var data = new owner();
                      data.Id = Convert.ToInt32(result.GetString(0));
 data.First_Name = result.GetString(1);
                       data.Last_Name = result.GetString(2);

                        owners.Add(data);



                    }
                connection.Close();

                    var ownerlist= await Task.Run(() => owners);

                    return  ownerlist;

                }
            }
        }


        [HttpGet("{id}")]
        public  async Task<owner> GetOwners(int id)
        {
            if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                owner objowner = new owner();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT id,first_name,last_name from owners where id="+ id +";";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {

                      objowner.Id = Convert.ToInt32(result.GetString(0));
                      objowner.First_Name = result.GetString(1);
                       objowner.Last_Name = result.GetString(2);




                    }
                     connection.Close();
                    var ownerdata= await Task.Run(() => objowner);
                    return  ownerdata;

                }
            }
        }

        [HttpPut("{id}")]
        public  async Task<int> PutOwners([FromBody]owner objowner)
        {
            if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();


                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "UPDATE owners set first_name='" + objowner.First_Name +"',last_name='" + objowner.Last_Name +"' where id="+ objowner.Id +";";
                     var result = 0;
                     try
                     {
                         command.ExecuteNonQuery();
                         result=1;
                     }
                     catch (System.Exception)
                     {

                        result=-1;
                     }


                    connection.Close();
                    var ownerdata= await Task.Run(() => result);
                    return  ownerdata;

                }
            }
        }



        [HttpPost]
        public   async Task<int> PostOwners([FromBody] owner newowner)
        {
              if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();


                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "INSERT INTO owners(first_name, last_name) VALUES('" + newowner.First_Name +"','" + newowner.Last_Name +"') ;";
                     var result = 0;
                     try
                     {
                         command.ExecuteNonQuery();
                         result=1;
                     }
                     catch (System.Exception)
                     {


                     }


                    connection.Close();
                    var ownerdata= await Task.Run(() => result);
                    return  ownerdata;

                }
            }



             }
                  [HttpDelete("{id}")]
        public  async Task<int> DeleteOwners( [FromRoute] int id)
        {
             if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();


                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "DELETE from owners where id=" + id +";" ;
                     var result = 0;
                     try
                     {
                         command.ExecuteNonQuery();
                         result=1;
                     }
                     catch (System.Exception)
                     {

                        result=-1;
                     }


                    connection.Close();
                    var ownerdata= await Task.Run(() => result);
                    return  ownerdata;

                }
            }



        }

    }
}
