const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];

usuarios.push({ id: 1, nome: "Emanuele", email: 19 });
usuarios.push({ id: 2, nome: "Maria", email: 19 });
usuarios.push({ id: 3, nome: "Sarah", email: 22 });

console.log(usuarios);

app.get('/usuario', (request, response) => {
  response.json(usuario)
})

app.post('/usuario', (request, response) => {
  const { nome, idade } = request.body

 let id = 0;

 for (const usuario of usuarios) {
    if (usuario.id > id) {
      id = usuario.id
    }
 }

 const usuario = { id: id + 1, nome, email }
 usuarios.push(usuario)

 res.status(201).json(usuario)

})

//usuario.push({ nome, idade })
//  response.json(usuario)

//  const newUsuario = { id, nome, idade }
//  usuario.status(201).json(newUsuario)

app.put('/usuario/:id', (request, response) => {
  const { id } = request.params
  const { nome, idade } = request.body
  const usuario = usuario.find(usuario => usuario.id == id)
  if (!usuario) {
    response.status(404).json({ message: "usuario nao encontrado" })
  }
  usuario.nome = nome
  usuario.idade = idade

  response.json(usuario)
})

app.delete('/usuario/:id', (request, response) => {
  const { id } = request.params
  const usuario = usuario.find(usuario => usuario.id == id)
  if (!usuario) {
    response.status(404).json({ message: "usuario nao encontrado" })
  }
  const index = usuario.indexOf(usuario)
  usuario.splice(index, 1)

  response.json(usuario)
})


app.listen(3000, () => {
  console.log("server is running on port 3000");
});