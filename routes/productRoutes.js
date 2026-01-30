const express = require('express')

const router = express.Router()

const productService = require('../services/productService')
router.get('/', async (req, res) => {
    const result = await productService.findAll()
    res.json(result)
})

// ID
router.get('/:id', async (req, res) => {
    try {
        const result = await productService.findById(req.params.id)
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        })
    }
})

//get --> lectura
//post --> escritura o una lectura compleja
//put --> edicion 
//delete --> eliminacion

//obtener productos por rango de existencia
router.get('/existence/:min/:max', async (req, res) => {
    const min = req.params.min
    const max = req.params.max

    const products = await productService.findProductBetweenExistence(min, max)
    res.json(products)
})

router.post('/', async (req, res) => {
    const {description, price, stock, sku }= req.body

    if (!description || !price || !stock || !sku) {
        return res.status(400).json({
            message: 'description, price, stock and sku are required'
        })
    }
    try {
        const newProduct = await productService.create({
            description, price, stock, sku})
            res.status(201).json(newProduct)
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        })
    }
})

//editar
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const updatedProduct = await productService.update(id, req.body)
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        })
    }
    res.json(updatedProduct)
})

//eliminar
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const id = Number(req.params.id)
        const deletedProduct = await productService.delete(id)
        res.json(deletedProduct)

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal server error'
        })
    }
    
})

module.exports = router

