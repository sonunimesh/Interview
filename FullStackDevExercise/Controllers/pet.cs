using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Dynamic;
using Microsoft.AspNetCore.Mvc;
using FullStackDevExercise.Model;
namespace FullStackDevExercise.Controllers
{
  [ApiController]
    [Route("api/[controller]")]
    public class petsController : ControllerBase
    {
        Db _db;
     public  petsController(Db db)
      {
        _db=db;
      }
            [HttpGet]
        public async Task<List<dynamic>> GetPets()
        {
          if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                List<dynamic> pets = new List<dynamic>();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT p.id,type,name,age,owner_id,first_name from pets as p, owners as o where p.owner_id= o.Id;";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {
                      dynamic data = new ExpandoObject();

                      data.Id = Convert.ToInt32(result.GetString(0));
                       data.type = result.GetString(1);
                       data.name = result.GetString(2);
                        data.age = Convert.ToInt32(result.GetString(3));
                       data.Owner_id = Convert.ToInt32(result.GetString(4));
                        data.first_name=result.GetString(5);
                        pets.Add(data);



                    }
                connection.Close();

                    var petlist= await Task.Run(() => pets);

                    return  petlist;

                }
            }
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public  async Task<pet> GetPets(int id)
        {
            if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                pet objpet = new pet();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT id,type,name,age,owner_Id from pets where id="+ id +";";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {

                      objpet.Id = Convert.ToInt32(result.GetString(0));
                      objpet.Type = result.GetString(1);
                       objpet.Name = result.GetString(2);
                        objpet.Age = Convert.ToInt32(result.GetString(3));
                       objpet.Owner_Id = Convert.ToInt32(result.GetString(4));




                    }
                     connection.Close();
                    var petdata= await Task.Run(() => objpet);
                    return  petdata;

                }
            }
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
      [HttpPut("{id}")]
        public  async Task<int> PutPets([FromBody] pet objpet)
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
                    command.CommandText = "UPDATE pets set type='" + objpet.Type +"',name='" + objpet.Name + "',age=" + objpet.Age + ",owner_id=" + objpet.Owner_Id +"  where id="+ objpet.Id +";";
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
                    var petdata= await Task.Run(() => result);
                    return  petdata;

                }
            }
        }




        [HttpPost]
        public   async Task<int> PostPets([FromBody] pet objpet)
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
                    command.CommandText = "INSERT INTO pets(owner_id, type,name,age) VALUES('" + objpet.Owner_Id +"','" + objpet.Type +"','" + objpet.Name +"','" + objpet.Age + "');" ;                     var result = 0;
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
                    var petdata= await Task.Run(() => result);
                    return  petdata;

                }
            }



             }
                  [HttpDelete("{id}")]
        public  async Task<int> DeletePets([FromRoute]int id)
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
                    command.CommandText = "DELETE from pets where id=" + id +";" ;
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
                    var petdata= await Task.Run(() => result);
                    return  petdata;

                }
            }



        }



    }
}
