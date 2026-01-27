class ProductRepository {
    constructor() {
        this.products = [
            { id: 1,
                description: 'laptop dell',
                price: 899.99,
                stock: 10,
                sku: 'lap-dell-001'
            },
            { id: 2,
                description: 'mouse logitech',
                price: 25,
                stock: 50,
                sku: 'mou-logi-002'
            },
            { id: 3,
                description: 'teclado keyboard',
                price: 60,
                stock: 20,
                sku: 'tec-key-003'
            },
            {
                id: 4,
                description: 'iPad pro M3',
                price: 1175.99,
                stock: 3,
                sku: 'IPA-APPL-004'
            }
        ]
        
}


// todo reposotorio debe tener al menos los siguientes metodods
 findAll() {
    return this.products
 }

 findById(id) {
    return this.products.find(p => p.id === id)
 }

findBySku(sku) {
    return this.products.find(p => p.sku === sku)
}

create(product) {
    const newProduct ={
        id: this.products.length + 1,
        ...product         
    } 
    this.products.push(newProduct)
    return newProduct
}

update(id, product) {
        const index = this.products.findIndex(p => p.id === id)
        
        //early stopping
        if (index === -1) {
            return null
        }
        //actualizar a la fuerza
        this.products[index] = product

        // actualizando usando spread operators
        this.products[index] = {
            ...this.products[index],
            ...product,
            id
        }
        return this.products[index]
    }
    
    delete(id) {
          const index = this.products.findIndex(p => p.id === id)
        
        //early stopping
        if (index === -1) {
            return null
        }

        const deletedProduct = this.products.splice(index,1)[0]
        return deletedProduct
        
    }
}

module.exports = new ProductRepository()