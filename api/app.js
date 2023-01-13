const { on } = require("events");
const express = require("express");
const app = express();
const { productManager } = require("./ProductManager.js");

//endpoint
app.get("/api/products", function (req, res) {
  try {
    let response = productManager.getProducts();
    const limit = req.query.limit;
    if (limit && !isNaN(Number(limit))) {
      response = response.slice(0, limit);
    }
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/products/:pid", function (req, res) {
  try {
    const pid = req.params.pid;
    const response = productManager.getProductById(pid);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/products", function (req, res) {
  try {
    let response = productManager.addProduct(product);
    const product = {
      title: "Burger",
      description: "Meat Hamburger",
      code: 1,
      price: 15,
      status: true,
      stock: 20,
      category: "Food",
      thumbnail:
        "https://decomidaperuana.com/wp-content/uploads/2020/10/hamburguesa-casera.jpg",
    };
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/products/:pid", function (req, res) {
  try {
    const pid = req.params.pid;
    const response = productManager.getProductById(pid);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});


//raise the server

app.listen(8080, () => {
  console.log("Server up in port", 8080);
});
