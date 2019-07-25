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
//array to hold stock items for ease of ordering insteading of showing ID
var stockItems = []
queryStock()


function queryStock() {
    console.log("Hello, welcome to Bamazon - Please see our current stocked items")
    connection.query("SELECT * FROM bamazon_db.products"
    , function (err, response) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(response);
            connection.query(`SELECT product_name 
            FROM bamazon_db.products
            `, function (err, product) {
                    for (i = 0; i < product.length; i++) {
                        stockItems.push(product[i].product_name)
                    }
                    // console.log(product)
                    // console.log(stockItems)

                });


        });
    setTimeout(bamStore, 1000);
}
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
        .then(function (answer) {

            switch (answer.action) {
                case "Show Current Stock":
                    queryStock();
                    break;
                case "Purchase Items":
                    buyProduct()
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
    .prompt([{
        name: "product",
        type: "list",
        message: "What would you like to buy?",
        choices: stockItems
    },
    {
        name: "quantity",
        type: "input",
        message: "How many Would you like to purchase?",

    }])
    .then((answer) => {
        let item = answer.product;
        let qty = answer.quantity;
        let newStock = 0;
        let totalCost = 0;
        //Insufficient quantity!`, and then prevent the order from going through.
        connection.query(`SELECT stock_quantity, price FROM bamazon_db.products
        WHERE product_name = '${item}'`, function (err, response) {
            var stock = response[0].stock_quantity;
            var price = response[0].price;
            // console.log(price)
            newStock = stock - qty;
            totalCost = price * qty;
            // console.log(newStock)
            if (newStock < 0) {
                console.log(`
                *******************************

                Insufficient Quantity
                
                *******************************
                `)
              
                setTimeout(queryStock, 2000)
            } else if (newStock > 0) {
                connection.query(`UPDATE bamazon_db.products
                SET stock_quantity = '${newStock}' 
                WHERE product_name = '${item}'`, function (err, res) {
                        if (err) throw err;
                        connection.end();
                    });
                console.log(`Your total of $${totalCost} for ${qty} ${item} are on the way!`)

            }
        });

    });

}
