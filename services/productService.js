const productRepository = require("../repositories/productRepositorySQL")
class ProductService {
    async findAll() {
        const products = await productRepository.findAll()
        return {
            products,
            total: products.length
        }
    }

    async findById(id) {
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
        const product = await productRepository.findById(numericID)

        if (!product) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return product
    }

    // Create 
    async create (newProduct) {
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
        const existingSku = await productRepository.findBySku(sku)
        if (existingSku) {
            throw {
                status:400,
                message: 'sku must be unique'
            }
        }
        
        const savedProduct = await productRepository.create({
            description: description.trim(),
            price,
            stock,
            sku: sku.trim()
        })
        return savedProduct
    }

    //update
    async update(id, updateProduct) {
        const numericID = parseInt(id)

        if (isNaN(numericID)) {
            throw {
                status: 400,
                message: 'id must be a number'
            }
        }
        const updatedProduct = await productRepository.update(numericID, updateProduct)
        if (!updatedProduct) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return updatedProduct
    }

    //delete
    async delete(id) {
        const numericID = parseInt(id)

        if (isNaN(numericID)) {
            throw {
                status: 400,
                message: 'id must be a number'
            }
        }

        const deletedProduct = await productRepository.delete(numericID)
        if (!deletedProduct) {
            throw {
                status: 404,
                message: `product with id ${numericID} not found`
            }
        }
        return deletedProduct
    }
    async findProductBetweenExistence(min, max) {
    const minStock = parseInt(min)
    const maxStock = parseInt(max)

    if (isNaN(minStock) || isNaN(maxStock)) {
        throw {
            status: 400,
            message: 'min and max must be numbers'
        }
    }

    if (minStock > maxStock) {
        throw {
            status: 400,
            message: 'min stock cannot be greater than max stock'
        }
    }

    const products = await productRepository
        .findProductBetweenExistence(minStock, maxStock)

    return {
        products,
        total: products.length
    }
}

}

module.exports = new ProductService()