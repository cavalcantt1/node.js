const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const { CONNREFUSED } = require('dns')

app.use(bodyParser.json())

const banco_de_dados = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'c@tolic@',
    database: 'turma'
})

app.post('/criar', (req, res) => {

})

banco_de_dados.connect((err) => {
    if (err) {
        console.log('Erro na conexão com Mysql', err)
    } else {
        console.log('Conexão estabelecida com Mysql')
    }
})

app.post('/alunos/criar', (req, res) => {
    const {aluno, idade} = req.body
    const values = [aluno, idade] 

    banco_de_dados.query('INSERT INTO 3a (aluno, idade) VALUES (?, ?)', values, (err, results) => {
        if (err) {
            res.send('erro ao inserir no mysql')
        } else {
            res.send('Dados inseridos com sucesso!')
        }
    })
})

app.get('/alunos', (req, res) => {
    banco_de_dados.query('SELECT * FROM 3A', (err, results) => {
        if (err){
            res.send('Erro ao consultar no mysql', err)
        }else {
            res.send(results)
        }
    })
})

app.get('/alunos/:id', (req, res) => {
    const id = req.params.id
    banco_de_dados.query('SELECT * FROM 3A WHERE ID=?', [id], (err, results) => {
        if (err) {
            res.send('erro ao consultar')
        } else {
            res.send(results)
        }
    })
})

app.put('/alunos/alterar/:id', (req, res) => {
    const id = req.params.id
    const {aluno} = req.body
    const value = [aluno, id]

    banco_de_dados.query('UPDATE 3a SET aluno = ? WHERE ID=?', value, (err, results) => {
        if (err) {
            res.send(`Erro ao alterar usuário, ${err}`)
        } else {
            res.send('Usuário alterado com sucesso!')
        }
    })
})

app.delete('/alunos/deletar/:id', (req, res) => {
    const id = req.params.id
    banco_de_dados.query('DELETE FROM 3a WHERE ID=?', id, (err, results) => {
        if (err) {
            res.send(`Erro ao deletar ${err}`)
        } else {
            res.send('Dados deletados com sucesso')
        }
    })
})

app.listen(port, () => {
    console.log('O servidor está no ar')
})