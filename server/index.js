const PORT = 3001

let phonebook = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express()
app.use(express.json())
morgan.token("body", req => JSON.stringify(req.body))
morgan.token("param", req => JSON.stringify(req.params))
app.use(morgan(':method :url :status :response-time ms - :body - :param'))
app.use(cors());
const port = PORT

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons/', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const person = phonebook.find(el => el.id === req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  console.log(`DEL ID ${id}`)
  const personExists = phonebook.some(el => String(el.id) === id)

  if (personExists) {
    phonebook = phonebook.filter(el => String(el.id) !== id)
    console.log(phonebook)
    res.status(204).end()
  } else {
    console.log('Person doesn\'t exist')
    res.status(404).send({ error: 'Person not found' })
  }
});

app.post('/api/persons/', (req, res) => {
  const id = Math.floor(Math.random() * 100000)
  console.log(`Generated ID: ${id}`)
  const { name, number} = req.body
  console.log(`name: ${name}, phone: ${number}`)

  if (!name || !number) {
    res.status(400).json({"error": "name or number is missing!"})
  }

  if (phonebook.some(el => el.name === name)){
    res.status(400).json({"eroor": "The name already exists in the phonebook"})
  }

  phonebook = [...phonebook, {...req.body, id: String(id)}]
  res.status(202).end()
})

app.get('/api/info/', (req, res) => {
  // res.set('Content-Type', 'text/plain');
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})