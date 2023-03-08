using System;
using System.Collections.Generic;

namespace ASPAPI_mongo.Models;

public partial class Retailer
{
    public int RetailerId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Shoe> Shoes { get; } = new List<Shoe>();
}
