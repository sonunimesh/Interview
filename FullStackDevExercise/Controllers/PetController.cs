using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedStudy.Domain.Pet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullStackDevExercise.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PetController : ControllerBase
  {

    public PetController(IPetService petService)
    {
      _petService = petService;
    }


    private IPetService _petService;


    [HttpGet("[action]")]
    public IActionResult GetPets()
    {
      try
      {
        return Ok(_petService.GetPets());
      } catch(Exception ex)
      {
        return StatusCode(500, "There was a problem collecting your pets");
      }
    }


    [HttpPost("[action]")]
    public IActionResult Save(PetSaveModel model)
    {
      try
      {
        _petService.Save(model);
        return Ok();
      } catch(Exception ex)
      {
        return StatusCode(500, "There was a problem saving your record");
      }
    }


  }
}
