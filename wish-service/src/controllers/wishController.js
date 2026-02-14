const repository = require('../repositories/wishRepository');

async function getAll(req, res) {
    try {
        const wishes = await repository.getAll();
        res.json(wishes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar desejos' });
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
    res.status(201).json(wish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar desejo' });
  }
}



async function remove(req, res) {
    try {
        const { id } = req.params;

        const deleted = await repository.remove(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Desejo não encontrado' });
        }

        res.json({ message: 'Desejo removido', deleted });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar desejo' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { titulo, descricao } = req.body;

        const updated = await repository.update(id, titulo, descricao);

        if (!updated) {
            return res.status(404).json({ error: 'Desejo não encontrado' });
        }

        res.json({ message: 'Desejo atualizado', updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar desejo' });
    }
}


module.exports = {
    getAll,
    create,
    remove,
    update
};
