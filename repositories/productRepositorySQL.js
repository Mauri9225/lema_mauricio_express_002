const {Pool} = require('pg')


class ProductRepository {
    constructor() {
        this.pool = new Pool ({
            user: 'admin',
            host: 'localhost',
            database: 'products_db',
            password: 'admin',
            port: 5439
        })
}


// todo reposotorio debe tener al menos los siguientes metodods
async findAll() {
    //deberiamos ejecutar un query
    const result = await this.pool.query('SELECT * FROM products')
    return result.rows
 }

async findById(id) {
    const result = await this.pool.query(
        'SELECT * FROM products WHERE id = $1', [id]
    )
    return result.rows[0]
 }

async findBySku(sku) {
    const result = await this.pool.query(
        'SELECT * FROM products WHERE sku = $1', [sku]
    )
    return result.rows[0]
}

async findProductBetweenExistence(minExistence, maxExistence) {
    const result = await this.pool.query(
        'SELECT * FROM products WHERE stock BETWEEN $1 AND $2', 
        [minExistence, maxExistence]
    )
    return result.rows
}

//CREAR

async create(product) {
    const newProduct = await this.pool.query(
        'INSERT INTO products (description, price, stock, sku) VALUES ($1, $2, $3, $4) RETURNING *',
        [product.description, product.price, product.stock, product.sku]
    )
    return newProduct.rows[0]
}

async update(id, product) {
    const updatedProduct = await this.pool.query(
        'UPDATE products SET description = $1, price = $2, stock = $3, sku = $4 WHERE id = $5 RETURNING *',
        [product.description, product.price, product.stock, product.sku, id]
    )
    return updatedProduct.rows[0]
}
        
        //actualizar a la fuerza
       /* this.products[index] = product

        // actualizando usando spread operators
        this.products[index] = {
            ...this.products[index],
            ...product,
            id
        }
        return this.products[index]
    }*/
    
    async delete(id) {
        const deletedProduct = await this.pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *', [id]
        )
        return deletedProduct.rows[0]
         
        
    }
}

module.exports = new ProductRepository()