const Post = require('../models/Post');

class PostController {
    async criarPostagem(titulo, conteudo, autorId) {
        try {
            const post = await Post.create({ titulo, conteudo, autorId });
            return post;
        } catch (error) {
            throw new Error('Erro ao criar postagem');
        }
    }

    async alterarPostagem(id, titulo, conteudo, autorId) {
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                throw new Error('Postagem não encontrada');
            }
            await post.update({ titulo, conteudo, autorId });
            return post;
        } catch (error) {
            throw new Error('Erro ao alterar postagem');
        }
    }

    async deletarPostagem(id) {
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                throw new Error('Postagem não encontrada');
            }
            await post.destroy();
        } catch (error) {
            throw new Error('Erro ao deletar postagem');
        }
    }

    async listarPostagens() {
        try {
            const posts = await Post.findAll();
            return posts;
        } catch (error) {
            throw new Error('Erro ao listar postagens');
        }
    }
}

module.exports = new PostController();
