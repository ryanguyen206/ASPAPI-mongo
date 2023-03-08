using ASPAPI_mongo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

namespace ASPAPI_mongo.Controllers
{
    [Route("api/[controller]")]

    public class RetailerController : Controller
    {
  
        ShoesDbContext dbContext = new ShoesDbContext();

        [HttpGet]
        public IEnumerable<Retailer> getRetailer()
        {

            return dbContext.Retailers;
        }

        [HttpPost]
        public string AddRetailer([FromBody] string value)
        {

            Retailer retailer = new Retailer();
            retailer.Name = value;
            dbContext.Add(retailer);
            dbContext.SaveChanges();
            return value;
        }
    }
}
