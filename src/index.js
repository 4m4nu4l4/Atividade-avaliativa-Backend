const express = require('express');
const UserApi = require('./api/user');
const PostApi = require('./api/post');
const database = require('./config/database');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
});

const userApi = new UserApi();
const postApi = new PostApi();

app.get('/users', userApi.listarUsuario);
app.post('/users', userApi.criarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

app.get('/postagens', postApi.listarPostagem);
app.post('/postagens', postApi.criarPostagem);
app.put('/postagens/:id', postApi.alterarPostagem);
app.delete('/postagens/:id', postApi.deletarPostagem);

database.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
