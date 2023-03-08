using ASPAPI_mongo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ASPAPI_mongo.Controllers
{

    [Route("api/[controller]")]

    public class ManufacturerController : Controller
    {
        ShoesDbContext db = new ShoesDbContext();

        [HttpGet]
        public IEnumerable<Manufacturer> getRetailer()
        {

            return db.Manufacturers;
        }

        [HttpPost]

        public string addManufacturer([FromBody] ManuSubset manu)
        {
            Manufacturer manufacturer = new Manufacturer();

            manufacturer.Name = manu.name;
            manufacturer.Country = manu.country;

            db.Add(manufacturer);
            db.SaveChanges();

            return manufacturer.Name;
        }
    }


    public class ManuSubset {
        public string name { get; set; } = default!;

        public string country { get; set; } = default!;
    }

}

  


