const express=require('express');
const { allBooks, createBook, getBook, updateBook, deleteBook } = require('../controllers/bookController');
const validateToken = require('../middleware/authMiddleware');
const router=express.Router();

router.route('/').get(validateToken,allBooks)
router.route('/').post(createBook)
router.route('/:id').get(getBook)
router.route('/:id').put(updateBook)
router.route('/:id').delete(deleteBook)


module.exports=router;