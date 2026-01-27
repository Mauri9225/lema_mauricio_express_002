const express = require('express')

const router = express.Router()

const productService = require('../services/productService')
router.get('/', (req, res) => {
    const result = productService.findAll()
    res.json(result)
})

router.get('/:id', (req, res) => {
    const result = productService.searchById(req.params.id)
    res.json(result)
})

//get --> lectura
//post --> escritura o una lectura compleja
//put --> edicion 
//delete --> eliminacion

router.post('/', (req, res) => {
    const {name, price }= req.body

    if (!name || !price) {
        return res.status(400).json({
            message: 'name and price are required'
        })
    }
    const newProduct = productService.create({
        name, price}) 
        res.status(201).json(newProduct)
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedProduct = productService.update(id, req.body)
    
    if (!updatedProduct) {
        return res.status(404).json({
            message: `product with id ${id} not found`
        })
    }
    res.json(updatedProduct)
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = productService.delete(id)
    
    if (!deletedProduct) {
        return res.status(404).json({
            message: `product with id ${id} not found`
        })
    }
    res.json(deletedProduct)
})

module.exports = router

