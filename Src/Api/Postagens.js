const postController = require('../controllers/PostController');

class UserApi {
  async criarPostagem(req, res) {
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;
    const autorId = req.body.autorId;

    try {
      const post = await controller.criarPostagem(titulo, conteudo, autorId);
      return res.status(201).send(post);
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  async alterarPostagem(req, res) {
    const { id } = req.params;
    const { titulo, conteudo, autorId } = req.body;

    try {
      const post = await controller.alterarPostagem(Number(id), titulo, conteudo, autorId);
      return res.status(200).send(post);
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  async deletarPostagem(req, res) {
    const { id } = req.params;

    try {
      await controller.deletarPostagem(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }

  async listarPostagem(req, res) {
    try {
      const posts = await controller.listarPostagens();
      return res.status(200).send(posts);
    } catch (error) {
      return res.status(400).send({ error: error.message })
    }
  }
}

module.exports = new UserApi();