const ProductRepository = require('../../domain/repositories/productRepository'); // Asegúrate de importar tu repositorio

class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProductsByCategory (req,res){
    const { categoriaId } = req.params;
    try{
      const products = await this.productRepository.getProductsByCategory (categoriaId);
      res.status(200).json(products);
    } catch (error){
      console.error('Error al obtener productos por categoría:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
        const products = await this.productRepository.getAllProducts(); // Cambia aquí
        res.status(200).json(products);    
    } catch (error) {
        console.error('Error al obtener productos:', error); // Agrega un log para el error
        res.status(500).json({ error: error.message });
    }
  }


  async createProduct(req, res) {
    try {
      const productData = req.body; // Obtén los datos del producto desde el cuerpo de la solicitud
      const newProduct = await this.productRepository.createProduct(productData);
      res.status(201).json(newProduct); // Respuesta exitosa con el nuevo producto creado
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear producto' }); // Respuesta de error
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id; // Obtén el ID del producto desde los parámetros de la ruta
      const product = await this.productRepository.getById(productId);
      if (product) {
        res.json(product); // Respuesta exitosa con el producto encontrado
      } else {
        res.status(404).json({ error: 'Producto no encontrado' }); // Respuesta de error si no se encuentra el producto
      }
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ error: 'Error al obtener producto' }); // Respuesta de error
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const updatedProduct = await this.productRepository.updateById(productId, updateData);
      if (updatedProduct) {
        res.json(updatedProduct); // Respuesta exitosa con el producto actualizado
      } else {
        res.status(404).json({ error: 'Producto no encontrado' }); // Respuesta de error si no se encuentra el producto
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' }); // Respuesta de error
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const result = await this.productRepository.deleteProduct(productId);
      if (result.deletedCount > 0) {
        res.json({ message: 'Producto eliminado correctamente' }); // Respuesta exitosa
      } else {
        res.status(404).json({ error: 'Producto no encontrado' }); // Respuesta de error si no se encuentra el producto
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' }); // Respuesta de error
    }
  }

  // ... (Puedes agregar otros métodos para manejar otras operaciones con productos)
}

module.exports = ProductController;