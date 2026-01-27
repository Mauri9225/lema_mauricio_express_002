const productRepository = require("../repositories/productRepository")
class ProductService {
    findAll() {
        const products = productRepository.findAll()
        return {
            products,
            total: products.length
        }
    }
    searchById(id) {
        const numericID = parseInt(id)

        // http status:
        // 200 --> OK
        // 400 --> algo esta mal del lado del request
        // 404 --> Not Found
        // 401 --> Unauthorized
        // 403 --> Forbidden
        // 500 --> Error del servidor
 
        if (isNaN(numericID)) {
            throw {
                status: 400,
                message: 'id must be a number'
            }

        }
        const product = productRepository.findById(numericID)

        if (!product) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return product
    }

    // Create 
    create (newProduct) {
        const oldWaydescription = newProduct.description
        if (!oldWaydescription) {
            throw {
                status:400,
                message: 'description not provied'
            }
        }
        const {description, price, stock, sku} = newProduct
        if (!description || !price || !stock || !sku) {
            throw {
                status:400,
                message: 'fields misssing'
            }
        }
        if (typeof stock !== 'number' || stock < 0) {
            throw {
                status:400,
                message: 'stock must be a positive number'
            }
        }
    
    //asi para cada uno de los campos
        const existingSku= productRepository.findBySku(sku)
        if (existingSku) {
            throw {
                status:400,
                message: 'sku must be unique'
            }
        }
        const savedProduct = productRepository.create({
            description: description.trim(),
            price,
            stock,
            sku: sku.trim()
        })
        return savedProduct
    }

    //update
    update(id, updateProduct) {
        const numericID = parseInt(id)

        if (isNaN(numericID)) {
            throw {
                status: 400,
                message: 'id must be a number'
            }
        }
        const updatedProduct = productRepository.update(numericID, updateProduct)
        if (!updatedProduct) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return updatedProduct
    }

    //delete
    delete(id) {
        const numericID = parseInt(id)

        if (isNaN(numericID)) {
            throw {
                status: 400,
                message: 'id must be a number'
            }
        }
        const deletedProduct = productRepository.delete(numericID)
        if (!deletedProduct) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return deletedProduct
    }
}

module.exports = new ProductService()