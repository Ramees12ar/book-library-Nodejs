import { agent } from "supertest";
import chai from "chai"
import fs from "fs"

const TEST_BASE_URL = "http://localhost:3005/api/";

const { expect } = chai;
let request;
before(async () => {
    request = agent(TEST_BASE_URL);
})

describe("Book library CRUD operations", () => {
    let bookId;
    /**
     *  insert book API testing
     */
    describe("inserting a book", () => {
        it("return insert document if insert success", async () => {
            const payload = {
                title: `The God of Small Thingss-${Math.random().toString(18).slice(2)}`,
                author: "Arundhati Roy",
                summary: "Arundhati Roy’s debut book ‘The God of Small Things’ is a story about childhood experiences that fraternal twins face and their lives are shattered by the"
            }
            const res = await request.post("/insert").send(payload)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
            expect(res.body.data).to.be.an("object")
            bookId = (res.body && res.body.data) ? res.body.data._id : ""
        });
    });
    /**
     *  update book API testing
     */
    describe("updating a book", () => {
        it("return success if update completes", async () => {
            const payload = {
                _id: bookId || "653f9176082459fb884df41d",
                title: `title-${Math.random().toString(18).slice(2)}`,
                author: "Arundhati Roys",
                summary: "Arundhati Roy’s debut book ‘The God of Small Things’ is a story about childhood experiences that fraternal twins face and their lives are shattered by the"
            }
            const res = await request.put("/update").send(payload)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
        });
    });
    /**
     *  delete book API testing
     */
    describe("deleting a book", () => {
        it("return success document if deleted successfully", async () => {
            const res = await request.delete(`/${bookId}/delete`)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
        });
    });
    /**
     *  get book by id API testing
     */
    describe("get book details by id", () => {
        it("return detailed document", async () => {
            const res = await request.get(`/${bookId}/details`)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
            expect(res.body.data).to.be.an("object")
        });
    });
    /**
     *  get list of books API testing
     */
    describe("get list of books", () => {
        it("return list of books", async () => {
            const payload = {
                title: "cat",
                page: 1,
                limit: 0
            }
            const res = await request.get("/lists").query(payload)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
            expect(res.body.data.books).to.be.an("array")

        });
    });
})