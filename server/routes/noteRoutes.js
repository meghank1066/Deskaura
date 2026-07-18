const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  deleteNote
} = require("../controllers/noteController");


router.use(protect);


router.post("/:jobId", createNote);

router.get("/:jobId", getNotes);

router.delete("/:id", deleteNote);


module.exports = router;