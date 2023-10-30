import express from "express"
import insertBooks from "../controllers/insertBook.mjs"
import updateBooks from "../controllers/updateBook.mjs"
import { getBookById, getBookList } from "../controllers/getBooks.mjs"
import deleteBook from "../controllers/deleteBook.mjs"

const apiRouter = express.Router()

apiRouter.post("/insert", insertBooks)
apiRouter.put("/update", updateBooks)
apiRouter.get("/:bookId/details", getBookById)
apiRouter.get("/lists", getBookList)
apiRouter.delete("/:bookId/delete", deleteBook)

export default apiRouter;