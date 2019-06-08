// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "W0nd3rbr3@d",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  bamStore();
});
// Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
function bamStore() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Show Current Stock",
          "Purchase Items",
          "Exit"
        ]
      })
      .then(function(answer) {

        switch (answer.action) {
        case "Show Current Stock":
            queryStock();
            break;
        case "Purchase Items":
          
          break;
        case "Exit":
        connection.end();
        break;
        }
      });
  }
  //The first should ask them the ID of the product they would like to buy.
  function buyProduct() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to buy?",
        choices: [
            "Sunglasses",
            "T-Shirt",
            "Oxford Shirt", 
            "Polo Shirt", 
            "Trousers", 
            "Jeans",
            "Shorts",
            "Sneaker",
            "Wing Tips",
            "Chelsea Boots",
            "Belt",
            "Socks"
        
        ]
      },
      {
        name: "quantity",
        type: "input",
        message: "How many Would you like to purchase?",
        
      },)
      .then(function(answer) {
        switch (answer.action) {
        case "Find songs by artist":
          artistSearch();
          break;
  
        case "Find all artists who appear more than once":
          multiSearch();
          break;
  
        case "Find data within a specific range":
          rangeSearch();
          break;
  
        case "Search for a specific song":
          songSearch();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
  }


//The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase