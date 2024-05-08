const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const PORT = 3000

const db = mysql.createConnection({
    host: '[Host endpoint]',
    user: '[user]',
    password: '[user]',
    database: '[database_name]'
})

db.connect((err) => {
    if(err){
        throw err
    }
    console.log('database connected')
})


const saveData = (data) => {
    const { product, quantity } = data
    const query = 'INSERT INTO products (product, quantity) VALUES (?, ?)'

    db.query(query, [product, quantity], (err, result) => {
        if(err) throw err
    })
    console.log(data)
}

const writeLogs = (message) => {
    console.log(message)
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.post('/send', (req, res) => {
    saveData(req.body)
    res.send('Recibido')
})

app.get('/getProducts', (req, res) => {
    const query = 'SELECT * FROM products'
    db.query(query, (err, result) =>{
        if(err) throw err
        res.json(result)
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})


