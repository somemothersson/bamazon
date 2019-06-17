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
let departments = []
buildStock()

//builds the item array for easy updating via item name 
function buildStock() {
    connection.query(`SELECT product_name FROM bamazon_db.products
        `, function (err, product) {
        for (i = 0; i < product.length; i++) {
            stockItems.push(product[i].product_name)
        }
        connection.query(`SELECT DISTINCT department_name
         FROM bamazon_db.products;
        `, function (err, department) {
            for (i = 0; i < department.length; i++) {
                departments.push(department[i].department_name)
            }
        });
    });            
    bamManager();
}


function bamManager() {
            inquirer
                .prompt({
                    name: "action",
                    type: "list",
                    message: "Bamazon Management Console",
                    choices: [
                        "Show Current Stock",
                        "View Low Inventory",
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
                    bamManager()
                });

        }

//show items that have quantities of less than 5
function lowStock() {
            console.log("Low Inventory Items")
            connection.query(`SELECT * FROM bamazon_db.products
    WHERE stock_quantity <15
    `, function (err, response) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.table(response);
                    bamManager()
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
            message: `What is the number of stock you need to add?`,

        }])
        .then((answer) => {
            let item = answer.product;
            let qty = answer.quantity;
            connection.query(`UPDATE bamazon_db.products
            SET stock_quantity =  stock_quantity + '${qty}' 
            WHERE product_name = '${item}'`, function (err, res) {
                            if (err) throw err;
                    
                });
            console.log(`You added ${qty} to ${item}`)
            bamManager()

        });


}
function addNewProduct() {
    inquirer
        .prompt([{
            name: "product",
            type: "input",
            message: "What is the Name of the new Product?",
        },
        {
            name: "department",
            type: "list",
            message: `What department?`,
            choices: departments

        }, {
            name: "quantity",
            type: "input",
            message: `What is the stock quantity?`,

        }, {
            name: "price",
            type: "input",
            message: `What is the price?`,
        },{
            name: "item_id",
            type: "input",
            message: `What is the item id?`,
        }])
        .then((answer) => {
            let itemID = answer.item_id;
            let item = answer.product;
            let department = answer.department
            let qty = answer.quantity;
            let price = answer.price;
            connection.query(
                `INSERT INTO bamazon_db.products 
                (item_id, product_name, department_name, stock_quantity, price) 
                VALUES 
                ('${itemID}','${item}','${department}', '${qty}', '${price}')`
                , function (err, res) {
                    if (err) throw err;
                });
                console.log(`Item Added`)
                bamManager()
        });
    
        
}




   