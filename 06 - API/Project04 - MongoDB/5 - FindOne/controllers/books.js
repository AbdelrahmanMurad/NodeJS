const { dbConnection } = require('../configurations');
const { ObjectId } = require('bson');

const getBooks = (req, res, next) => {

    // const pageNumber = req.query.page; 
    // query string => number will return a string. you need it integer value.
    const pageNumber = parseInt(req.query.page);

    if (isNaN(pageNumber)) {
        // 400 => bad request
        res.status(400).json({
            status: false,
            message: 'you should send a page number'
        })
    }

    const limit = 10;
    /** The Problem is that the First 10 books will show, even in page 2.
     * - We need to solve it, How??
     *   Page   Limit   Skip
     *    1       10      0
     *    2       10      10
     *    3       10      20
     *    4       10      30
     * So on.
     * Fomula: (Page - 1) * limit = Skip
     */
    const skip = (pageNumber - 1) * limit;

    dbConnection('books', async (collection) => {
        const books = await collection.find({}).limit(limit).skip(skip).toArray();
        //toArray() returns array of objects.
        res.json(books);
    });
};

// pageبدنا نعرض عدد ال
const getBooksPageCount = (req, res, next) => {
    dbConnection('books', async (collection) => {
        const limit = 10;
        const count = await collection.count({}); // documents number
        const pages = Math.ceil(count / limit);

        res.json({
            pages: pages
        })
    });
}

// IDنبحث عن كتاب عن طريق ال
// id will be in parameters, so use path parameter.
const getBookById = (req, res, nex) => {
    // const _id = req.params.id;
    //we need same datatype => ObjectId
    // npm i bson
    // import => const { ObjectId } = require('bson');
    const _id = new ObjectId(req.params.id);

    dbConnection('books', async (collection) => {
        const book = await collection.findOne({ _id }); // '_id': _id => same as => _id 
        //why not find() instead of findOne().
        //find() will return group of books (array)
        //findOne() will return just one book.
        if (!book) {
            res.status(404).json({
                status: false,
                message: 'resource not found'
            });
        }
        res.json(book);
    });
}

//exposing
module.exports = {
    getBooks, getBooksPageCount, getBookById
};