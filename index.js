const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];
const postagens = [];

//criar usuarios de teste
usuarios.push({ id: 1, nome: "Emanuele", email: "emanuele@com.br" });
usuarios.push({ id: 2, nome: "Maria", email: "maria@com.br" });
usuarios.push({ id: 3, nome: "Sarah", email: "saritaitaita@com.br" });

console.log(usuarios);

//visualizar usuarios
app.get('/usuario', (request, response) => {
  response.json(usuarios)
})

//criar usuarios
app.post('/usuario', (request, response) => {
  const { nome, email } = request.body

  let id = 0;

  for (const usuario of usuarios) {
    if (usuario.id > id) {
      id = usuario.id
    }
  }

  const usuario = { id: id + 1, nome, email }
  usuarios.push(usuario)

  response.status(201).json(usuario)

})

//alterar usuarios
app.put('/usuario/:id', (request, response) => {
  const { id } = request.params
  const { nome, email } = request.body
  const index = usuarios.findIndex(usuarios => usuarios.id == id)
  if (index === -1) {
    response.status(404).json({ message: "usuario nao encontrado" })
  }

  usuarios[index] = {
    id: Number(id),
    nome,
    email
  }

  response.json(usuarios[index])
})

//deletar usuarios
app.delete('/usuario/:id', (request, response) => {
  const { id } = request.params;
  const index = usuarios.findIndex(usuario => usuario.id == id);
  if (index === -1) {
    response.status(404).json({ message: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);

  response.json({ message: "Usuário excluído com sucesso" });
});

//criar posts de teste
postagens.push({ id: 1, titulo: "Post 1", conteudo: "conteudo 1", autorId: "1"});
postagens.push({ id: 2, titulo: "Post 2", conteudo: "conteudo 2", autorId: "2"});
postagens.push({ id: 3, titulo: "Post 3", conteudo: "conteudo 3", autorId: "3"});

console.log(postagens);

//visualizar posts
app.get('/postagem', (request, response) => {
  response.json(postagens)
})

//criar post 
app.post('/postagem', (request, response) => {
  const { titulo, conteudo, autorId } = request.body;

  let id = 0;

  for (const postagem of postagens) {
    if (postagem.id > id) {
      id = postagem.id;
    }
  }

  const author = usuarios.find(usuario => usuario.id == autorId);

  if (!author) {
    return response.status(404).json({ message: "Usuário não encontrado" });
  }

  const postagem = { id: id + 1, titulo, conteudo, autorId }
  postagens.push(postagem)
  response.status(201).json(postagem)
})

//alterar post
app.put('/postagem/:id', (request, response) => {
  const { id } = request.params
  const { titulo, conteudo } = request.body

  const index = postagens.findIndex(postagens => postagens.id == id)
  if (index === -1) {
    response.status(404).json({ message: "Postagem não encontrada" })
  }

  postagens[index] = {
    id: Number(id),
    titulo,
    conteudo,
  }
  response.json(postagens[index])
})

//deletar post
app.delete('/postagem/:id', (request, response) => {
  const { id } = request.params;
  const index = postagens.findIndex(postagem => postagem.id == id);
  if (index === -1) {
    response.status(404).json({ message: "Postagem não encontrada" });
  }
  postagens.splice(index, 1);

  response.json({ message: "Postagem excluída com sucesso" });
});

//visualizar posts de usuario especifico
app.get('/postagem/:id', (request, response) => {
   const { id } = request.params;
   const postagemUsuario = postagens.filter(postagem => postagem.autorId == id);

   if (postagemUsuario.length === 0) {
    return res.status(404).json({error: "Postagem não encontrada"});
}

   response.json(postagemUsuario);
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
