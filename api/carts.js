const fs = require("fs");
const express = require("express");
const routerCarts = express.Router();
const { CartsManager } = require("./CartsManager.js");
const { productManager } = require("./ProductManager.js");
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));

//endpoint
routerCarts.get("/carts", function (req, res) {
  try {
    let response = CartsManager.getProducts();
    const limit = req.query.limit;
    if (limit && !isNaN(Number(limit))) {
      response = response.slice(0, limit);
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});
//FALTA COLOCAR TODOS LOS CAMPOS OBLIGATORIOS
routerCarts.post("/carts", function (req, res) {
  try {
    const newp = req.body;
    let response = CartsManager.addProduct(newp);
    console.log(response);
    if (response == "duplicate") {
      res.status(400).send("Bad Request--> Code Duplicate");
    } else if (response == "added") {
      res.status(200).send("Product Added Succesfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/*routerCarts.get("/carts/:cid", function (req, res) {
    try {
      const cid = req.params.cid;
      const response = CartsManager.getProductById(cid);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(console.log(error));
    }
  });*/

routerCarts.get("/carts/:cid", function (req, res) {
  try {
    const cid = req.params.cid;
    console.log(cid);

    res.status(200).send("response");
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});

routerCarts.post("/carts/:cid/products/:pid", function (req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const arrayProducts = CartsManager.getProducts();
    const response = productManager.getProductById(pid);
    arrayProducts.forEach((item) => {
      if (item.id == +cid) {
        item.products.push(response);
      }
    });
    fs.writeFileSync("./carrito.json", JSON.stringify(arrayProducts, null, 4));
    res.status(200).send("PRODUCTO AÑADIDO");
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});

module.exports = {
  routerCarts,
};
