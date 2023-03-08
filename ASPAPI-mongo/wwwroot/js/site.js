

let select_retailer;
let manufacturer_retailers;
let addShoeBtn;
let getShoesBtn;
let displayShoesContainer;
let updateBtn;
let addRetailerBtn;
let addManuBtn;
let displayBackup;
let backupServer;


document.addEventListener("DOMContentLoaded", function (event) {

    select_retailer = document.getElementById("select-retailers");
    manufacturer_retailers = document.getElementById("manufacturer-retailers");


    //////////////Shoe Function/////////////////
    addShoeBtn = document.getElementById("addShoe");
    addShoeBtn.addEventListener("click", () => handleAddShoe())

    getShoesBtn = document.getElementById("getAllShoes");
    getShoesBtn.addEventListener("click", () => getAllShoes());

    displayShoesContainer = document.getElementById("grid-container");

    updateBtn = document.getElementById("updateShoe");
    updateBtn.addEventListener("click", () => handleUpdateShoe());

    addRetailerBtn = document.getElementById("addRetailer");
    addRetailerBtn.addEventListener("click", () => handleAddRetailer());

    addManuBtn = document.getElementById("addManu");
    addManuBtn.addEventListener("click", () => handleAddManufacturer());


    displayBackup = document.getElementById("displayServer");
    backupServer = document.getElementById("backupServer");

    displayBackup.addEventListener("click", () => console.log("display back up"));
    backupServer.addEventListener("click", () => console.log("back up server"));

    getAllRetailer();
    getAllManufacturers();

});


function Shoe(pShoe, pBrand, pColor, pPrice, pManu, pRetail) {
    this.shoe = pShoe;
    this.brand = pBrand;
    this.color = pColor;
    this.price = pPrice;
    this.manuId = pManu;
    this.retailId = pRetail;
}




let shoesArray = []

const getAllShoes = () => {


    $.get("api/Shoe", function (data, status) {  // AJAX get
        shoesArray = data;

        for (let eachShoe of shoesArray) {
            displayShoesContainer.innerHTML += `
                <div class="shoeCard">
                <p>Name: ${eachShoe.name}</p>
                <p>Brand: ${eachShoe.brand}</p>
                <p>Price: ${eachShoe.price}</p>
                <div class="icons">
                    <i class="bi bi-trash3" onclick="testFunction()">Delete</i>
                    <i class="bi bi-pencil">Edit</i>    
                </div>
             
</div>
             `
        }

        console.log(shoesArray);  // put the returned server json data into our local array 
    })



}


function testFunction() {
    console.log("hello");
}

