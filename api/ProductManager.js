const { notDeepEqual } = require("assert");
const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

   addProduct(product) {
    try {
      const arrayProducts =  this.getProducts();
      const DuplicatedProduct = arrayProducts.find(
        (item) => item.code == product.code
      );

      if (DuplicatedProduct) {
        console.error(
          "\n" +
            `--> Unable to add ${product.title}. The following code has already been registered: ${product.code}`
        );
        return "duplicate";
      } else if (arrayProducts.length !== 0){
        
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
        return "added";
      }else {
         fs.writeFileSync(
          this.path,
          JSON.stringify([{ ...product, id: 1 }]),
          "utf-8"
        );
        return "added";
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
      return [];
    }
  }

  updateProduct(id, product) {
    try {
      const arrayProducts = this.getProducts();
      const targetProduct = arrayProducts.map((productoT) =>
        productoT.id === +id ? { ...productoT, ...product } : productoT
      );
      if (isNaN(+id)) {
        console.log(`The value ${id} not is a ID`);
        return (`The value ${id} not is a ID`);
      }else if (!arrayProducts.find((product) => product.id === +id)){
        console.log(`Not products found with id ${id}`);
        return(`Not products found with id ${id}`);
      }else
        console.log(`Product ${id} updated`);
        fs.writeFileSync(
          this.path,
          JSON.stringify(targetProduct, null, 4)
        );
        return(`Product ${id} updated Succesfully`);
      
    } catch (error) {
      console.log(`Could not update product with id ${id}.`);
    }
  }
  deleteProduct(id) {
    try {
      const arrayProducts = this.getProducts();
      const targetProduct = arrayProducts.filter(
        (productoT) => productoT.id !== +id
      );
      if (isNaN(+id)) {
        console.log(`The value ${id} not is a ID`);
      }else if (!arrayProducts.find((product) => product.id === +id)){
        console.log(`Not products found with id ${id}`);
      }else
        console.log(`Product ${id} deleted`);
         fs.writeFileSync(
          this.path,
          JSON.stringify(targetProduct, null, 4)
        );
    } catch (error) {
      console.log(`Could not delete product with id ${id}.`);
    }
  }
}

const productList = new ProductManager("./productos.json");
/*
const product1 = {
  title: "Burger",
  description: "Meat Hamburger",
  price: 15,
  thumbnail:
    "https://decomidaperuana.com/wp-content/uploads/2020/10/hamburguesa-casera.jpg",
  code: 1,
  stock: 20,
};

const product2 = {
  title: "Pizza",
  description: "Meat Pizza",
  price: 20,
  thumbnail:
    "https://cocina-casera.com/wp-content/uploads/2011/12/pizaa-carne-receta.jpg",
  code: 2,
  stock: 15,
};
const product3 = {
  title: "Soda",
  description: "Soda Inka Cola",
  price: 5,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sgvulY7-Iu6lDLd2YH-dINhcOBtpgTqMTA&usqp=CAU",
  code: 3,
  stock: 30,
};
*/
/*productList.addProduct(product1);*/ /*AÑADIR PRODUCTOS*/
/*productList.addProduct(product2);*/ /*AÑADIR PRODUCTOS*/
/*productList.addProduct(product3);*/ /*AÑADIR PRODUCTOS*/

/*console.log(productList.getProducts());*/ /*MOSTRAR PRODUCTOS*/

/*console.log(productList.getProductById(2)); /*MOSTRAR PRODUCTO CON ID 2*/

/*productList.deleteProduct(1);*/ /*ELIMINAR PRODUCTOS*/

/*productList.updateProduct(2, {price: 20}); /*ACTUALIZAR PRODUCTOS*/

module.exports = {
  productManager: productList,
};
