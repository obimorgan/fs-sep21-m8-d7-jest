import express from 'express';
import { ProductModel } from './model.js';


const productsRouter = express.Router();

productsRouter
    .get('/', async(req, res) => {
        try {
            let products = await ProductModel.find()
            res.send(products)
        } catch (error) {
         console.log(error)
        }
    })
    
    .post('/', async (req, res) => {
        try {

            if (!req.body.name || !req.body.price) {
                return res.status(400).send()
            }

            const newProduct = new ProductModel(req.body)
            await newProduct.save()
           
            res.send(newProduct)
        } catch (error) {
            console.log("here")
            console.log(error)
            res.status(500).send()
        }
    })
    .get("/:id", async (req, res) => {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            res.status(404).send()
        } else res.send(product)
    })

    .delete("/:id", async (req, res) => {
        try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)

        if (!product) {
            res.status(404).send()
        } else res.send(product)
            
        } catch (error) {
            console.log("here")
            console.log(error)
            res.sendStatus(500)
        }
    })

    .put("/:id", async (req, res) => {
        try {
            const id = req.params.id
            const product = await ProductModel.findByIdAndUpdate(
                id, req.body, {new: true}
            )
            res.send(product)
        } catch (error) {
            console.log(error)
        }
    })
export default productsRouter