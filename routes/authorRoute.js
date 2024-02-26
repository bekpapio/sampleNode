const express=require("express");
const { allAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorController");
const router=express.Router();


router.route("/").get(allAuthors);
router.route("/").post(createAuthor);
router.route("/:id").get(getAuthor);
router.route("/:id").put(updateAuthor);
router.route("/:id").delete(deleteAuthor);

module.exports=router;