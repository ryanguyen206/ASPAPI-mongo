using System;
using System.Collections.Generic;

namespace ASPAPI_mongo.Models;

public partial class Manufacturer
{
    public int ManufacturerId { get; set; }

    public string Country { get; set; } = null!;

    public string Name { get; set; } = null!;

    public virtual ICollection<Shoe> Shoes { get; } = new List<Shoe>();
}
