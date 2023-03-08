using System;
using System.Collections.Generic;

namespace ASPAPI_mongo.Models;

public partial class Shoe
{
    public int ShoeId { get; set; }

    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public double Price { get; set; }

    public int RetailerId { get; set; }

    public int ManufacturerId { get; set; }

    public string Brand { get; set; } = null!;

    public virtual Manufacturer Manufacturer { get; set; } = null!;

    public virtual Retailer Retailer { get; set; } = null!;
}
