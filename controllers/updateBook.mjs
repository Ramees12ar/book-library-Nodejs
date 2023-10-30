import Joi from "joi";
import booksModel from "../model/books.mjs"
import vars from "../variables/vars.mjs";
import Error from "../utils/errorManagement.mjs";
import nameFormatter from "../utils/helpers.mjs";

async function areObjectValuesUndefined(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            return false; // At least one value is not undefined
        }
    }
    return true; // All values are undefined
}

const updateBook = async (req, res) => {
    try {
        const documentation = {
            description: "update book",
            reqDataFields: ["_id"],
            optionalPayloadFields: ["title", "author", "summary"],
            attributes: []
        };
        const schema = Joi.object({
            _id: Joi.string().hex().length(24).required(),
            title: Joi.string().optional(),
            author: Joi.string().optional(),
            summary: Joi.string().optional()
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            throw Error(`Invalid payload data: ${error.message}`, vars.STATUS_CODE.BAD_REQUEST);
        }
        const { _id } = req.body
        const title = (req.body.title) ? await nameFormatter(req.body.title.replace(/\s+/g, " ").trim()) : undefined
        const author = (req.body.author) ? await nameFormatter(req.body.author.replace(/\s+/g, " ").trim()) : undefined
        const summary = (req.body.summary) ? req.body.summary.replace(/\s+/g, " ").trim() : undefined
        const filter = { _id, status: "active" };
        const update = { title, author, summary };
        const options = { upsert: false };
        // Check if all values in the object are undefined
        const allValuesAreUndefined = await areObjectValuesUndefined(update);
        if (allValuesAreUndefined) {
            throw Error(vars.MESSAGES.REQUIRED_ONE_FIELD, vars.STATUS_CODE.BAD_REQUEST)
        }
        const isExist = await booksModel.findOne(update).select("_id") // checking any document exist with same combination
        if (isExist) {
            throw Error(vars.MESSAGES.ALREADY_EXIST, vars.STATUS_CODE.BAD_REQUEST)
        }
        const result = await booksModel.updateOne(filter, update, options);
        if (result.matchedCount == 0) {
            throw Error(vars.MESSAGES.BOOK_NOT_EXIST, vars.STATUS_CODE.NOT_FOUND)
        }
        if (result.modifiedCount === 0) {
            throw Error(vars.MESSAGES.ALREADY_UPDATED, vars.STATUS_CODE.BAD_REQUEST)
        }
        return res.status(vars.STATUS_CODE.SUCCESS).json(
            {
                status: vars.STATUS_CODE.SUCCESS,
                message: vars.MESSAGES.BOOK_UPDATED,
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

export default updateBook;