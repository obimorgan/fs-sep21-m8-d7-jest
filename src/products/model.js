import mongoose from 'mongoose'
import { ProductSchema } from './schema.js'

export const ProductModel = mongoose.model("products", ProductSchema)