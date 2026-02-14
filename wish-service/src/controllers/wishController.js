const repository = require('../repositories/wishRepository');

async function getAll(req, res) {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(401).json({ error: 'Token inválido (sem user_id)' });
    }

    const wishes = await repository.getAllByUser(user_id);
    return res.json(wishes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar desejos' });
  }
}

async function create(req, res) {
  try {
    const user_id = req.user?.user_id;
    const { titulo, descricao } = req.body;

    if (!user_id) {
      return res.status(401).json({ error: 'Token inválido (sem user_id)' });
    }

    if (!titulo) {
      return res.status(400).json({ error: 'titulo é obrigatório' });
    }

    const wish = await repository.create(user_id, titulo, descricao);
    return res.status(201).json(wish);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar desejo' });
  }
}

async function update(req, res) {
  try {
    const user_id = req.user?.user_id;
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    if (!user_id) {
      return res.status(401).json({ error: 'Token inválido (sem user_id)' });
    }

    if (!titulo) {
      return res.status(400).json({ error: 'titulo é obrigatório' });
    }

    const updated = await repository.updateByIdAndUser(id, user_id, titulo, descricao);

    if (!updated) {
      return res.status(404).json({ error: 'Desejo não encontrado' });
    }

    return res.json({ message: 'Desejo atualizado', updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar desejo' });
  }
}

async function remove(req, res) {
  try {
    const user_id = req.user?.user_id;
    const { id } = req.params;

    if (!user_id) {
      return res.status(401).json({ error: 'Token inválido (sem user_id)' });
    }

    const deleted = await repository.removeByIdAndUser(id, user_id);

    if (!deleted) {
      return res.status(404).json({ error: 'Desejo não encontrado' });
    }

    return res.json({ message: 'Desejo removido', deleted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar desejo' });
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
