const express = require('express');
const router = express.Router(); 

const ProductController = require('../controllers/productsController'); 
const productController = new ProductController(); 
const ProductValidator = require("../validator/prodcutValidator"); 
const productValidator = new ProductValidator(); 



//Obtener productos por categorias
router.get('/category/:categoriaId', (req, res) => 
  productController.getProductsByCategory(req, res)
);

// Obtener todos los productos  (GET /api/products)
router.get('/', (req, res) => productController.getAllProducts(req, res));


// Obtener un producto por ID
router.get('/:id', productValidator.validateProductId(), (req, res) =>
  productController.getProductById(req, res)
);

// Crear un nuevo producto
router.post('/', productValidator.validateProductData(), (req, res) =>
  productController.createProduct(req, res)
);

// Actualizar un producto por ID
router.put('/:id', productValidator.validateProductUpdate(), (req, res) => // Ajusta el nombre del método de validación si es necesario
  productController.updateProduct(req, res)
);

// Eliminar un producto por ID
router.delete('/:id', productValidator.validateProductId(), (req, res) =>
  productController.deleteProduct(req, res)
);

module.exports = router;