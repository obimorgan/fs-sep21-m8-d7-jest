import { app } from '../app.js'
import supertest from "supertest"
import mongoose from "mongoose"

const request = supertest(app)

// Describing the test suite purposes: which behaviors of our applications are tested.
describe("Just trying out Jest and making sure it's all good", () => {

    // We are individually describing the purpose of this single test
    it("should test that true is true", () => {
        expect(true).toBe(true);
    })

    test("that false is not true", () => {
        expect(false).not.toBe(true);
    })
})

describe("Testing the endpoints for our express app", () => {

    beforeAll((done) => {
        mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true }, () => {
            console.log("Connected to Mongo")
            done()
        })
    })

    it("should test that the /test endpoint returns a success message", async () => {
        const response = await request.get("/test")

        expect(response.body.message).toBe("Test success!")
    })

    const validProduct = {
        name: "Test Product",
        price: 100
    }

    let createdProductId
    it("should test that the POST /products actually creates a product", async () => {
        const response = await request.post("/products").send(validProduct)

        expect(response.body._id).toBeDefined()

        createdProductId = response.body._id
    })

    it("should test that the GET /products/:id actually returns our product", async () => {
        const response = await request.get(`/products/${createdProductId}`)

        expect(response.body.name).toBe(validProduct.name)
    })

    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                return mongoose.connection.close()
            })
            .then(() => {
                done()
            })
    })

})