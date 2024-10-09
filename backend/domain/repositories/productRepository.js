const ProductModel = require("../models/productsModel"); // Asegúrate de tener tu modelo de producto definido

class ProductRepository {
  constructor() {
    this.productModel = new ProductModel();
  }
  
  async getProductsByCategory (categoriaId){
    try {
        return await this.productModel.findByCategory(categoriaId);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        throw new Error('No se pudieron obtener los productos por categoría');
    }
  }

  async getAllProducts() {
    try {
        return await this.productModel.findAll();
    } catch (error) {
        console.error('Error al obtener productos de la base de datos:', error);
        throw new Error('No se pudieron obtener los productos');
    }
}

  async createProduct(productData) {
    try {
      return await this.productModel.insertProduct(productData); 
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 500, message: 'Error saving product' })
      );
    }
  }

  async getById(id) {
    try {
      return await this.productModel.findById(id);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 400, message: 'Error retrieving product' })
      );
    }
  }

  async updateById(id, updateData) {
    try {
      return await this.productModel.updateById(id, updateData);
    } catch (error) {
      throw new Error(
        JSON.stringify({ status: 500, message: 'Error updating product' })
      );
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productModel.deleteProduct(id);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(
        JSON.stringify({ status: 404, message: 'Error deleting product' })
      );
    }
  }


}

module.exports = ProductRepository;