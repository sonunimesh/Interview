using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MedStudy.Domain.Owner;

namespace FullStackDevExercise.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class OwnerController : ControllerBase
  {
    public OwnerController(IOwnerService ownerService)
    {
      _ownerService = ownerService;
    }


    private IOwnerService _ownerService;

    [HttpGet("[action]")]
    public IActionResult GetOwners()
    {
      try
      {
       return Ok(_ownerService.GetOwners());
      }
      catch (Exception ex)
      {
        return StatusCode(500, "Sorry there was a problem loading the owners");
      }

    }
    [HttpGet("[action]")]
    public IActionResult GetOwner(int? id)
    {
      try
      {
        return Ok(_ownerService.GetOwner(id));
      } catch(Exception ex)
      {
        return StatusCode(500, "Sorry, looks like something happened retreiving your data");
      }
      
    }


    [HttpPost("[action]")]
    public IActionResult Save(OwnerSaveModel model)
    {
      try
      {
        _ownerService.Save(model);
        return Ok();
      }
      catch (Exception ex)
      {
        return StatusCode(500, "There was a problem saving the owner");
      }
    }



  }
}
