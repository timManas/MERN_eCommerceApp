import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router() // Create router

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// Filters out only the file types you want
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  // If both extname is one of jpg, jpeg or png AND mimetype matches, then send call back
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images Only')
  }
}

// Uploads using multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// POST image
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
