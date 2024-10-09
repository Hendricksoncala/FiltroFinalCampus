const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class ProductValidator {
  validateProductData = () => {
    return [
      // Validación de la imagen
      body("imagen")
        .notEmpty()
        .withMessage("La imagen del producto es obligatoria"),

      // Validación del nombre
      body("nombre")
        .notEmpty()
        .withMessage("El nombre del producto es obligatorio")
        .isString()
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),

      // Validación del fabricante
      body("fabricante")
        .notEmpty()
        .withMessage("El fabricante del producto es obligatorio")
        .isString(),

      // Validación del precio
      body("precio")
        .notEmpty()
        .withMessage("El precio del producto es obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número positivo o cero"),

      // Validación de la descripción
      body("descripcion")
        .notEmpty()
        .withMessage("La descripción del producto es obligatoria")
        .isString()
        .isLength({ min: 10 })
        .withMessage("La descripción debe tener al menos 10 caracteres"),

      // Validación de las dimensiones (opcional, si aplica)
      body("dimensiones")
        .optional() // No es obligatorio, pero si se envía, se valida
        .matches(/^\d+ x \d+ cm$/)
        .withMessage("Las dimensiones deben tener el formato 'ancho x alto cm'"),

      // Validación de la cantidad de unidades (opcional)
      body("unidades_disponibles")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Las unidades disponibles deben ser un número entero positivo o cero"),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`No envíes nada en la URL`);
        }
        return true;
      }),
    ];
  };

  validateProductId = () => {
    return [
      // Validación del ID
      param("id").custom((value, { req }) => {
        if (!ObjectId.isValid(value)) {
          throw new Error("Envía un ID válido");
        }
        return true;
      }),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`No envíes nada en la URL`);
        }
        return true;
      }),

      // Validación para asegurarse de que no haya ningún dato en el body
      body().custom((value, { req }) => {
        if (Object.keys(req.body).length > 0) {
          throw new Error("No envíes nada en el cuerpo de la solicitud");
        }
        return true;
      }),
    ];
  };

  validateProductUpdate = () => {
    return [
      // Validación del ID (igual que en validateProductId)
      param("id").custom((value, { req }) => {
        if (!ObjectId.isValid(value)) {
          throw new Error("Envía un ID válido");
        }
        return true;
      }),

      // Validaciones similares a validateProductData, pero permitiendo que algunos campos sean opcionales
      body("imagen").optional(), 
      body("nombre")
        .optional()
        .isString()
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),
      body("fabricante").optional().isString(),
      body("precio")
        .optional()
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número positivo o cero"),
      body("descripcion")
        .optional()
        .isString()
        .isLength({ min: 10 })
        .withMessage("La descripción debe tener al menos 10 caracteres"),
      body("dimensiones")
        .optional()
        .matches(/^\d+ x \d+ cm$/)
        .withMessage("Las dimensiones deben tener el formato 'ancho x alto cm'"),
      body("unidades_disponibles")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Las unidades disponibles deben ser un número entero positivo o cero"),

      // Validación para asegurarse de que no haya ningún query en la URL
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error(`No envíes nada en la URL`);
        }
        return true;
      }),
    ];
  };
}

module.exports = ProductValidator;