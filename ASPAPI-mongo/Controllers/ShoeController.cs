using ASPAPI_mongo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Numerics;
using System.Text.Json.Nodes;


namespace ASPAPI_mongo.Controllers 
{

    [Route("api/[controller]")]
 
    public class ShoeController : Controller
    {
   
        ShoesDbContext dbContext = new ShoesDbContext();


        [HttpGet]
        public IEnumerable<Shoe> getAllShoes()
        {
            //var linqQuery = from shoes in dbContext.Shoes
            //                select new
            //                {
            //                    shoes.Name,
            //                    shoes.Brand,
            //                    shoes.Price,
            //                    shoes.Manufacturer.Name,
            //                    shoes.Retailer.Name

            //                };
            //return linqQuery;
            return dbContext.Shoes;
        }

        // POST: ShoeController/Create
        [HttpPost]
    
        public string AddShoe([FromBody] ShoeSubset pShoe)
        {

            Shoe newShoe = new Shoe();

            newShoe.Name = pShoe.shoe;
            newShoe.Price = pShoe.price;
            newShoe.Brand = pShoe.brand;
            newShoe.Color = pShoe.color;
            newShoe.ManufacturerId = pShoe.manuId;
            newShoe.RetailerId = pShoe.retailId;

            dbContext.Add(newShoe);
            dbContext.SaveChanges();

            return newShoe.Name;
        }

        [HttpPut]

        public string UpdateShoe([FromBody] ShoeSubset pShoe)
        {
            
            return "hi from updateshoe";

        }
      

    
    }

    public class ShoeSubset
    {
        public string shoe { get; set; } 
        public string brand { get; set; } 
        public int price { get; set; } 
        public string color { get; set; } 
        public int manuId { get; set; } 

        public int retailId { get; set;} 


    }
}


