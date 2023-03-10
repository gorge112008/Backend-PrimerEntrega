const express = require("express");
const { routerProducts } = require("./products");
const { routerCarts } = require("./carts");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerCarts, routerProducts);

//raise the server

app.listen(8080, () => {
  console.log("Server up in port", 8080);
});