const handleAddShoe = () => {
    var shoeText = document.getElementById("name").value;
    var brandText = document.getElementById("brand").value;
    var colorText = document.getElementById("color").value;
    var priceText = document.getElementById("price").value;
    var manufacturerId = manufacturer_retailers.options[manufacturer_retailers.selectedIndex].value;
    var retailerId = select_retailer.options[select_retailer.selectedIndex].value;


    let newShoe = new Shoe(shoeText, brandText, colorText, priceText, manufacturerId, retailerId);


    $.ajax({
        url: "api/Shoe",
        type: "POST",
        data: JSON.stringify(newShoe),
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            alert(result + " was added");
            RefreshList();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
}



const handleUpdateShoe = () => {
    var shoeText = document.getElementById("name").value;
    var brandText = document.getElementById("brand").value;
    var colorText = document.getElementById("color").value;
    var priceText = document.getElementById("price").value;
    var manufacturerId = manufacturer_retailers.options[manufacturer_retailers.selectedIndex].value;
    var retailerId = select_retailer.options[select_retailer.selectedIndex].value;


    let newShoe = new Shoe(shoeText, brandText, colorText, priceText, manufacturerId, retailerId);


    $.ajax({
        url: "api/Shoe",
        type: "PUT",
        data: JSON.stringify(newShoe),
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            alert(result);
            RefreshList();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
}



//////////// Retailer Functions /////////////////////////
let retailerArray = []



const getAllRetailer = () => {
    console.log("get retailer btn");

    $.get("api/Retailer", function (data, status) {



        retailerArray = data;

        while (select_retailer.options.length > 0) {
            select_retailer.remove(0);
        }

        for (let eachRetailer of retailerArray) {
            let newRetailer = document.createElement('option');
            let optionText = document.createTextNode(eachRetailer.name);
            newRetailer.appendChild(optionText);
            newRetailer.setAttribute('value', eachRetailer.retailerId);
            select_retailer.appendChild(newRetailer);
        }
    })
}

const handleAddRetailer = () => {
    let shoeText = document.getElementById("retailer-name").value;

    $.ajax({
        url: "api/Retailer",
        type: "POST",
        data: JSON.stringify(shoeText),
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            alert(result + " was added");
            getAllRetailer();
            shoeText.value = "";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
}

/////////////Manufacturer Functions/////////////
let manufacturerArray = [];



function Manufacturer(pCountry, pName) {
    this.country = pCountry;
    this.name = pName;
}



const getAllManufacturers = () => {


    $.get("api/Manufacturer", function (data, status) {



        manufacturerArray = data;

        while (manufacturer_retailers.options.length > 0) {
            manufacturer_retailers.remove(0);
        }

        for (let eachManufacturer of manufacturerArray) {
            let newManufacturer = document.createElement('option');
            let optionText = document.createTextNode(eachManufacturer.name);
            newManufacturer.appendChild(optionText);
            newManufacturer.setAttribute('value', eachManufacturer.manufacturerId);
            manufacturer_retailers.appendChild(newManufacturer);
        }


    })
}


const handleAddManufacturer = () => {
    let countryText = document.getElementById("country").value;
    let nameText = document.getElementById("manu-name").value;

    let newManu = new Manufacturer(countryText, nameText);


    $.ajax({
        url: "api/Manufacturer",
        type: "POST",
        data: JSON.stringify(newManu),
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            alert(result + " was added");
            getAllManufacturers();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });

}









//document.addEventListener("DOMContentLoaded", function () {



    //$.get("api/Dog", function (data, status) {  // AJAX get
    //    dogsArray = data;  // put the returned server json data into our local array

    //    let table = document.getElementById('dogtable');

    //    let tr = document.createElement('tr');
    //    let td1 = document.createElement('td');
    //    td1.textContent = "Breed";
    //    tr.appendChild(td1);
    //    let td2 = document.createElement('td');
    //    td2.textContent = "Color";
    //    tr.appendChild(td2);
    //    let td3 = document.createElement('td');
    //    td3.textContent = "Age";

    //    tr.appendChild(td3);


    //    table.appendChild(tr);


    //        for (let dog of dogsArray) {
    //            let tr = document.createElement('tr');

    //            let td1 = document.createElement('td');
    //            td1.textContent = dog.breed;
    //            tr.appendChild(td1);

    //            let td2 = document.createElement('td');
    //            td2.textContent = dog.color;
    //            tr.appendChild(td2);

    //            let td3 = document.createElement('td');
    //            td3.textContent = dog.age;
    //            tr.appendChild(td3);

    //            table.appendChild(tr);
    //        }
    //    //myli.innerHTML = item.breed + ":  " + item.color + ":  " + item.age;

    //    });

//});








//let select_retailer = document.getElementById("select-retailers");
//let manufacturer_retailers = document.getElementById("manufacturer-retailers");


////////////////Shoe Function/////////////////
//var addShoeBtn = document.getElementById("addShoe");
//addShoeBtn.addEventListener("click", () => handleAddShoe())


//function Shoe(pShoe, pBrand, pColor, pPrice, pManu, pRetail) {
//    this.shoe = pShoe;
//    this.brand = pBrand;
//    this.color = pColor;
//    this.price = pPrice;
//    this.manuId = pManu;
//    this.retailId = pRetail;
//}


//let getShoesBtn = document.getElementById("getAllShoes");
//getShoesBtn.addEventListener("click", () => getAllShoes());

//let displayShoesContainer = document.getElementById("grid-container");

//let shoesArray = []

//const getAllShoes = () => {


//    $.get("api/Shoe", function (data, status) {  // AJAX get
//        shoesArray = data;

//        for (let eachShoe of shoesArray) {
//            displayShoesContainer.innerHTML += `
//                <div class="shoeCard">
//                <p>Name: ${eachShoe.name}</p>
//                <p>Brand: ${eachShoe.brand}</p>
//                <p>Price: ${eachShoe.price}</p>
//                <div class="icons">
//                    <i class="bi bi-trash3" onclick="testFunction()">Delete</i>
//                    <i class="bi bi-pencil">Edit</i>    
//                </div>
             
//</div>
//             `
//        }

//        console.log(shoesArray);  // put the returned server json data into our local array 
//    })



//}


//function testFunction() {
//    console.log("hello");
//}

//const handleAddShoe = () => {
//    var shoeText = document.getElementById("name").value;
//    var brandText = document.getElementById("brand").value;
//    var colorText = document.getElementById("color").value;
//    var priceText = document.getElementById("price").value;
//    var manufacturerId = manufacturer_retailers.options[manufacturer_retailers.selectedIndex].value;
//    var retailerId = select_retailer.options[select_retailer.selectedIndex].value;

   
//    let newShoe = new Shoe(shoeText, brandText, colorText, priceText, manufacturerId, retailerId);


//    $.ajax({
//        url: "api/Shoe",
//        type: "POST",
//        data: JSON.stringify(newShoe),
//        contentType: "application/json; charset=utf-8",

//        success: function (result) {
//            alert(result + " was added");
//            getAllShoes();
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert("Status: " + textStatus); alert("Error: " + errorThrown);
//        }
//    });
//}

//let updateBtn = document.getElementById("updateShoe");
//updateBtn.addEventListener("click", () => handleUpdateShoe());

//const handleUpdateShoe = () => {
//    var shoeText = document.getElementById("name").value;
//    var brandText = document.getElementById("brand").value;
//    var colorText = document.getElementById("color").value;
//    var priceText = document.getElementById("price").value;
//    var manufacturerId = manufacturer_retailers.options[manufacturer_retailers.selectedIndex].value;
//    var retailerId = select_retailer.options[select_retailer.selectedIndex].value;


//    let newShoe = new Shoe(shoeText, brandText, colorText, priceText, manufacturerId, retailerId);


//    $.ajax({
//        url: "api/Shoe",
//        type: "PUT",
//        data: JSON.stringify(newShoe),
//        contentType: "application/json; charset=utf-8",

//        success: function (result) {
//            alert(result);
//            getAllShoes();
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert("Status: " + textStatus); alert("Error: " + errorThrown);
//        }
//    });
//}



////////////// Retailer Functions /////////////////////////
//let retailerArray = []
//var addRetailerBtn = document.getElementById("addRetailer");
//addRetailerBtn.addEventListener("click", () => handleAddRetailer());


//const getAllRetailer = () => {
//    console.log("get retailer btn");

//    $.get("api/Retailer", function (data, status) {

  

//        retailerArray = data;

//        while (select_retailer.options.length > 0) {
//            select_retailer.remove(0);
//        }

//        for (let eachRetailer of retailerArray) {
//            let newRetailer = document.createElement('option');
//            let optionText = document.createTextNode(eachRetailer.name);
//            newRetailer.appendChild(optionText);
//            newRetailer.setAttribute('value', eachRetailer.retailerId);
//            select_retailer.appendChild(newRetailer);
//        } 
//    })
//}

//const handleAddRetailer = () => {
//    let shoeText = document.getElementById("retailer-name").value;
  
//    $.ajax({
//        url: "api/Retailer",
//        type: "POST",
//        data: JSON.stringify(shoeText),
//        contentType: "application/json; charset=utf-8",

//        success: function (result) {
//            alert(result + " was added");
//            getAllRetailer();
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert("Status: " + textStatus); alert("Error: " + errorThrown);
//        }
//    });
//}

///////////////Manufacturer Functions/////////////
//let manufacturerArray = [];

//let addManuBtn = document.getElementById("addManu");
//addManuBtn.addEventListener("click", () => handleAddManufacturer());

//function Manufacturer (pCountry, pName) {
//    this.country = pCountry;
//    this.name = pName;
//}



//const getAllManufacturers = () => {
  

//    $.get("api/Manufacturer", function (data, status) {


     
//        manufacturerArray = data;

//        while (manufacturer_retailers.options.length > 0) {
//            manufacturer_retailers.remove(0);
//        }

//        for (let eachManufacturer of manufacturerArray) {
//            let newManufacturer = document.createElement('option');
//            let optionText = document.createTextNode(eachManufacturer.name);
//            newManufacturer.appendChild(optionText);
//            newManufacturer.setAttribute('value', eachManufacturer.manufacturerId);
//            manufacturer_retailers.appendChild(newManufacturer);
//        }


//    })
//}


//const handleAddManufacturer = () => {
//    let countryText = document.getElementById("country").value;
//    let nameText = document.getElementById("manu-name").value;

//    let newManu = new Manufacturer(countryText, nameText);
   

//    $.ajax({
//        url: "api/Manufacturer",
//        type: "POST",
//        data: JSON.stringify(newManu),
//        contentType: "application/json; charset=utf-8",

//        success: function (result) {
//            alert(result + " was added");
//            getAllManufacturers();
         
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert("Status: " + textStatus); alert("Error: " + errorThrown);
//        }
//    });

//}



//let displayBackup = document.getElementById("displayServer");
//let backupServer = document.getElementById("backupServer");

//displayBackup.addEventListener("click", () => console.log("display back up"));
//backupServer.addEventListener("click", () => console.log("back up server"));







//document.addEventListener("DOMContentLoaded", function () {


//    getAllRetailer();
//    getAllManufacturers();
//    //$.get("api/Dog", function (data, status) {  // AJAX get
//    //    dogsArray = data;  // put the returned server json data into our local array
      
//    //    let table = document.getElementById('dogtable');
     
//    //    let tr = document.createElement('tr');
//    //    let td1 = document.createElement('td');
//    //    td1.textContent = "Breed";
//    //    tr.appendChild(td1);
//    //    let td2 = document.createElement('td');
//    //    td2.textContent = "Color";
//    //    tr.appendChild(td2);
//    //    let td3 = document.createElement('td');
//    //    td3.textContent = "Age";
     
//    //    tr.appendChild(td3);
       

//    //    table.appendChild(tr);


//    //        for (let dog of dogsArray) {
//    //            let tr = document.createElement('tr');

//    //            let td1 = document.createElement('td');
//    //            td1.textContent = dog.breed;
//    //            tr.appendChild(td1);

//    //            let td2 = document.createElement('td');
//    //            td2.textContent = dog.color;
//    //            tr.appendChild(td2);

//    //            let td3 = document.createElement('td');
//    //            td3.textContent = dog.age;
//    //            tr.appendChild(td3);

//    //            table.appendChild(tr);
//    //        }
//    //    //myli.innerHTML = item.breed + ":  " + item.color + ":  " + item.age;
            
//    //    });

//});