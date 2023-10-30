import Joi from "joi";
import booksModel from "../model/books.mjs"
import vars from "../variables/vars.mjs";
import Error from "../utils/errorManagement.mjs";

const deleteBook = async (req, res) => {
    try {
        const documentation = {
            description: "delete book",
            reqDataFields: ["bookId"],
            optionalPayloadFields: [],
            attributes: []
        };
        const schema = Joi.object({
            bookId: Joi.string().hex().length(24).required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) {
            throw Error(`Invalid payload data: ${error.message}`, vars.STATUS_CODE.BAD_REQUEST);
        }
        const { bookId } = req.params
        const filter = { _id: bookId, status: "active" };
        const update = { status: "deleted", deletedAt: new Date() };
        const options = { upsert: false };
        const result = await booksModel.updateOne(filter, update, options);
        if (result.matchedCount == 0) {
            throw Error(vars.MESSAGES.BOOK_NOT_EXIST, vars.STATUS_CODE.NOT_FOUND)
        }
        return res.status(vars.STATUS_CODE.SUCCESS).json(
            {
                status: vars.STATUS_CODE.SUCCESS,
                message: vars.MESSAGES.BOOK_DELETED
            }
        )
    } catch (err) {
        return res.status(err.code || vars.STATUS_CODE.INTERNAL_SERVER_ERROR).json(
            { 
                status: err.code || vars.STATUS_CODE.INTERNAL_SERVER_ERROR,
                message: err.message,
                error: err.error
            }
        )
    }
}

export default deleteBook;