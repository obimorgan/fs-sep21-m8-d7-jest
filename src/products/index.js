import express from 'express';
import { ProductModel } from './model';


const productsRouter = express.Router();

productsRouter
    .post('/', async (req, res) => {

        try {
            const newProduct = new ProductModel(req.body)
            await newProduct.save()

            res.send(newProduct)
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    })
    .get("/:id", async (req, res) => {
        const product = await ProductModel.findById(req.params.id)

        res.send(product)
    })

export default productsRouter