const { response } = require('express');
const express = require(`express`);
const path = require('path');

const PORT = process.env.PORT || 3001;
const {readAndAppend, readFromFile, readAndDelete} = require("./fsUtils")
const app = express();
const uuid = require('./helpers/uuid');

app.use(express.static('public'));
app.use(express.json());


app.get("/api/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, 'db', 'db.json'))
});

app.post("/api/notes", (req,res ) =>{

    const { title, text } = req.body;
    
    if (req.body) {
        const newNotes = {
            title,
            text,
            id: uuid()
        }

        readAndAppend(newNotes, "./db/db.json");
    }
    res.json({})
})

app.delete(`/api/notes/:id`, (req,res)=>{

const id = req.params.id

readAndDelete(id,"./db/db.json")
res.json({})

})


app.get(`/`,(req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.get(`/notes`,(req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);