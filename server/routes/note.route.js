const {
  createNote,
  EditNote,
  GetAllNOte,
  DeleteNOte,
  Pinned,
} = require("../controllers/note.js");
const router = require("express").Router();

router.post("/add-note", createNote);
router.put("/edit-note/:id", EditNote);
router.get("/get-all-note", GetAllNOte);
router.delete("/delete-note/:id", DeleteNOte);
router.put("/update-note-pinned/:id", Pinned);
module.exports = router;
