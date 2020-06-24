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
    public class appointmentController : ControllerBase
    {
         Db _db;
     public  appointmentController(Db db)
      {
        _db=db;
      }
            [HttpGet]
        public async Task<List< dynamic>> GetAppointment()
        {
          if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                List< dynamic>  appointments = new List< dynamic>();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT a.id,date,time,pet_id,name from  appointments as a,pets as p where a.pet_id=p.id;";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {
                      dynamic data = new ExpandoObject();
                      data.Id = Convert.ToInt32(result.GetString(0));
 data.date = result.GetString(1);
                       data.time = result.GetString(2);
                       data.pet_Id = Convert.ToInt32(result.GetString(3));
                      data.name= result.GetString(4);
                         appointments.Add(data);



                    }
                connection.Close();

                    var  appointmentlist= await Task.Run(() =>  appointments);

                    return   appointmentlist;

                }
            }
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public  async Task<appointment> GetAppointment(int id)
        {
            if(_db == null)
          {
            var services = this.HttpContext.RequestServices;
        _db = (Db)services.GetService(typeof(Db));
          }
            using (var connection = _db.GetConnection())
            {
                connection.Open();
                 appointment objappointment = new  appointment();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT id,date,time,pet_id from  appointments  where id="+ id +";";
                    var result =  command.ExecuteReader();
                    while (result.Read())
                    {

                       objappointment.Id = Convert.ToInt32(result.GetString(0));
                      objappointment.Date = result.GetString(1);
                       objappointment.Time = result.GetString(2);
                       objappointment.pet_Id = Convert.ToInt32(result.GetString(3));




                    }
                     connection.Close();
                    var appointmentdata= await Task.Run(() => objappointment);
                    return  appointmentdata;

                }
            }
        }

        // PUT: api/Products/5

      [HttpPut("{id}")]
        public  async Task<int> PutAppointment([FromBody] appointment objappointment)
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
                    command.CommandText = "UPDATE appointments set date='" + objappointment.Date +"',time='" + objappointment.Time +  "',pet_id=" + objappointment.pet_Id +"  where id="+ objappointment.Id +";";
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
                    var objappointmentdata= await Task.Run(() => result);
                    return  objappointmentdata;

                }
            }
        }



       // POST: api/Products

        [HttpPost]
        public   async Task<int> PostAppointment([FromBody] appointment objappointment)
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
                    command.CommandText = "INSERT INTO appointments(pet_id, date,time) VALUES('" + objappointment.pet_Id +"','" + objappointment.Date +"','" + objappointment.Time + "');" ;
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
                    var appointmentdata = await Task.Run(() => result);
                    return  appointmentdata;

                }
            }



             }
                  [HttpDelete("{id}")]
        public  async Task<int> DeleteAppointment([FromRoute] int id)
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
                    command.CommandText = "DELETE from appointments where id=" + id +";" ;
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
                    var appointmentdata= await Task.Run(() => result);
                    return  appointmentdata;

                }
            }



        }



    }
}
