const express = require(`express`);
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
//app.use('./api',api)

app.post("/api/notes",(req, res) =>{
    res.sendFile(path.join(__dirname, 'db',"db.json"))
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