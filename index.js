import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import path from "node:path"
import { fileURLToPath } from "node:url"

const PORT = 80
const DIRNAME = fileURLToPath(path.dirname(import.meta.url))

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(cors())

app.get("/", (req, res) => {
  return res.sendFile(DIRNAME + "/public/upload.html")
})

app.post("/api/fileanalyse", (req, res) => {
  try {
    if (!req.files) return res.sendStatus(400)
    return res.json({
      name: req.files.upfile.name,
      type: req.files.upfile.mimetype,
      size: req.files.upfile.size
    })
  } catch (error) {
    return res.sendStatus(500)
  }
})

app.listen(PORT, () => console.log(`App listen on port : ${PORT}`))