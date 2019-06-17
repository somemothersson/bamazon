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
buildStock()

//builds the item array for easy updating via item name 
function buildStock() {
            connection.query(`SELECT product_name 
            FROM bamazon_db.products
            `, function (err, product) {
                    for (i = 0; i < product.length; i++) {
                        stockItems.push(product[i].product_name)
                    }

                });
    setTimeout(bamManager, 1000);
}


function bamManager() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Bamazon Management Console",
            choices: [
                "Show Current Stock",
                "Purchase Items",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {

            switch (answer.action) {
                case "Show Current Stock":
                    queryStock();
                    break;
                case "View Low Inventory":
                    lowStock()
                    break;
                case "Add to Inventory":
                    updateStock()
                    break;
                case "Add New Product":
                    addNewProduct()
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}
//show the current items and stock
function queryStock() {
    console.log("Current Stock")
    connection.query(`SELECT * FROM bamazon_db.products
    `, function (err, response) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(response);
        });
    
}

//show items that have quantities of less than 10
function lowStock() {
    console.log("Low Inventory Items")
    connection.query(`SELECT * FROM bamazon_db.products
    WHERE stock_quantity <10
    `, function (err, response) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(response);
        });
    
}
//Update current stock
function updateStock() {
    inquirer
        .prompt([{
            name: "product",
            type: "list",
            message: "What item do you need to update stock quanitites?",
            choices: stockItems
        },
        {
            name: "quantity",
            type: "input",
            message: `what is the new value for ${answer.product}?`,

        }])
        .then((answer) => {
            let item = answer.product;
            let qty = answer.quantity;
            let newStock = 0;
            connection.query(`SELECT stock_quantity FROM bamazon_db.products
            WHERE product_name = '${item}'`, function (err, response) {
                    var stock = response[0].stock_quantity
                    newStock = stock - qty
                    // console.log(newStock)
                    if (newStock < 0) {
                        console.log("Insufficient Quantity")
                        queryStock()
                    } else if (newStock > 0) {
                        connection.query(`UPDATE bamazon_db.products
                        SET stock_quantity = '${newStock}' 
                        WHERE product_name = '${item}'`, function (err, res) {
                                if (err) throw err;
                                connection.end();
                            });
                        console.log(`Your ${qty} ${item} are on the way!`)

                    }
                });




        });

}
function addNewProduct() {
    inquirer
        .prompt([{
            name: "product",
            type: "list",
            message: "What item do you need to update stock quanitites?",
            choices: stockItems
        },
        {
            name: "quantity",
            type: "input",
            message: `what is the new value for ${answer.product}?`,

        }])
        .then((answer) => {
            let item = answer.product;
            let qty = answer.quantity;
            let newStock = 0;
            connection.query(`SELECT stock_quantity FROM bamazon_db.products
            WHERE product_name = '${item}'`, function (err, response) {
                    var stock = response[0].stock_quantity
                    newStock = stock - qty
                    // console.log(newStock)
                    if (newStock < 0) {
                        console.log("Insufficient Quantity")
                        queryStock()
                    } else if (newStock > 0) {
                        connection.query(`UPDATE bamazon_db.products
                        SET stock_quantity = '${newStock}' 
                        WHERE product_name = '${item}'`, function (err, res) {
                                if (err) throw err;
                                connection.end();
                            });
                        console.log(`Your ${qty} ${item} are on the way!`)

                    }
                });




        });

}
