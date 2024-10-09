const ProductRepository = require("../../domain/repositories/productsRepository"); // Asegúrate de tener la ruta correcta

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducstByCategory (categoriaId){
    try {
      const res = await this.productRepository.findByCategory(categoriaId); // Asegúrate que el método findByCategory() existe en ProductRepository\
    } catch (error) {
        throw new Error(
            JSON.stringify({ status: 500, message: 'Error finding products by category' })
        );
    }
  }

  async getAllProducts() {
    try {
      
      const res = await this.productRepository.findAll(); // Asegúrate que el método getAll() existe en ProductRepository\
    } catch (error) {
        throw new Error(
            JSON.stringify({ status: 500, message: 'Error finding products' })
        );
    }
}


  async createProduct(data) {
    try {
      return await this.productRepository.createProduct(data);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 500, message: 'Error creating product' })
      );
    }
  }

  async getProductById(id) {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new Error(
        JSON.stringify({ status: 404, message: 'Product not found' })
      );
    }
    return product;
  }

  async updateProduct(id, data) {
    const updatedProduct = await this.productRepository.updateById(id, data);
    if (!updatedProduct) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: 'Product not found or could not be updated',
        })
      );
    }

    // Verificar si se actualizó algún documento (esto depende de cómo esté implementado tu método updateById)
    if (updatedProduct.modifiedCount === 0) {
      throw new Error(
        JSON.stringify({ status: 404, message: 'Product not found' })
      );
    }
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await this.productRepository.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: 'Product not found or could not be deleted',
        })
      );
    }
    return deletedProduct;
  }

  // ... (Puedes agregar otros métodos específicos para productos si es necesario)
}

module.exports = ProductService; 