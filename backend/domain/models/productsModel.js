const { ObjectId } = require("mongodb"); // Corregir la importación de ObjectId
const ConnectToDatabase = require("../../infrastructure/mongodb.js");

class Product { // Cambiar el nombre de la clase a "Product" (mayúscula) para seguir convenciones
    constructor() {
        this.dbConnection = new ConnectToDatabase();
    }


    async findByCategory(categoriaId) {
        try {
            await this.dbConnection.connectOpen();
            const collection = this.dbConnection.db.collection('producto');
            const productos = await collection.find({ categoria_id: new ObjectId(categoriaId) }).toArray();
            return productos;  // Devuelve el array de productos
        } catch (error) {
            throw new Error(`Error al obtener los productos por categoría: ${error.message}`);
        } finally {
            await this.dbConnection.connectClose(); 
        }
    } 
    async findAll() {
        try {
            await this.dbConnection.connectOpen();
            const collection = this.dbConnection.db.collection('producto');
            const res = await collection.find().toArray(); // Obtener todos los documentos
            return res;
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        } finally {
            await this.dbConnection.connectClose();
        }
    }

    // Insertar un producto a la base de datos
    async insertProduct(productData) {
        try {
            await this.dbConnection.connectOpen();
            const collection = this.dbConnection.db.collection('producto');
            const res = await collection.insertOne(productData); // Usar insertOne para producto
            return res;
        } catch (error) {
            throw new Error(`Error al insertar el producto: ${error.message}`);
        } finally {
            await this.dbConnection.connectClose(); 
        }
    }

    // Buscar por Id un producto en la base de datos 
    async findById(id) {
        try {
            await this.dbConnection.connectOpen(); // Abrir la conexión antes de usarla
            const collection = this.dbConnection.db.collection('producto');
            const res = await collection.findOne({ _id: new ObjectId(id) }); // Usar findOne para buscar un solo documento
            return res;
        } catch (error) {
            throw new Error(`Error al encontrar el producto: ${error.message}`); // Mensaje de error específico para productos
        } finally {
            await this.dbConnection.connectClose(); 
        }
    }

    async deleteProduct(id) {
        try {
            await this.dbConnection.connectOpen(); // Abrir la conexión antes de usarla
            const collection = this.dbConnection.db.collection('producto');
            const res = await collection.deleteOne({ _id: new ObjectId(id) }); // Usar deleteOne para eliminar un solo documento
            return res;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`); // Mensaje de error específico para productos
        } finally {
            await this.dbConnection.connectClose(); 
        }
    }

    async updateById(id, updateData) {
        try {
            await this.dbConnection.connectOpen();
            const collection = this.dbConnection.db.collection("producto");
            const res = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { upsert: false }
            );
            return res;
        } catch (error) {
            throw new Error(
                JSON.stringify({ status: 500, message: "Error updating product" })
            );
        } finally {
            await this.dbConnection.connectClose();
        }
    }
}

module.exports = Product; // Exportar la clase para poder usarla en otros archivos