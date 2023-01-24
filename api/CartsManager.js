const fs = require("fs");

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    try {
      const arrayProducts = this.getProducts();
      if (arrayProducts.length !== 0) {
        fs.writeFileSync(
          this.path,
          JSON.stringify(
            [
              ...arrayProducts,
              {
                ...product,
                id: arrayProducts[arrayProducts.length - 1].id + 1,
              },
            ],
            null,
            2
          ),
          "utf-8"
        );
      } else {
        fs.writeFileSync(
          this.path,
          JSON.stringify([{ ...product, id: 1 }]),
          "utf-8"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    try {
      const content = fs.readFileSync(this.path, "utf-8");
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log("Error: Not products found.");
      return [];
    }
  }

  getProductById(id) {
    try {
      const arrayProducts = this.getProducts();
      const searchID = arrayProducts.find((item) => item.id == id);
      if (!searchID) {
        console.log(`Not products found with id ${id}`);
      } else {
        console.log(
          `Here's your product: ${JSON.stringify(searchID.description)}`
        );
        return searchID;
      }
      return [];
    } catch (error) {
      console.error(`Not products found with id ${id}`);
    }
  }
}

const cartsList = new CartsManager("./carrito.json");

module.exports = {
  CartsManager: cartsList,
};
