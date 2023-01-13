const express = require("express");
const app = express();
const { productManager } = require("./ProductManager.js");

//endpoint
app.get("/products", function (req, res) {
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

app.get("/products/:pid", function (req, res) {
  try {
    const pid = req.params.pid;
    const response = productManager.getProductById(pid);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

//raise the server

app.listen(3000, () => {
  console.log("Server up in port", 3000);
});
