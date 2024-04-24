const Post = require('../model/post');

class PostController {
    async criarPostagem(titulo, conteudo, autorId) {
        if (
            titulo === undefined
            || conteudo === undefined
            || autorId === undefined
        ) {
            throw new Error('Título, conteúdo e ID do autor são obrigatórios');
        }

        // INSERT INTO posts (titulo, conteudo, autorId) VALUES (titulo, conteudo, autorId);
        const post = await Post.create({ titulo, conteudo, autorId });

        return post;
    }

    async buscarPostagemPorId(id) {
        if (id === undefined) {
            throw new Error('ID é obrigatório');
        }

        const post = await Post.findByPk(id);

        if (!post) {
            throw new Error('Postagem não encontrada');
        }

        return post;
    }

    async alterarPostagem(id, titulo, conteudo, autorId) {
        if (
            id === undefined
            || titulo === undefined
            || conteudo === undefined
            || autorId === undefined
        ) {
            throw new Error('ID, título, conteúdo e ID do autor são obrigatórios');
        }

        const post = await this.buscarPostagemPorId(id);

        post.titulo = titulo;
        post.conteudo = conteudo;
        post.autorId = autorId;

        // UPDATE posts SET titulo = titulo, conteudo = conteudo, autorId = autorId WHERE id = id;
        await post.save();

        return post;
    }

    async deletarPostagem(id) {
        if (id === undefined) {
            throw new Error('ID é obrigatório');
        }

        const post = await this.buscarPostagemPorId(id);

        await post.destroy();
    }

    async listarPostagens() {
        return Post.findAll();
    }
}

module.exports = PostController;
